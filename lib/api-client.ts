import { API_CONFIG, RATE_LIMITS } from './config';

// Custom error classes
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    message?: string
  ) {
    super(message || `${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

export class RateLimitError extends Error {
  constructor(public retryAfter: number) {
    super(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
    this.name = 'RateLimitError';
  }
}

// Rate limiter implementation
class RateLimiter {
  private requests: { timestamp: number }[] = [];
  
  constructor(
    private maxRequests: number,
    private interval: number
  ) {}
  
  async acquire(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(
      req => now - req.timestamp < this.interval
    );
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.interval - (now - oldestRequest.timestamp);
      throw new RateLimitError(Math.ceil(waitTime / 1000));
    }
    
    this.requests.push({ timestamp: now });
  }
}

// Secure API Client
export class ApiClient {
  private rateLimiters: Map<string, RateLimiter> = new Map();
  
  constructor(private baseURL?: string) {
    // Initialize rate limiters for different API types
    this.rateLimiters.set('default', new RateLimiter(RATE_LIMITS.DEFAULT.requests, RATE_LIMITS.DEFAULT.interval));
    this.rateLimiters.set('news', new RateLimiter(RATE_LIMITS.NEWS.requests, RATE_LIMITS.NEWS.interval));
    this.rateLimiters.set('social', new RateLimiter(RATE_LIMITS.SOCIAL.requests, RATE_LIMITS.SOCIAL.interval));
    this.rateLimiters.set('ai', new RateLimiter(RATE_LIMITS.AI.requests, RATE_LIMITS.AI.interval));
  }
  
  private getRateLimiter(type: string = 'default'): RateLimiter {
    return this.rateLimiters.get(type) || this.rateLimiters.get('default')!;
  }
  
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {},
    apiType: string = 'default',
    requireAuth: boolean = false
  ): Promise<T> {
    // Apply rate limiting
    await this.getRateLimiter(apiType).acquire();
    
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'PlayerLAB/1.0',
      ...(options.headers as Record<string, string>),
    };
    
    // Add authentication if required
    if (requireAuth) {
      const apiKey = this.getApiKey(url);
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          throw new RateLimitError(parseInt(retryAfter || '60'));
        }
        
        throw new ApiError(
          response.status,
          response.statusText,
          url,
          `Request failed: ${response.status} ${response.statusText}`
        );
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof RateLimitError || error instanceof ApiError) {
        throw error;
      }
      
      throw new ApiError(
        0,
        'Network Error',
        url,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
  
  private getApiKey(url: string): string | null {
    // Determine which API key to use based on URL
    if (url.includes('fantasypros.com')) {
      return API_CONFIG.FANTASY_PROS.API_KEY || null;
    }
    if (url.includes('newsapi.org')) {
      return API_CONFIG.NEWS.NEWS_API_KEY || null;
    }
    if (url.includes('gnews.io')) {
      return API_CONFIG.NEWS.GNEWS_KEY || null;
    }
    if (url.includes('youtube.googleapis.com')) {
      return API_CONFIG.SOCIAL.YOUTUBE.API_KEY || null;
    }
    if (url.includes('huggingface.co')) {
      return API_CONFIG.AI.HUGGINGFACE_KEY || null;
    }
    return null;
  }
  
  // Public methods for different API types
  async get<T>(url: string, apiType: string = 'default', requireAuth: boolean = false): Promise<T> {
    return this.makeRequest<T>(url, { method: 'GET' }, apiType, requireAuth);
  }
  
  async post<T>(url: string, data: unknown, apiType: string = 'default', requireAuth: boolean = false): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }, apiType, requireAuth);
  }
  
  async put<T>(url: string, data: unknown, apiType: string = 'default', requireAuth: boolean = false): Promise<T> {
    return this.makeRequest<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, apiType, requireAuth);
  }
  
  async delete<T>(url: string, apiType: string = 'default', requireAuth: boolean = false): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE' }, apiType, requireAuth);
  }
}

// Global API client instance
export const apiClient = new ApiClient(); 