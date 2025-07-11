import { z } from "zod"

// Base validation schemas
export const baseSchemas = {
  id: z.string().min(1, "ID is required"),
  email: z.string().email("Invalid email address"),
  url: z.string().url("Invalid URL"),
  timestamp: z.string().datetime("Invalid timestamp"),
}

// User validation schemas
export const userSchemas = {
  create: z.object({
    email: baseSchemas.email,
    name: z.string().min(2, "Name must be at least 2 characters"),
    avatar: baseSchemas.url.optional(),
  }),
  
  update: z.object({
    email: baseSchemas.email.optional(),
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    avatar: baseSchemas.url.optional(),
  }),
  
  id: z.object({
    id: baseSchemas.id,
  }),
}

// Dashboard validation schemas
export const dashboardWidgetSchema = z.object({
  id: baseSchemas.id,
  type: z.enum(["stats", "players", "schedule", "alerts"]),
  title: z.string().min(1, "Title is required"),
  data: z.any(),
  color: z.enum(["cyan", "green", "purple", "yellow"]),
})

export const dashboardSchemas = {
  widget: dashboardWidgetSchema,
  
  updateWidgets: z.object({
    widgets: z.array(dashboardWidgetSchema),
  }),
  
  moveWidget: z.object({
    from: z.number().int().min(0),
    to: z.number().int().min(0),
  }),
}

// Analytics validation schemas
export const analyticsSchemas = {
  timeframe: z.enum(["hour", "day", "week", "month"]),
  
  heatmapData: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    intensity: z.number().min(0).max(1),
    clicks: z.number().int().min(0),
    hovers: z.number().int().min(0),
  }),
  
  abTest: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Test name is required"),
    status: z.enum(["running", "paused", "completed"]),
    variantA: z.string().min(1, "Variant A is required"),
    variantB: z.string().min(1, "Variant B is required"),
    trafficSplit: z.number().min(0).max(100),
    conversionRateA: z.number().min(0).max(100),
    conversionRateB: z.number().min(0).max(100),
    confidence: z.number().min(0).max(100),
    startDate: baseSchemas.timestamp,
    endDate: baseSchemas.timestamp.optional(),
  }),
  
  errorLog: z.object({
    id: baseSchemas.id,
    timestamp: baseSchemas.timestamp,
    level: z.enum(["error", "warning", "info"]),
    message: z.string().min(1, "Message is required"),
    stack: z.string().optional(),
    userAgent: z.string(),
    url: baseSchemas.url,
    userId: baseSchemas.id.optional(),
    sessionId: baseSchemas.id,
  }),
}

// Smart Tester validation schemas
export const smartTesterSchemas = {
  testGeneration: z.object({
    description: z.string().min(10, "Description must be at least 10 characters"),
    framework: z.enum(["jest", "playwright", "cypress"]),
    type: z.enum(["unit", "integration", "e2e"]),
    component: z.string().optional(),
    features: z.array(z.string()).optional(),
  }),
  
  testCase: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Test name is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["unit", "integration", "e2e"]),
    framework: z.enum(["jest", "playwright", "cypress"]),
    code: z.string().min(1, "Test code is required"),
    status: z.enum(["pending", "running", "passed", "failed"]),
    bugs: z.array(z.object({
      id: baseSchemas.id,
      severity: z.enum(["low", "medium", "high", "critical"]),
      description: z.string().min(1, "Bug description is required"),
      line: z.number().int().min(1),
      suggestion: z.string().min(1, "Suggestion is required"),
    })),
  }),
}

// Plugins validation schemas
export const pluginSchemas = {
  plugin: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Plugin name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    author: z.string().min(1, "Author is required"),
    version: z.string().regex(/^\d+\.\d+\.\d+$/, "Invalid version format"),
    category: z.enum(["Analytics", "AI/ML", "UI/UX", "Integration", "Draft Tools", "Communication"]),
    rating: z.number().min(0).max(5),
    downloads: z.number().int().min(0),
    price: z.enum(["free", "premium", "enterprise"]),
    status: z.enum(["installed", "available", "updating"]),
    features: z.array(z.string()),
    tags: z.array(z.string()),
    lastUpdated: baseSchemas.timestamp,
    size: z.string().regex(/^\d+\.\d+MB$/, "Invalid size format"),
    compatibility: z.array(z.string()),
  }),
  
  apiIntegration: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Integration name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    provider: z.string().min(1, "Provider is required"),
    category: z.enum(["Fantasy Sports", "Sports Data", "External Data"]),
    status: z.enum(["connected", "available", "error"]),
    endpoints: z.number().int().min(0),
    rateLimit: z.string().min(1, "Rate limit is required"),
    pricing: z.string().min(1, "Pricing is required"),
  }),
}

// Achievements validation schemas
export const achievementSchemas = {
  achievement: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Achievement name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(["Wins", "Trading", "Drafting", "Analytics", "Plugins", "Community"]),
    rarity: z.enum(["common", "rare", "epic", "legendary"]),
    progress: z.number().int().min(0),
    maxProgress: z.number().int().min(1),
    completed: z.boolean(),
    completedAt: baseSchemas.timestamp.optional(),
    points: z.number().int().min(0),
    rewards: z.array(z.string()),
    requirements: z.array(z.string()),
  }),
  
  badge: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Badge name is required"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(["Progression", "Trading", "Analytics", "Prestige"]),
    rarity: z.enum(["common", "rare", "epic", "legendary"]),
    unlocked: z.boolean(),
    unlockedAt: baseSchemas.timestamp.optional(),
    progress: z.number().int().min(0),
    maxProgress: z.number().int().min(1),
  }),
}

// Trade Analyzer validation schemas
export const tradeAnalyzerSchemas = {
  tradeRequest: z.object({
    player1: z.object({
      name: z.string().min(1, "Player name is required"),
      position: z.enum(["QB", "RB", "WR", "TE", "K", "DEF"]),
      team: z.string().min(1, "Team is required"),
      value: z.number().min(0),
    }),
    player2: z.object({
      name: z.string().min(1, "Player name is required"),
      position: z.enum(["QB", "RB", "WR", "TE", "K", "DEF"]),
      team: z.string().min(1, "Team is required"),
      value: z.number().min(0),
    }),
    league: z.object({
      type: z.enum(["standard", "ppr", "half-ppr"]),
      teams: z.number().int().min(8).max(16),
      scoring: z.string().optional(),
    }),
  }),
  
  analysisResult: z.object({
    tradeId: baseSchemas.id,
    recommendation: z.enum(["accept", "decline", "counter"]),
    confidence: z.number().min(0).max(100),
    reasoning: z.array(z.string()),
    valueDifference: z.number(),
    riskLevel: z.enum(["low", "medium", "high"]),
    timestamp: baseSchemas.timestamp,
  }),
}

// Draft Kit validation schemas
export const draftKitSchemas = {
  player: z.object({
    id: baseSchemas.id,
    name: z.string().min(1, "Player name is required"),
    position: z.enum(["QB", "RB", "WR", "TE", "K", "DEF"]),
    team: z.string().min(1, "Team is required"),
    rank: z.number().int().min(1),
    tier: z.number().int().min(1),
    adp: z.number().min(0),
    value: z.number().min(0),
    projections: z.object({
      points: z.number().min(0),
      touchdowns: z.number().min(0),
      yards: z.number().min(0),
    }),
  }),
  
  draftSettings: z.object({
    leagueType: z.enum(["standard", "ppr", "half-ppr"]),
    teams: z.number().int().min(8).max(16),
    rounds: z.number().int().min(10).max(20),
    positions: z.object({
      QB: z.number().int().min(0),
      RB: z.number().int().min(0),
      WR: z.number().int().min(0),
      TE: z.number().int().min(0),
      K: z.number().int().min(0),
      DEF: z.number().int().min(0),
    }),
  }),
}

// Rate limiting and abuse protection
export const rateLimitSchemas = {
  request: z.object({
    ip: z.string().ip(),
    endpoint: z.string().min(1),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
    timestamp: baseSchemas.timestamp,
    userAgent: z.string().optional(),
    userId: baseSchemas.id.optional(),
  }),
  
  response: z.object({
    success: z.boolean(),
    message: z.string(),
    retryAfter: z.number().int().min(0).optional(),
    remaining: z.number().int().min(0).optional(),
  }),
}

// Error response schema
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional(),
    timestamp: baseSchemas.timestamp,
    requestId: baseSchemas.id.optional(),
  }),
})

// Success response schema
export const successResponseSchema = z.object({
  success: z.literal(true),
  data: z.any(),
  message: z.string().optional(),
  timestamp: baseSchemas.timestamp,
})

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
})

// Search and filter schemas
export const searchSchemas = {
  query: z.object({
    q: z.string().min(1, "Search query is required"),
    category: z.string().optional(),
    sort: z.enum(["relevance", "date", "name", "rating"]).optional(),
    order: z.enum(["asc", "desc"]).optional(),
  }),
  
  filter: z.object({
    category: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    price: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5).optional(),
    dateRange: z.object({
      start: baseSchemas.timestamp,
      end: baseSchemas.timestamp,
    }).optional(),
  }),
}

// Export all schemas
export const schemas = {
  base: baseSchemas,
  user: userSchemas,
  dashboard: dashboardSchemas,
  analytics: analyticsSchemas,
  smartTester: smartTesterSchemas,
  plugin: pluginSchemas,
  achievement: achievementSchemas,
  tradeAnalyzer: tradeAnalyzerSchemas,
  draftKit: draftKitSchemas,
  rateLimit: rateLimitSchemas,
  error: errorResponseSchema,
  success: successResponseSchema,
  pagination: paginationSchema,
  search: searchSchemas,
}

export default schemas 