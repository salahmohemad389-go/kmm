/**
 * Typed storage abstraction over localStorage.
 * All keys are namespaced with `elite_kinetic:` prefix to avoid collisions.
 * Values are always stored as JSON.
 */

const PREFIX = 'elite_kinetic:';
const MEMORY_STORE = new Map<string, string>();

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = `${PREFIX}__test__`;
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const canUseLocalStorage = isLocalStorageAvailable();

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = canUseLocalStorage
        ? localStorage.getItem(`${PREFIX}${key}`)
        : MEMORY_STORE.get(`${PREFIX}${key}`);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      // Corrupted data — remove and return fallback
      storage.remove(key);
      return fallback;
    }
  },

  set(key: string, value: unknown): boolean {
    try {
      const serialized = JSON.stringify(value);
      if (canUseLocalStorage) {
        localStorage.setItem(`${PREFIX}${key}`, serialized);
      } else {
        MEMORY_STORE.set(`${PREFIX}${key}`, serialized);
      }
      return true;
    } catch {
      console.warn(`[Storage] Failed to persist key "${key}". Storage may be full.`);
      return false;
    }
  },

  remove(key: string): void {
    try {
      if (canUseLocalStorage) {
        localStorage.removeItem(`${PREFIX}${key}`);
      } else {
        MEMORY_STORE.delete(`${PREFIX}${key}`);
      }
    } catch {
      // silently fail
    }
  },

  clear(): void {
    try {
      if (canUseLocalStorage) {
        const keys: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k?.startsWith(PREFIX)) keys.push(k);
        }
        keys.forEach((k) => localStorage.removeItem(k));
      } else {
        MEMORY_STORE.clear();
      }
    } catch {
      // silently fail
    }
  },

  /** Remove all keys in the given list (namespaced automatically). */
  removeMany(keys: string[]): void {
    keys.forEach((k) => storage.remove(k));
  },

  /** Get all namespaced keys (without prefix). */
  keys(): string[] {
    const result: string[] = [];
    if (canUseLocalStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k?.startsWith(PREFIX)) {
          result.push(k.slice(PREFIX.length));
        }
      }
    } else {
      MEMORY_STORE.forEach((_, k) => {
        if (k.startsWith(PREFIX)) {
          result.push(k.slice(PREFIX.length));
        }
      });
    }
    return result;
  },

  /** Check if a key exists. */
  has(key: string): boolean {
    if (canUseLocalStorage) {
      return localStorage.getItem(`${PREFIX}${key}`) !== null;
    }
    return MEMORY_STORE.has(`${PREFIX}${key}`);
  },
};
