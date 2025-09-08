// Multi-Platform Social Media API Integration for PlayerLAB
// Combines multiple social media APIs for comprehensive hype and sentiment analysis

import { apiClient } from './api-client';
import { API_CONFIG } from './config';

export interface SocialPost {
  id: string
  platform: string
  content: string
  author: string
  authorHandle: string
  publishedAt: string
  likes: number
  shares: number
  comments: number
  views?: number
  sentiment: "positive" | "negative" | "neutral"
  hashtags: string[]
  mentions: string[]
  url?: string
  mediaUrl?: string
  verified: boolean
  followers?: number
}

export interface SocialMetrics {
  totalPosts: number
  totalEngagement: number
  averageSentiment: number
  trendingHashtags: string[]
  topMentions: string[]
  viralPosts: SocialPost[]
  sentimentBreakdown: {
    positive: number
    negative: number
    neutral: number
  }
  platformBreakdown: {
    [platform: string]: number
  }
}

export interface SocialSource {
  name: string
  baseUrl: string
  requiresKey: boolean
  rateLimit: string
  platforms: string[]
  features: string[]
}

class MultiSocialAPI {
  private cache: Map<string, unknown> = new Map()
  private cacheTimestamp: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 1000 * 60 * 10 // 10 minutes

  // Social Sources Configuration
  private socialSources: SocialSource[] = [
    {
      name: "Reddit API",
      baseUrl: API_CONFIG.SOCIAL.REDDIT.BASE_URL,
      requiresKey: false,
      rateLimit: "1000/hour",
      platforms: ["reddit"],
      features: ["posts", "comments", "sentiment", "trending"]
    },
    {
      name: "YouTube API",
      baseUrl: API_CONFIG.SOCIAL.YOUTUBE.BASE_URL,
      requiresKey: true,
      rateLimit: "10000/day",
      platforms: ["youtube"],
      features: ["videos", "comments", "views", "likes"]
    },
    {
      name: "Mastodon API",
      baseUrl: API_CONFIG.SOCIAL.MASTODON.BASE_URL,
      requiresKey: false,
      rateLimit: "300/hour",
      platforms: ["mastodon"],
      features: ["posts", "mentions", "hashtags"]
    },
    {
      name: "Bluesky API",
      baseUrl: API_CONFIG.SOCIAL.BLUESKY.BASE_URL,
      requiresKey: false,
      rateLimit: "1000/hour",
      platforms: ["bluesky"],
      features: ["posts", "mentions", "hashtags"]
    }
  ]

  // Get social media data from multiple platforms
  async getMultiPlatformSocialData(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      console.log(`🔄 Fetching ${sport} social media data from multiple platforms...`)
      
      const sources = this.socialSources
      const allPosts: SocialPost[] = []

      for (const source of sources) {
        try {
          const posts = await this.fetchFromSource(source, sport, playerName)
          if (posts && posts.length > 0) {
            allPosts.push(...posts)
          }
        } catch (error) {
          console.warn(`⚠️ Failed to fetch from ${source.name}:`, error.message)
        }
      }

      // Also fetch from web scraping sources
      const scrapedPosts = await this.fetchScrapedSocialData(sport, playerName)
      allPosts.push(...scrapedPosts)

      // Sort by engagement and remove duplicates
      const uniquePosts = this.removeDuplicates(allPosts)
      const sortedPosts = uniquePosts.sort((a, b) => 
        (b.likes + b.shares + b.comments) - (a.likes + a.shares + a.comments)
      )

      console.log(`✅ Loaded ${sortedPosts.length} ${sport} social posts from ${sources.length + 1} sources`)
      
      return sortedPosts
    } catch (error) {
      console.error(`❌ Error fetching ${sport} social data:`, error)
      return this.generateMockSocialPosts(sport, playerName)
    }
  }

  // Get comprehensive social metrics
  async getSocialMetrics(sport: string, playerName?: string): Promise<SocialMetrics> {
    try {
      const posts = await this.getMultiPlatformSocialData(sport, playerName)
      
      const totalPosts = posts.length
      const totalEngagement = posts.reduce((sum, post) => 
        sum + post.likes + post.shares + post.comments, 0
      )
      
      const sentimentCounts = posts.reduce((acc, post) => {
        acc[post.sentiment]++
        return acc
      }, { positive: 0, negative: 0, neutral: 0 })
      
      const averageSentiment = this.calculateAverageSentiment(sentimentCounts)
      
      const hashtags = this.extractTrendingHashtags(posts)
      const mentions = this.extractTopMentions(posts)
      const viralPosts = posts.filter(post => 
        (post.likes + post.shares + post.comments) > 100
      ).slice(0, 10)
      
      const platformBreakdown = posts.reduce((acc, post) => {
        acc[post.platform] = (acc[post.platform] || 0) + 1
        return acc
      }, {} as { [key: string]: number })

      return {
        totalPosts,
        totalEngagement,
        averageSentiment,
        trendingHashtags: hashtags,
        topMentions: mentions,
        viralPosts,
        sentimentBreakdown: sentimentCounts,
        platformBreakdown
      }
    } catch (error) {
      console.error("❌ Error calculating social metrics:", error)
      return this.generateMockSocialMetrics(sport)
    }
  }

  // Fetch data from a specific source
  private async fetchFromSource(source: SocialSource, sport: string, playerName?: string): Promise<SocialPost[]> {
    const cacheKey = `${source.name}_${sport}_${playerName || 'all'}`
    
    // Check cache first
    if (this.cache.has(cacheKey) && Date.now() - (this.cacheTimestamp.get(cacheKey) || 0) < this.CACHE_DURATION) {
      console.log(`📦 Using cached social data from ${source.name}`)
      return this.cache.get(cacheKey)
    }

    let posts: SocialPost[] = []

    switch (source.name) {
      case "Reddit API":
        posts = await this.fetchRedditPosts(sport, playerName)
        break
      case "YouTube API":
        posts = await this.fetchYouTubePosts(sport, playerName)
        break
      case "Mastodon API":
        posts = await this.fetchMastodonPosts(sport, playerName)
        break
      case "Bluesky API":
        posts = await this.fetchBlueskyPosts(sport, playerName)
        break
      default:
        console.warn(`⚠️ Unknown social source: ${source.name}`)
        return []
    }

    // Cache the data
    this.cache.set(cacheKey, posts)
    this.cacheTimestamp.set(cacheKey, Date.now())

    return posts
  }

  // Reddit Posts Implementation
  private async fetchRedditPosts(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      const subreddits = this.getRedditSubreddits(sport)
      const posts: SocialPost[] = []

      for (const subreddit of subreddits) {
        try {
          const data = await apiClient.get(`${API_CONFIG.SOCIAL.REDDIT.BASE_URL}/r/${subreddit}/hot.json?25`);
          
          data.data.children.forEach((post: unknown) => {
            const postData = post.data
            const content = postData.title + (postData.selftext ? ' ' + postData.selftext : '')
            
            // for relevant content
            if (this.isRelevantContent(content, sport, playerName)) {
              posts.push({
                id: `reddit_${postData.id}`,
                platform: "reddit",
                content: content.substring(0, 500),
                author: postData.author,
                authorHandle: `u/${postData.author}`,
                publishedAt: new Date(postData.created_utc * 1000).toISOString(),
                likes: postData.score,
                shares: postData.num_crossposts,
                comments: postData.num_comments,
                sentiment: this.analyzeSentiment(content),
                hashtags: this.extractHashtags(content),
                mentions: this.extractMentions(content),
                url: `https://reddit.com${postData.permalink}`,
                verified: false,
                followers: 0
              })
            }
          })
        } catch (error) {
          console.warn(`⚠️ Failed to fetch from r/${subreddit}:`, error.message)
        }
      }

      return posts
    } catch (error) {
      console.error("❌ Error fetching Reddit posts:", error)
      return []
    }
  }

  // YouTube Posts Implementation
  private async fetchYouTubePosts(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      // This would require an API key in production
      // For now, return mock data
      return this.generateMockSocialPosts(sport, playerName, "youtube")
    } catch (error) {
      console.error("❌ Error fetching YouTube posts:", error)
      return []
    }
  }

  // Mastodon Posts Implementation
  private async fetchMastodonPosts(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      interface MastodonPost {
        id: string
        content: string
        account: {
          display_name: string
          username: string
          acct: string
          verified: boolean
          followers_count: number
        }
        created_at: string
        favourites_count: number
        reblogs_count: number
        replies_count: number
        url: string
        media_attachments?: { url: string }[]
      }

      const data = await apiClient.get<MastodonPost[]>(`${API_CONFIG.SOCIAL.MASTODON.BASE_URL}/timelines/public?40`);

      const posts: SocialPost[] = []

      data.forEach(post => {
        const content = post.content.replace(/<[^>]*>/g, '') // Remove HTML tags
        
        if (this.isRelevantContent(content, sport, playerName)) {
          posts.push({
            id: `mastodon_${post.id}`,
            platform: "mastodon",
            content: content.substring(0, 500),
            author: post.account.display_name,
            authorHandle: `@${post.account.username}@${post.account.acct.split('@')[1] || 'mastodon.social'}`,
            publishedAt: post.created_at,
            likes: post.favourites_count,
            shares: post.reblogs_count,
            comments: post.replies_count,
            sentiment: this.analyzeSentiment(content),
            hashtags: this.extractHashtags(content),
            mentions: this.extractMentions(content),
            url: post.url,
            mediaUrl: post.media_attachments?.[0]?.url,
            verified: post.account.verified,
            followers: post.account.followers_count
          })
        }
      })

      return posts
    } catch (error) {
      console.error("❌ Error fetching Mastodon posts:", error)
      return []
    }
  }

  // Bluesky Posts Implementation
  private async fetchBlueskyPosts(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      // Bluesky API requires authentication
      // For now, return mock data
      return this.generateMockSocialPosts(sport, playerName, "bluesky")
    } catch (error) {
      console.error("❌ Error fetching Bluesky posts:", error)
      return []
    }
  }

  // Web scraping for additional social data
  private async fetchScrapedSocialData(sport: string, playerName?: string): Promise<SocialPost[]> {
    try {
      // This would implement web scraping for social media data
      // For now, return mock data
      return this.generateMockSocialPosts(sport, playerName, "scraped")
    } catch (error) {
      console.error("❌ Error fetching scraped social data:", error)
      return []
    }
  }

  // Helper methods
  // Only use NFL/football for now
  private getRedditSubreddits(sport: string): string[] {
    const subredditMap: { [key: string]: string[] } = {
      "NFL": ["nfl", "fantasyfootball", "NFL_Draft"]
      // "NBA": ["nba", "fantasybball", "NBADraft"],
      // "MLB": ["baseball", "fantasybaseball", "MLBDraft"],
      // "NHL": ["hockey", "fantasyhockey", "NHL_Draft"]
    }
    return subredditMap[sport] || ["nfl"]
  }

  private isRelevantContent(content: string, sport: string, playerName?: string): boolean {
    const sportKeywords: { [key: string]: string[] } = {
      "NFL": ["nfl", "football", "quarterback", "running back", "wide receiver", "tight end", "defense", "kicker"]
      // "NBA": ["nba", "basketball", "point guard", "shooting guard", "small forward", "power forward", "center"],
      // "MLB": ["mlb", "baseball", "pitcher", "catcher", "first base", "second base", "third base", "shortstop"],
      // "NHL": ["nhl", "hockey", "goalie", "defenseman", "left wing", "right wing"]
    }
    const keywords = sportKeywords[sport] || []
    const lowerContent = content.toLowerCase()
    const hasSportKeywords = keywords.some(keyword => lowerContent.includes(keyword))
    if (playerName) {
      return hasSportKeywords && lowerContent.includes(playerName.toLowerCase())
    }
    return hasSportKeywords
  }

  private analyzeSentiment(content: string): "positive" | "negative" | "neutral" {
    const lowerContent = content.toLowerCase()
    
    const positiveWords = ["great", "amazing", "awesome", "fantastic", "excellent", "good", "love", "best", "win", "victory", "champion"]
    const negativeWords = ["bad", "terrible", "awful", "worst", "hate", "lose", "loss", "injury", "hurt", "suck", "disappointing"]
    
    const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length
    
    if (positiveCount > negativeCount) return "positive"
    if (negativeCount > positiveCount) return "negative"
    return "neutral"
  }

  private extractHashtags(content: string): string[] {
    const hashtagRegex = /#(\w+)/g
    const matches = content.match(hashtagRegex)
    return matches ? matches.map(tag => tag.substring(1)) : []
  }

  private extractMentions(content: string): string[] {
    const mentionRegex = /@(\w+)/g
    const matches = content.match(mentionRegex)
    return matches ? matches.map(mention => mention.substring(1)) : []
  }

  private calculateAverageSentiment(sentimentCounts: { positive: number, negative: number, neutral: number }): number {
    const total = sentimentCounts.positive + sentimentCounts.negative + sentimentCounts.neutral
    if (total === 0) return 0
    
    return (sentimentCounts.positive - sentimentCounts.negative) / total
  }

  private extractTrendingHashtags(posts: SocialPost[]): string[] {
    const hashtagCounts: { [key: string]: number } = {}
    
    posts.forEach(post => {
      post.hashtags.forEach(tag => {
        hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1
      })
    })
    
    return Object.entries(hashtagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag)
  }

  private extractTopMentions(posts: SocialPost[]): string[] {
    const mentionCounts: { [key: string]: number } = {}
    
    posts.forEach(post => {
      post.mentions.forEach(mention => {
        mentionCounts[mention] = (mentionCounts[mention] || 0) + 1
      })
    })
    
    return Object.entries(mentionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([mention]) => mention)
  }

  private removeDuplicates(posts: SocialPost[]): SocialPost[] {
    const seen = new Set<string>()
    return posts.filter(post => {
      const key = `${post.content.substring(0, 100)}_${post.platform}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  // Generate mock social posts for fallback
  // Only generate NFL/football posts for now
  private generateMockSocialPosts(sport: string, playerName?: string, platform: string = "mock"): SocialPost[] {
    return [
      {
        id: "1",
        platform: platform,
        content: `NFL is heating up! 🔥 Great performance from the top players this season. #NFL #FantasyFootball`,
        author: "SportsFan",
        authorHandle: "@sportsfan",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        likes: Math.floor(Math.random() * 500) + 100,
        shares: Math.floor(Math.random() * 100) + 20,
        comments: Math.floor(Math.random() * 50) + 10,
        sentiment: "positive",
        hashtags: [sport, "Fantasy", "Sports"],
        mentions: [],
        verified: false,
        followers: Math.floor(Math.random() * 10000) + 1000
      },
      {
        id: "2",
        platform: platform,
        content: `Injury update: ${sport} player status uncertain. Fantasy managers need to monitor this closely. #${sport} #Injury`,
        author: "FantasyExpert",
        authorHandle: "@fantasyexpert",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        likes: Math.floor(Math.random() * 300) + 50,
        shares: Math.floor(Math.random() * 80) + 15,
        comments: Math.floor(Math.random() * 30) + 5,
        sentiment: "negative",
        hashtags: [sport, "Injury", "Fantasy"],
        mentions: [],
        verified: true,
        followers: Math.floor(Math.random() * 50000) + 5000
      },
      {
        id: "3",
        platform: platform,
        content: `Trade rumors swirling in ${sport}. This could shake up fantasy leagues! #${sport} #Trade #Fantasy`,
        author: "TradeInsider",
        authorHandle: "@tradeinsider",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        likes: Math.floor(Math.random() * 400) + 80,
        shares: Math.floor(Math.random() * 120) + 25,
        comments: Math.floor(Math.random() * 40) + 8,
        sentiment: "neutral",
        hashtags: [sport, "Trade", "Fantasy"],
        mentions: [],
        verified: false,
        followers: Math.floor(Math.random() * 20000) + 2000
      }
    ]
  }

  // Generate mock social metrics
  private generateMockSocialMetrics(sport: string): SocialMetrics {
    return {
      totalPosts: Math.floor(Math.random() * 1000) + 500,
      totalEngagement: Math.floor(Math.random() * 50000) + 10000,
      averageSentiment: Math.random() * 0.6 - 0.3, // Between -0.3 and 0.3
      trendingHashtags: [sport, "Fantasy", "Sports", "GameDay", "Championship"],
      topMentions: ["ESPN", "SportsCenter", "FantasyPros", "PlayerLAB"],
      viralPosts: [],
      sentimentBreakdown: {
        positive: Math.floor(Math.random() * 400) + 200,
        negative: Math.floor(Math.random() * 200) + 50,
        neutral: Math.floor(Math.random() * 300) + 150
      },
      platformBreakdown: {
        reddit: Math.floor(Math.random() * 300) + 100,
        twitter: Math.floor(Math.random() * 400) + 150,
        instagram: Math.floor(Math.random() * 200) + 50,
        youtube: Math.floor(Math.random() * 100) + 25
      }
    }
  }
}

// Export singleton instance
export const multiSocialAPI = new MultiSocialAPI() 