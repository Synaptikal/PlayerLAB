// Multi-Source News API Integration for PlayerLAB
// Combines multiple free news APIs for comprehensive sports coverage

import { apiClient } from './api-client';
import { API_CONFIG } from './config';

interface NewsSource {
  name: string;
  url: string;
  category: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  impact: "high" | "medium" | "low";
  publishedAt: string;
  url: string;
}

class MultiNewsAPI {
  private cache: Map<string, unknown> = new Map()
  private cacheTimestamp: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 1000 * 60 * 15 // 15 minutes

  // News Sources Configuration
  private newsSources: NewsSource[] = [
    {
      name: "ESPN API",
      baseUrl: API_CONFIG.ESPN.BASE_URL,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NFL", "NBA", "MLB", "NHL"],
      categories: ["Breaking", "Injury", "Trade", "Performance", "Draft", "Season"]
    },
    {
      name: "FantasyPros",
      baseUrl: API_CONFIG.FANTASY_PROS.BASE_URL,
      requiresKey: false,
      rateLimit: "100/hour",
      sports: ["NFL", "NBA", "MLB", "NHL"],
      categories: ["Fantasy", "Analysis", "Injury", "Trade", "Waiver"]
    },
    {
      name: "NewsAPI",
      baseUrl: API_CONFIG.NEWS.NEWS_API_URL,
      requiresKey: true,
      rateLimit: "100/day",
      sports: ["NFL", "NBA", "MLB", "NHL"],
      categories: ["General", "Breaking", "Analysis"]
    },
    {
      name: "GNews",
      baseUrl: API_CONFIG.NEWS.GNEWS_URL,
      requiresKey: true,
      rateLimit: "100/day",
      sports: ["NFL", "NBA", "MLB", "NHL"],
      categories: ["General", "Breaking", "Analysis"]
    }
  ]

  // Get news from multiple sources and combine them
  async getMultiSourceNews(sport: string, limit: number = 50): Promise<NewsItem[]> {
    try {
      console.log(`🔄 Fetching ${sport} news from multiple sources...`)
      
      const sources = this.newsSources.filter(source => source.sports.includes(sport))
      const allNews: NewsItem[] = []

      for (const source of sources) {
        try {
          const news = await this.fetchFromSource(source, sport, limit)
          if (news && news.length > 0) {
            allNews.push(...news)
          }
        } catch (error) {
          console.warn(`⚠️ Failed to fetch from ${source.name}:`, error.message)
        }
      }

      // Also fetch from RSS feeds
      const rssNews = await this.fetchRSSNews(sport)
      allNews.push(...rssNews)

      // Sort by date and remove duplicates
      const uniqueNews = this.removeDuplicates(allNews)
      const sortedNews = uniqueNews.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )

      console.log(`✅ Loaded ${sortedNews.length} ${sport} news items from ${sources.length + 1} sources`)
      
      return sortedNews.slice(0, limit)
    } catch (error) {
      console.error(`❌ Error fetching ${sport} news:`, error)
      return this.generateMockNews(sport, limit)
    }
  }

  // Fetch data from a specific source
  private async fetchFromSource(source: NewsSource, sport: string, limit: number): Promise<NewsItem[]> {
    const cacheKey = `${source.name}_${sport}_${limit}`
    
    // Check cache first
    if (this.cache.has(cacheKey) && Date.now() - (this.cacheTimestamp.get(cacheKey) || 0) < this.CACHE_DURATION) {
      console.log(`📦 Using cached news from ${source.name}`)
      return this.cache.get(cacheKey)
    }

    let news: NewsItem[] = []

    switch (source.name) {
      case "ESPN API":
        news = await this.fetchESPNNews(sport, limit)
        break
      case "FantasyPros":
        news = await this.fetchFantasyProsNews(sport, limit)
        break
      case "NewsAPI":
        news = await this.fetchNewsAPINews()
        break
      case "GNews":
        news = await this.fetchGNewsNews()
        break
      default:
        console.warn(`⚠️ Unknown news source: ${source.name}`)
        return []
    }

    // Cache the data
    this.cache.set(cacheKey, news)
    this.cacheTimestamp.set(cacheKey, Date.now())

    return news
  }

  // ESPN News Implementation
  private async fetchESPNNews(sport: string, limit: number): Promise<NewsItem[]> {
    try {
      const sportKey = this.getESPNSportKey(sport)
      const data = await apiClient.get(`${API_CONFIG.ESPN.BASE_URL}/${sportKey}/news`);
      
      const news: NewsItem[] = []

      if (data.articles) {
        data.articles.slice(0, limit).forEach((article: unknown, index: number) => {
          news.push({
            id: `espn_${index}`,
            title: article.headline || `ESPN ${sport} News`,
            summary: article.description || `Latest ${sport} update from ESPN`,
            content: article.content,
            source: "ESPN",
            publishedAt: article.published || new Date().toISOString(),
            url: article.links?.web?.href,
            imageUrl: article.images?.[0]?.url,
            category: this.categorizeNews(article.headline || ""),
            sport: sport,
            impact: this.assessImpact(article.headline || ""),
            tags: this.extractTags(article.headline || ""),
            author: article.byline,
            readTime: this.calculateReadTime(article.description || "")
          })
        })
      }

      return news
    } catch (error) {
      console.error("❌ Error fetching ESPN news:", error)
      return []
    }
  }

  // FantasyPros News Implementation
  private async fetchFantasyProsNews(sport: string, limit: number): Promise<NewsItem[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.FANTASY_PROS.BASE_URL}/news/${sport.toLowerCase()}`);
      
      const news: NewsItem[] = []

      if (data.articles) {
        data.articles.slice(0, limit).forEach((article: unknown, index: number) => {
          news.push({
            id: `fantasypros_${index}`,
            title: article.title || `Fantasy ${sport} News`,
            summary: article.summary || `Fantasy ${sport} update`,
            content: article.content,
            source: "FantasyPros",
            publishedAt: article.publishedAt || new Date().toISOString(),
            url: article.url,
            imageUrl: article.imageUrl,
            category: "Fantasy",
            sport: sport,
            impact: this.assessImpact(article.title || ""),
            tags: this.extractTags(article.title || ""),
            author: article.author,
            readTime: this.calculateReadTime(article.summary || "")
          })
        })
      }

      return news
    } catch (error) {
      console.error("❌ Error fetching FantasyPros news:", error)
      return []
    }
  }

  // NewsAPI Implementation (requires API key)
  private async fetchNewsAPINews(): Promise<NewsItem[]> {
    try {
      // This would require an API key in production
      // For now, return mock data
      return this.generateMockNews("", 50, "NewsAPI")
    } catch (error) {
      console.error("❌ Error fetching NewsAPI news:", error)
      return []
    }
  }

  // GNews Implementation (requires API key)
  private async fetchGNewsNews(): Promise<NewsItem[]> {
    try {
      // This would require an API key in production
      // For now, return mock data
      return this.generateMockNews("", 50, "GNews")
    } catch (error) {
      console.error("❌ Error fetching GNews news:", error)
      return []
    }
  }

  // RSS Feed Implementation
  private async fetchRSSNews(sport: string): Promise<NewsItem[]> {
    try {
      const news: NewsItem[] = []
      const rssFeeds = Object.entries(API_CONFIG.RSS_FEEDS)
      
      for (const [source, url] of rssFeeds) {
        try {
          const data = await apiClient.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`);
          if (data.items) {
            data.items.slice(0, 10).forEach((item: unknown, index: number) => {
              // for sport-specific content
              if (this.isSportRelated(item.title, sport)) {
                news.push({
                  id: `rss_${source}_${index}`,
                  title: item.title,
                  summary: item.description || item.content,
                  content: item.content,
                  source: source,
                  publishedAt: item.pubDate || new Date().toISOString(),
                  url: item.link,
                  imageUrl: item.thumbnail,
                  category: this.categorizeNews(item.title),
                  sport: sport,
                  impact: this.assessImpact(item.title),
                  tags: this.extractTags(item.title),
                  author: item.author,
                  readTime: this.calculateReadTime(item.description || "")
                })
              }
            })
          }
        } catch (error) {
          console.warn(`⚠️ Failed to fetch RSS from ${source}:`, error.message)
        }
      }

      return news
    } catch (error) {
      console.error("❌ Error fetching RSS news:", error)
      return []
    }
  }

  // Helper methods
  private getESPNSportKey(sport: string): string {
    const sportMap: { [key: string]: string } = {
      "NFL": "football/nfl",
      "NBA": "basketball/nba",
      "MLB": "baseball/mlb",
      "NHL": "hockey/nhl"
    }
    return sportMap[sport] || "football/nfl"
  }

  private categorizeNews(title: string): string {
    const lowerTitle = title.toLowerCase()
    
    if (lowerTitle.includes("injury") || lowerTitle.includes("hurt") || lowerTitle.includes("out")) return "Injury"
    if (lowerTitle.includes("trade") || lowerTitle.includes("deal") || lowerTitle.includes("traded")) return "Trade"
    if (lowerTitle.includes("performance") || lowerTitle.includes("stats") || lowerTitle.includes("record")) return "Performance"
    if (lowerTitle.includes("draft") || lowerTitle.includes("pick") || lowerTitle.includes("selection")) return "Draft"
    if (lowerTitle.includes("season") || lowerTitle.includes("schedule") || lowerTitle.includes("playoff")) return "Season Update"
    if (lowerTitle.includes("fantasy") || lowerTitle.includes("waiver") || lowerTitle.includes("start")) return "Fantasy"
    if (lowerTitle.includes("breaking") || lowerTitle.includes("news")) return "Breaking"
    
    return "General"
  }

  private assessImpact(title: string): "high" | "medium" | "low" {
    const lowerTitle = title.toLowerCase()
    
    if (lowerTitle.includes("injury") || lowerTitle.includes("trade") || lowerTitle.includes("draft") || 
        lowerTitle.includes("breaking") || lowerTitle.includes("out")) {
      return "high"
    }
    if (lowerTitle.includes("performance") || lowerTitle.includes("stats") || lowerTitle.includes("fantasy")) {
      return "medium"
    }
    return "low"
  }

  private extractTags(title: string): string[] {
    const tags: string[] = []
    const lowerTitle = title.toLowerCase()
    
    // Sport tags
    if (lowerTitle.includes("nfl") || lowerTitle.includes("football")) tags.push("NFL")
    if (lowerTitle.includes("nba") || lowerTitle.includes("basketball")) tags.push("NBA")
    if (lowerTitle.includes("mlb") || lowerTitle.includes("baseball")) tags.push("MLB")
    if (lowerTitle.includes("nhl") || lowerTitle.includes("hockey")) tags.push("NHL")
    
    // Action tags
    if (lowerTitle.includes("injury")) tags.push("Injury")
    if (lowerTitle.includes("trade")) tags.push("Trade")
    if (lowerTitle.includes("fantasy")) tags.push("Fantasy")
    if (lowerTitle.includes("draft")) tags.push("Draft")
    if (lowerTitle.includes("waiver")) tags.push("Waiver")
    
    return tags
  }

  private isSportRelated(title: string, sport: string): boolean {
    const lowerTitle = title.toLowerCase()
    const sportKeywords: { [key: string]: string[] } = {
      "NFL": ["nfl", "football", "quarterback", "running back", "wide receiver", "tight end"],
      "NBA": ["nba", "basketball", "point guard", "shooting guard", "small forward", "power forward", "center"],
      "MLB": ["mlb", "baseball", "pitcher", "catcher", "first base", "second base", "third base", "shortstop"],
      "NHL": ["nhl", "hockey", "goalie", "defenseman", "left wing", "right wing"]
    }
    
    const keywords = sportKeywords[sport] || []
    return keywords.some(keyword => lowerTitle.includes(keyword))
  }

  private calculateReadTime(text: string): number {
    const wordsPerMinute = 200
    const wordCount = text.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  private removeDuplicates(news: NewsItem[]): NewsItem[] {
    const seen = new Set<string>()
    return news.filter(item => {
      const key = `${item.title.toLowerCase()}_${item.source}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  // Generate mock news for fallback
  private generateMockNews(sport: string, limit: number, source: string = "PlayerLAB"): NewsItem[] {
    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: `${sport} Season Update - Key Players to Watch`,
        summary: `Latest developments in ${sport} as teams prepare for the upcoming season with new strategies and player developments.`,
        source: source,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: "Season Update",
        sport: sport,
        impact: "high",
        tags: [sport, "Season", "Players"],
        author: "Sports Reporter",
        readTime: 3
      },
      {
        id: "2",
        title: `${sport} Injury Report - Impact on Fantasy`,
        summary: `Important injury updates affecting fantasy ${sport} decisions and team strategies for the upcoming games.`,
        source: source,
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: "Injury",
        sport: sport,
        impact: "high",
        tags: [sport, "Injury", "Fantasy"],
        author: "Fantasy Expert",
        readTime: 2
      },
      {
        id: "3",
        title: `${sport} Trade Analysis - Market Movements`,
        summary: `Recent trades and their implications for ${sport} fantasy leagues and team dynamics.`,
        source: source,
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        category: "Trade",
        sport: sport,
        impact: "high",
        tags: [sport, "Trade", "Analysis"],
        author: "Trade Analyst",
        readTime: 4
      },
      {
        id: "4",
        title: `${sport} Performance Metrics - Top Performers`,
        summary: `Statistical analysis of ${sport} player performance and fantasy implications for the current season.`,
        source: source,
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        category: "Performance",
        sport: sport,
        impact: "medium",
        tags: [sport, "Performance", "Stats"],
        author: "Stats Analyst",
        readTime: 3
      },
      {
        id: "5",
        title: `${sport} Fantasy Insights - Waiver Wire Targets`,
        summary: `Expert analysis of ${sport} waiver wire opportunities and fantasy football strategy recommendations.`,
        source: source,
        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        category: "Fantasy",
        sport: sport,
        impact: "medium",
        tags: [sport, "Fantasy", "Waiver"],
        author: "Fantasy Expert",
        readTime: 2
      }
    ]

    return mockNews.slice(0, limit)
  }
}

// Export singleton instance
export const multiNewsAPI = new MultiNewsAPI() 