/**
 * Centralized HTTP client with timeout, retry, interceptors, and auth support.
 */

import { env } from './env';
import { ApiError, NetworkError, TimeoutError } from './errors';
import { storage } from './storage';

export interface RequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  /** Skip auth header even if token exists. */
  skipAuth?: boolean;
  /** Skip request deduplication. */
  skipDedup?: boolean;
  /** Cache response for N milliseconds. */
  cacheTtl?: number;
  /** Signal for abort. */
  signal?: AbortSignal;
}

interface ResponseEnvelope<T> {
  ok: boolean;
  status: number;
  headers: Headers;
  data: T;
}

type Interceptor = (config: RequestConfig, url: string) => RequestConfig | Promise<RequestConfig>;

const interceptors: {
  request: Interceptor[];
  response: Array<(res: ResponseEnvelope<unknown>) => ResponseEnvelope<unknown>>;
} = {
  request: [],
  response: [],
};

/** Active in-flight requests for deduplication. */
const inflight = new Map<string, Promise<unknown>>();

/** Simple in-memory cache. */
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function getCacheKey(method: string, url: string, body?: unknown): string {
  return `${method}:${url}:${body ? JSON.stringify(body) : ''}`;
}

function getFromCache<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown, ttlMs: number): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


function getAuthToken(): string | null {
  return storage.get<string | null>('auth_token', null);
}

/**
 * Register a request interceptor. Runs before every request.
 */
export function addRequestInterceptor(fn: Interceptor): () => void {
  interceptors.request.push(fn);
  return () => {
    const idx = interceptors.request.indexOf(fn);
    if (idx >= 0) interceptors.request.splice(idx, 1);
  };
}

/**
 * Register a response interceptor. Runs after every response.
 */
export function addResponseInterceptor(
  fn: (res: ResponseEnvelope<unknown>) => ResponseEnvelope<unknown>,
): () => void {
  interceptors.response.push(fn);
  return () => {
    const idx = interceptors.response.indexOf(fn);
    if (idx >= 0) interceptors.response.splice(idx, 1);
  };
}

/**
 * Core fetch wrapper with all features.
 */
async function rawFetch<T>(url: string, config: RequestConfig = {}): Promise<T> {
  const {
    method = 'GET',
    headers: customHeaders = {},
    body,
    timeout = 30_000,
    signal,
  } = config;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (!config.skipAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const controller = new AbortController();
  const externalSignal = signal;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  // Tie external signal to our controller
  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort();
    } else {
      externalSignal.addEventListener('abort', () => controller.abort(), { once: true });
    }
  }

  timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let responseData: T;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      responseData = await res.json();
    } else {
      responseData = (await res.text()) as unknown as T;
    }

    const envelope: ResponseEnvelope<T> = {
      ok: res.ok,
      status: res.status,
      headers: res.headers,
      data: responseData,
    };

    // Run response interceptors
    let processed = envelope as ResponseEnvelope<unknown>;
    for (const fn of interceptors.response) {
      processed = fn(processed);
    }

    if (!processed.ok) {
      const msg =
        (processed.data as Record<string, string>)?.error ||
        (processed.data as Record<string, string>)?.message ||
        `Request failed with status ${processed.status}`;
      throw new ApiError(msg, processed.status, processed.data);
    }

    return processed.data as T;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new TimeoutError();
    }
    if (err instanceof TypeError && (err.message.includes('fetch') || err.message.includes('Failed to fetch'))) {
      throw new NetworkError();
    }
    throw err;
  }
}

/**
 * Public fetch function with retry, cache, and deduplication.
 */
export async function apiFetch<T>(url: string, config: RequestConfig = {}): Promise<T> {
  const {
    method = 'GET',
    retries = 1,
    retryDelay = 1000,
    cacheTtl,
    skipDedup = false,
  } = config;

  // Apply request interceptors
  let finalConfig: RequestConfig = { ...config, method };
  for (const fn of interceptors.request) {
    finalConfig = await fn(finalConfig, url);
  }

  // Check cache for GET requests
  const cacheKey = getCacheKey(method, url, finalConfig.body);
  if (method === 'GET' && cacheTtl) {
    const cached = getFromCache<T>(cacheKey);
    if (cached !== null) return cached;
  }

  // Deduplication for GET requests
  if (method === 'GET' && !skipDedup && inflight.has(cacheKey)) {
    return inflight.get(cacheKey) as Promise<T>;
  }

  const fullUrl = url.startsWith('http') ? url : `${env.API_BASE_URL}${url}`;

  const executeWithRetry = async (attempt: number): Promise<T> => {
    try {
      return await rawFetch<T>(fullUrl, finalConfig);
    } catch (err) {
      const isRetryable =
        (err instanceof ApiError && err.isRetryable) ||
        err instanceof NetworkError ||
        err instanceof TimeoutError;

      if (isRetryable && attempt < retries) {
        const jitter = retryDelay * (0.5 + Math.random() * 0.5);
        await delay(jitter * attempt);
        return executeWithRetry(attempt + 1);
      }
      throw err;
    }
  };

  const promise = executeWithRetry(0);

  if (method === 'GET' && !skipDedup) {
    inflight.set(cacheKey, promise);
    promise.finally(() => inflight.delete(cacheKey));
  }

  const result = await promise;

  // Store in cache
  if (method === 'GET' && cacheTtl) {
    setCache(cacheKey, result, cacheTtl);
  }

  return result;
}

/**
 * Clear all cached responses.
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Clear cached responses matching a prefix.
 */
export function clearCacheByPrefix(prefix: string): void {
  for (const key of cache.keys()) {
    if (key.includes(prefix)) cache.delete(key);
  }
}

/**
 * Convenience methods matching REST verbs.
 */
export const api = {
  get<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return apiFetch<T>(url, { ...config, method: 'GET' });
  },
  post<T>(url: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return apiFetch<T>(url, { ...config, method: 'POST', body });
  },
  put<T>(url: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return apiFetch<T>(url, { ...config, method: 'PUT', body });
  },
  patch<T>(url: string, body?: unknown, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return apiFetch<T>(url, { ...config, method: 'PATCH', body });
  },
  delete<T>(url: string, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return apiFetch<T>(url, { ...config, method: 'DELETE' });
  },
};
