import { z } from 'zod';

// API Response Schemas
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  source: z.string(),
  publishedAt: z.string(),
  category: z.enum(["Fantasy Football", "Football Data", "External Data"]),
  sport: z.string(),
  impact: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()),
  url: z.string().url().optional(),
});

export const SocialPostSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  platform: z.string(),
  publishedAt: z.string(),
  engagement: z.object({
    likes: z.number(),
    shares: z.number(),
    comments: z.number(),
  }),
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  url: z.string().url().optional(),
});

export const PlayerDataSchema = z.object({
  playerId: z.string(),
  playerName: z.string(),
  position: z.string(),
  team: z.string(),
  stats: z.record(z.unknown()),
  socialMetrics: z.record(z.unknown()),
  sources: z.array(z.string()),
  confidence: z.number().min(0).max(1),
  lastUpdated: z.string(),
});

// User Input Schemas
export const SearchParamsSchema = z.object({
  query: z.string().min(1).max(100),
  sport: z.enum(['NFL', 'NBA', 'MLB', 'NHL']).optional(),
  category: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
});

export const FilterParamsSchema = z.object({
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).optional(),
  sources: z.array(z.string()).optional(),
  impact: z.enum(['low', 'medium', 'high']).optional(),
  sentiment: z.enum(['positive', 'negative', 'neutral']).optional(),
});

// Validation Functions
export function validateNewsItem(data: unknown): z.infer<typeof NewsItemSchema> {
  return NewsItemSchema.parse(data);
}

export function validateSocialPost(data: unknown): z.infer<typeof SocialPostSchema> {
  return SocialPostSchema.parse(data);
}

export function validatePlayerData(data: unknown): z.infer<typeof PlayerDataSchema> {
  return PlayerDataSchema.parse(data);
}

export function validateSearchParams(data: unknown): z.infer<typeof SearchParamsSchema> {
  return SearchParamsSchema.parse(data);
}

export function validateFilterParams(data: unknown): z.infer<typeof FilterParamsSchema> {
  return FilterParamsSchema.parse(data);
}

// Safe validation with fallbacks
export function safeValidate<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    console.warn('Validation failed:', error);
    return null;
  }
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 100); // Limit length
}

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    // Remove old requests
    const recentRequests = userRequests.filter(time => now - time < this.windowMs);
    
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    
    return true;
  }

  getRemainingTime(key: string): number {
    const userRequests = this.requests.get(key) || [];
    const now = Date.now();
    const oldestRequest = Math.min(...userRequests);
    
    return Math.max(0, this.windowMs - (now - oldestRequest));
  }
} 