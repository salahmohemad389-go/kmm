export class AppError extends Error {
  code: string;
  statusCode?: number;
  isRetryable: boolean;

  constructor(message: string, code: string, statusCode?: number, isRetryable = false) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network connection failed. Please check your internet.') {
    super(message, 'NETWORK_ERROR', undefined, true);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends AppError {
  constructor(message = 'Request timed out. Please try again.') {
    super(message, 'TIMEOUT_ERROR', undefined, true);
    this.name = 'TimeoutError';
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode: number, body?: unknown) {
    const isRetryable = statusCode >= 500;
    super(message, 'API_ERROR', statusCode, isRetryable);
    this.name = 'ApiError';
    this.body = body;
  }

  body?: unknown;
}

export class ValidationError extends AppError {
  field: string;
  constructor(message: string, field: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class AuthError extends AppError {
  constructor(message = 'Authentication required.') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthError';
  }
}

export function sanitizeError(err: unknown): { message: string; code: string } {
  if (err instanceof AppError) {
    return { message: err.message, code: err.code };
  }
  if (err instanceof TypeError && err.message.includes('fetch')) {
    return { message: 'Network connection failed.', code: 'NETWORK_ERROR' };
  }
  if (err instanceof DOMException && err.name === 'AbortError') {
    return { message: 'Request was cancelled.', code: 'ABORTED' };
  }
  return { message: 'An unexpected error occurred.', code: 'UNKNOWN' };
}
