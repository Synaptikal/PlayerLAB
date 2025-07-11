import { CACHE_CONFIG } from './config';

// LRU Cache implementation
export class LRUCache<K, V> {
  private cache = new Map<K, { value: V; timestamp: number }>();
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number = CACHE_CONFIG.MAX_ITEMS, ttl: number = CACHE_CONFIG.DEFAULT_TTL) {
    this.maxSize = maxSize;
    this.ttl = ttl;
  }

  set(key: K, value: V): void {
    // Remove expired entries first
    this.cleanup();

    // If cache is full, remove least recently used item
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() });
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    
    if (!item) {
      return undefined;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);
    
    return item.value;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    this.cleanup();
    return this.cache.size;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats(): { size: number; maxSize: number; hitRate: number } {
    return {
      size: this.size(),
      maxSize: this.maxSize,
      hitRate: 0 // TODO: Implement hit rate tracking
    };
  }
}

// Cache manager for different types of data
export class CacheManager {
  private caches: Map<string, LRUCache<string, unknown>> = new Map();

  constructor() {
    // Initialize caches for different data types
    this.caches.set('news', new LRUCache(CACHE_CONFIG.MAX_ITEMS, CACHE_CONFIG.NEWS_TTL));
    this.caches.set('social', new LRUCache(CACHE_CONFIG.MAX_ITEMS, CACHE_CONFIG.SOCIAL_TTL));
    this.caches.set('sports', new LRUCache(CACHE_CONFIG.MAX_ITEMS, CACHE_CONFIG.DEFAULT_TTL));
    this.caches.set('ai', new LRUCache(CACHE_CONFIG.MAX_ITEMS, CACHE_CONFIG.DEFAULT_TTL));
  }

  getCache(type: string): LRUCache<string, unknown> {
    return this.caches.get(type) || this.caches.get('sports')!;
  }

  // Generate cache key from parameters
  generateKey(prefix: string, params: Record<string, unknown>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${prefix}:${sortedParams}`;
  }

  // Cache with automatic key generation
  async getOrSet<T>(
    type: string,
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cache = this.getCache(type);
    
    // Try to get from cache first
    const cached = cache.get(key);
    if (cached !== undefined) {
      return cached as T;
    }

    // Fetch fresh data
    const fresh = await fetcher();
    cache.set(key, fresh);
    
    return fresh;
  }

  // Clear all caches
  clearAll(): void {
    for (const cache of this.caches.values()) {
      cache.clear();
    }
  }

  // Get statistics for all caches
  getStats(): Record<string, { size: number; maxSize: number; hitRate: number }> {
    const stats: Record<string, { size: number; maxSize: number; hitRate: number }> = {};
    for (const [type, cache] of this.caches.entries()) {
      stats[type] = cache.getStats();
    }
    return stats;
  }
}

// Global cache manager instance
export const cacheManager = new CacheManager(); 