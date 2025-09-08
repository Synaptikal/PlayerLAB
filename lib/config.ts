// Secure API Configuration
export const API_CONFIG = {
  // Sleeper API (Public - no key needed)
  SLEEPER: {
    BASE_URL: process.env.NEXT_PUBLIC_SLEEPER_API_URL || "https://api.sleeper.app/v1",
    CDN_URL: process.env.NEXT_PUBLIC_SLEEPER_CDN_URL || "https://sleepercdn.com"
  },

  // ESPN API (Public - no key needed)
  ESPN: {
    BASE_URL: process.env.NEXT_PUBLIC_ESPN_API_URL || "https://site.api.espn.com/apis/site/v2/sports",
    RSS_URL: process.env.NEXT_PUBLIC_ESPN_RSS_URL || "https://www.espn.com/espn/rss/news"
  },

  // FantasyPros API (Requires key)
  FANTASY_PROS: {
    BASE_URL: process.env.FANTASY_PROS_API_URL || "https://api.fantasypros.com/v2",
    API_KEY: process.env.FANTASY_PROS_API_KEY
  },

  // News APIs (Require keys)
  NEWS: {
    NEWS_API_URL: process.env.NEWS_API_URL || "https://newsapi.org/v2",
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    GNEWS_URL: process.env.GNEWS_API_URL || "https://gnews.io/api/v4",
    GNEWS_KEY: process.env.GNEWS_API_KEY
  },

  // Social Media APIs (Require keys)
  SOCIAL: {
    REDDIT: {
      BASE_URL: process.env.REDDIT_API_URL || "https://www.reddit.com",
      CLIENT_ID: process.env.REDDIT_CLIENT_ID,
      CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET
    },
    YOUTUBE: {
      BASE_URL: process.env.YOUTUBE_API_URL || "https://www.googleapis.com/youtube/v3",
      API_KEY: process.env.YOUTUBE_API_KEY
    },
    MASTODON: {
      BASE_URL: process.env.MASTODON_API_URL || "https://mastodon.social/api/v1",
      ACCESS_TOKEN: process.env.MASTODON_ACCESS_TOKEN
    },
    BLUESKY: {
      BASE_URL: process.env.BLUESKY_API_URL || "https://bsky.social/xrpc",
      USERNAME: process.env.BLUESKY_USERNAME,
      PASSWORD: process.env.BLUESKY_PASSWORD
    }
  },

  // Sports APIs (Some require keys)
  SPORTS: {
    NBA: {
      BASE_URL: process.env.NBA_API_URL || "https://www.balldontlie.io/api/v1",
      RAPID_API_KEY: process.env.RAPID_API_KEY
    },
    MLB: {
      BASE_URL: process.env.MLB_API_URL || "https://statsapi.mlb.com/api/v1",
      RAPID_API_KEY: process.env.RAPID_API_KEY
    },
    NHL: {
      BASE_URL: process.env.NHL_API_URL || "https://api.nhle.com/v1",
      RAPID_API_KEY: process.env.RAPID_API_KEY
    }
  },

  // AI Services (Require keys)
  AI: {
    HUGGINGFACE_URL: process.env.HUGGINGFACE_API_URL || "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    HUGGINGFACE_KEY: process.env.HUGGINGFACE_API_KEY
  }
};

export { validateEnvironment, REQUIRED_ENV_VARS } from './validate-env.mjs';

// Rate limiting configuration
export const RATE_LIMITS = {
  DEFAULT: { requests: 100, interval: 60000 }, // 100 requests per minute
  NEWS: { requests: 50, interval: 60000 },     // 50 requests per minute
  SOCIAL: { requests: 30, interval: 60000 },   // 30 requests per minute
  AI: { requests: 20, interval: 60000 }        // 20 requests per minute
};

// Cache configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 15 * 60 * 1000, // 15 minutes
  NEWS_TTL: 5 * 60 * 1000,     // 5 minutes
  SOCIAL_TTL: 10 * 60 * 1000,  // 10 minutes
  MAX_ITEMS: 500
}; 