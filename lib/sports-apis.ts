// Multi-Sport API Integration for PlayerLAB
// Combines multiple free APIs for comprehensive sports data

import { multiNewsAPI } from "./news-apis"
import { multiSocialAPI } from "./social-apis"
import { apiClient } from './api-client';
// API Base URLs
// const API_FOOTBALL_BASE = "https://v3.football.api-sports.io";
// const NBA_API_BASE = "https://api-nba-v1.p.rapidapi.com"
// const MLB_API_BASE = "https://api-baseball.p.rapidapi.com"
// const NHL_API_BASE = "https://api-nhle.p.rapidapi.com"
const ESPN_API_BASE = "https://site.api.espn.com/apis/site/v2/sports"

// Free API endpoints that don't require keys
const FREE_APIS = {
  // Football (NFL) - Free endpoints
  NFL_STATS: "https://api.sleeper.app/v1",
  NFL_NEWS: "https://api.fantasypros.com/v1",
  
  // Basketball (NBA) - Free endpoints (commented out for now)
  // NBA_STATS: "https://www.balldontlie.io/api/v1",
  // NBA_NEWS: "https://api.sportradar.us/nba/trial/v8/en",
  
  // Baseball (MLB) - Free endpoints (commented out for now)
  // MLB_STATS: "https://statsapi.mlb.com/api/v1",
  // MLB_NEWS: "https://api.sportradar.us/mlb/trial/v8/en",
  
  // Hockey (NHL) - Free endpoints (commented out for now)
  // NHL_STATS: "https://api.nhle.com/v1",
  // NHL_NEWS: "https://api.sportradar.us/nhl/trial/v8/en",
  
  // General Sports
  ESPN: "https://site.api.espn.com/apis/site/v2/sports",
  SPORTS_REFERENCE: "https://www.sports-reference.com/cbb",
  FANTASY_PROSPER: "https://api.fantasypros.com/v2"
}

export interface SportsData {
  id: string
  name: string
  sport: string
  team: string
  position: string
  stats: unknown
  news?: unknown[]
  trends?: unknown
  social?: unknown
}

export interface APISource {
  name: string
  baseUrl: string
  requiresKey: boolean
  rateLimit: string
  sports: string[]
}

class MultiSportsAPI {
  private cache: Map<string, SportsData[]> = new Map()
  private cacheTimestamp: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

  // API Sources Configuration - Only NFL for now
  private apiSources: APISource[] = [
    {
      name: "Sleeper NFL",
      baseUrl: FREE_APIS.NFL_STATS,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NFL"]
    },
    // {
    //   name: "BallDontLie NBA",
    //   baseUrl: FREE_APIS.NBA_STATS,
    //   requiresKey: false,
    //   rateLimit: "1000/hour",
    //   sports: ["NBA"]
    // },
    // {
    //   name: "MLB Stats API",
    //   baseUrl: FREE_APIS.MLB_STATS,
    //   requiresKey: false,
    //   rateLimit: "1000/hour",
    //   sports: ["MLB"]
    // },
    // {
    //   name: "NHL API",
    //   baseUrl: FREE_APIS.NHL_STATS,
    //   requiresKey: false,
    //   rateLimit: "1000/hour",
    //   sports: ["NHL"]
    // },
    {
      name: "ESPN API",
      baseUrl: FREE_APIS.ESPN,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NFL"] // Only NFL for now
    }
  ]

  // Only use NFL/football for now
  private SUPPORTED_SPORTS = ["NFL"]

  // Get data from multiple sources and average them
  async getAveragedPlayerData(sport: string, playerId?: string): Promise<SportsData[]> {
    try {
      console.log(`🔄 Fetching averaged ${sport} data from multiple sources...`)

      const sources = this.apiSources.filter(source => source.sports.includes(sport))
      const allData: SportsData[] = []

      for (const source of sources) {
        try {
          const data = await this.fetchFromSource(source, sport, playerId)
          if (data && data.length > 0) {
            allData.push(...data)
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error)
          console.warn(`⚠️ Failed to fetch from ${source.name}:`, message)
        }
      }

      // Average and combine data from multiple sources
      const averagedData = this.averagePlayerData(allData)
      console.log(`✅ Loaded ${averagedData.length} averaged ${sport} players`)
      
      return averagedData
    } catch (error) {
      console.error(`❌ Error fetching averaged ${sport} data:`, error instanceof Error ? error : String(error))
      return []
    }
  }

  // Get comprehensive news from multiple sources
  async getMultiSportNews(sport: string): Promise<unknown[]> {
    try {
      console.log(`🔄 Fetching ${sport} news from multiple sources...`)
      
      // Use the dedicated news API
      const newsData = await multiNewsAPI.getMultiSourceNews(sport, 50)
      console.log(`✅ Loaded ${newsData.length} ${sport} news items from multiple sources`)
      
      return newsData
    } catch (error) {
      console.error(`❌ Error fetching ${sport} news:`, error as Error)
      return this.generateMockNews(sport)
    }
  }

  // Get comprehensive social media data
  async getMultiSportHype(sport: string): Promise<unknown[]> {
    try {
      console.log(`🔄 Fetching ${sport} social hype data...`)
      
      // Use the dedicated social API
      const socialData = await multiSocialAPI.getMultiPlatformSocialData(sport)
      const socialMetrics = await multiSocialAPI.getSocialMetrics(sport)
      
      // Combine player data with social metrics
      const playerData = await this.getAveragedPlayerData(sport)
      
      const hypeData = playerData.map(player => ({
        ...player,
        socialMetrics: {
          mentions: Math.floor(Math.random() * 10000) + 1000,
          sentiment: Math.random() > 0.5 ? "positive" : "negative",
          engagement: Math.floor(Math.random() * 500) + 100,
          trending: Math.random() > 0.7
        },
        buzz: {
          hashtags: this.getRandomHashtags(sport),
          trendingTopics: this.getRandomTrendingTopics(sport),
          viralMoment: Math.random() > 0.8
        },
        socialPosts: socialData.slice(0, 5), // Include recent social posts
        platformMetrics: socialMetrics
      }))

      console.log(`✅ Loaded ${hypeData.length} ${sport} hype players with social data`)
      return hypeData
    } catch (error) {
      console.error(`❌ Error fetching ${sport} hype data:`, error as Error)
      return []
    }
  }

  // Fetch data from a specific source
  private async fetchFromSource(source: APISource, sport: string, playerId?: string): Promise<SportsData[]> {
    const cacheKey = `${source.name}_${sport}_${playerId || 'all'}`
    
    // Check cache first
    if (this.cache.has(cacheKey) && Date.now() - (this.cacheTimestamp.get(cacheKey) || 0) < this.CACHE_DURATION) {
      console.log(`📦 Using cached data from ${source.name}`)
      return this.cache.get(cacheKey) as SportsData[]
    }

    let data: SportsData[] = []

    try {
      switch (source.name) {
        case "Sleeper NFL":
          data = await this.fetchNFLData(source)
          break
        // case "BallDontLie NBA":
        //   data = await this.fetchNBAData(source, playerId)
        //   break
        // case "MLB Stats API":
        //   data = await this.fetchMLBData(source, playerId)
        //   break
        // case "NHL API":
        //   data = await this.fetchNHLData(source, playerId)
        //   break
        case "ESPN API":
          data = await this.fetchESPNNFLData()
          break
        default:
          console.warn(`⚠️ Unknown source: ${source.name}`)
      }

      // Cache the data
      this.cache.set(cacheKey, data)
      this.cacheTimestamp.set(cacheKey, Date.now())

      return data
    } catch (error) {
      console.error(`❌ Error fetching from ${source.name}:`, error instanceof Error ? error : String(error))
      return []
    }
  }

  // NFL-specific data fetching
  private async fetchNFLData(source: APISource): Promise<SportsData[]> {
    interface SleeperPlayer {
      full_name?: string
      first_name?: string
      last_name?: string
      position?: string
      team?: string
    }

    try {
      const response = await apiClient.get<Record<string, SleeperPlayer>>(
        `${source.baseUrl}/players/nfl`
      )

      const players: SportsData[] = Object.entries(response)
        .filter(([, player]) => player.position && player.team)
        .map(([id, player]) => ({
          id,
          name:
            player.full_name ||
            `${player.first_name ?? ""} ${player.last_name ?? ""}`.trim(),
          position: player.position!,
          team: player.team!,
          sport: "NFL",
          stats: this.generateMockStats("NFL", player.position || "")
        }))
        .slice(0, 50) // Limit to top 50 players

      return players
    } catch (error) {
      console.error("❌ Error fetching NFL data:", error)
      return []
    }
  }

  // NBA-specific data fetching (commented out for now)
  // private async fetchNBAData(source: APISource, playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${source.baseUrl}/players`)
  //     const players = (response as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: `${player.first_name} ${player.last_name}`,
  //       position: player.position,
  //       team: player.team?.name || "Unknown",
  //       sport: "NBA",
  //       stats: this.generateMockStats("NBA", player.position)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching NBA data:", error)
  //     return []
  //   }
  // }

  // MLB-specific data fetching (commented out for now)
  // private async fetchMLBData(source: APISource, playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${source.baseUrl}/sports/1/players`)
  //     const players = (response.people as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: `${player.nameFirst} ${player.nameLast}`,
  //       position: player.primaryPosition?.abbreviation || "Unknown",
  //       team: player.currentTeam?.name || "Unknown",
  //       sport: "MLB",
  //       stats: this.generateMockStats("MLB", player.primaryPosition?.abbreviation)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching MLB data:", error)
  //     return []
  //   }
  // }

  // NHL-specific data fetching (commented out for now)
  // private async fetchNHLData(source: APISource, playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${source.baseUrl}/players`)
  //     const players = (response as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: `${player.firstName} ${player.lastName}`,
  //       position: player.primaryPosition?.abbreviation || "Unknown",
  //       team: player.currentTeam?.name || "Unknown",
  //       sport: "NHL",
  //       stats: this.generateMockStats("NHL", player.primaryPosition?.abbreviation)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching NHL data:", error)
  //     return []
  //   }
  // }

  // ESPN NFL data fetching
  private async fetchESPNNFLData(): Promise<SportsData[]> {
    interface ESPNPlayer {
      id: number
      fullName: string
      position?: { abbreviation?: string }
      team?: { name?: string }
    }

    try {
      const response = await apiClient.get<{ athletes: ESPNPlayer[] }>(
        `${ESPN_API_BASE}/football/nfl/athletes`
      )
      const players: SportsData[] = response.athletes
        .map(player => ({
          id: player.id.toString(),
          name: player.fullName,
          position: player.position?.abbreviation || "Unknown",
          team: player.team?.name || "Unknown",
          sport: "NFL",
          stats: this.generateMockStats("NFL", player.position?.abbreviation || "")
        }))
        .slice(0, 50)

      return players
    } catch (error) {
      console.error("❌ Error fetching ESPN NFL data:", error instanceof Error ? error : String(error))
      return []
    }
  }

  // ESPN NBA data fetching (commented out for now)
  // private async fetchESPNNBAData(playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${ESPN_API_BASE}/basketball/nba/athletes`)
  //     const players = (response.athletes as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: player.fullName,
  //       position: player.position?.abbreviation || "Unknown",
  //       team: player.team?.name || "Unknown",
  //       sport: "NBA",
  //       stats: this.generateMockStats("NBA", player.position?.abbreviation)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching ESPN NBA data:", error)
  //     return []
  //   }
  // }

  // ESPN MLB data fetching (commented out for now)
  // private async fetchESPNMLBData(playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${ESPN_API_BASE}/baseball/mlb/athletes`)
  //     const players = (response.athletes as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: player.fullName,
  //       position: player.position?.abbreviation || "Unknown",
  //       team: player.team?.name || "Unknown",
  //       sport: "MLB",
  //       stats: this.generateMockStats("MLB", player.position?.abbreviation)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching ESPN MLB data:", error)
  //     return []
  //   }
  // }

  // ESPN NHL data fetching (commented out for now)
  // private async fetchESPNNHLData(playerId?: string): Promise<unknown[]> {
  //   try {
  //     const response = await apiClient.get(`${ESPN_API_BASE}/hockey/nhl/athletes`)
  //     const players = (response.athletes as unknown[]).map(player => ({
  //       id: player.id.toString(),
  //       name: player.fullName,
  //       position: player.position?.abbreviation || "Unknown",
  //       team: player.team?.name || "Unknown",
  //       sport: "NHL",
  //       stats: this.generateMockStats("NHL", player.position?.abbreviation)
  //     }))
  //     .slice(0, 50)

  //     return players
  //   } catch (error) {
  //     console.error("❌ Error fetching ESPN NHL data:", error)
  //     return []
  //   }
  // }

  // Average player data from multiple sources
  private averagePlayerData(allData: SportsData[]): SportsData[] {
    const playerMap = new Map<string, SportsData>()

      allData.forEach(player => {
        const key = player.id || player.name
        if (playerMap.has(key)) {
          const existing = playerMap.get(key)!
          playerMap.set(key, {
            ...existing,
            stats: this.averageStats([
              existing.stats as Record<string, number>,
              player.stats as Record<string, number>
            ])
          })
        } else {
          playerMap.set(key, player)
        }
      })

      return Array.from(playerMap.values())
    }

  // Average stats from multiple sources
  private averageStats(players: Record<string, number>[]): Record<string, number> {
    if (players.length === 0) return {}

    const averagedStats: Record<string, number> = {}
    const statKeys = Object.keys(players[0] || {})

    statKeys.forEach(key => {
      const values = players
        .map(player => player[key])
        .filter((val): val is number => typeof val === 'number')
      if (values.length > 0) {
        averagedStats[key] = values.reduce((sum, val) => sum + val, 0) / values.length
      }
    })

    return averagedStats
  }

  // Get trending players
  async getMultiSportTrends(sport: string): Promise<unknown[]> {
    try {
      console.log(`🔄 Fetching ${sport} trends...`)
      
      const playerData = await this.getAveragedPlayerData(sport)
      
      const trendingPlayers = playerData.map(player => ({
        ...player,
        trend: Math.random() > 0.5 ? "up" : "down",
        trendReason: this.getRandomTrendReason(),
        changePercent: Math.floor(Math.random() * 50) + 5,
        hashtags: this.getRandomHashtags(sport),
        trendingTopics: this.getRandomTrendingTopics(sport)
      }))

      console.log(`✅ Loaded ${trendingPlayers.length} trending ${sport} players`)
      return trendingPlayers
    } catch (error) {
      console.error(`❌ Error fetching ${sport} trends:`, error)
      return []
    }
  }

  // Helper methods for generating mock data
  private getRandomTrendReason(): string {
    const reasons = [
      "Strong performance in recent games",
      "Injury to teammate creating opportunity",
      "Favorable matchup this week",
      "Coach's comments about increased role",
      "Analytics showing breakout potential",
      "Trade rumors affecting value",
      "Weather conditions favoring play style",
      "Historical success against opponent"
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  private getRandomHashtags(sport: string): string[] {
    const hashtags = {
      "NFL": ["#NFL", "#FantasyFootball", "#NFLFantasy", "#Football", "#NFLNews"],
      // "NBA": ["#NBA", "#FantasyBasketball", "#NBADraft", "#Basketball"],
      // "MLB": ["#MLB", "#FantasyBaseball", "#MLBDraft", "#Baseball"],
      // "NHL": ["#NHL", "#FantasyHockey", "#NHLDraft", "#Hockey"]
    }
    return hashtags[sport as keyof typeof hashtags] || ["#Sports"]
  }

  private getRandomTrendingTopics(sport: string): string[] {
    const topics = {
      "NFL": ["Fantasy Football", "NFL Draft", "Player Rankings", "Trade Analysis", "Injury Updates"],
      // "NBA": ["Fantasy Basketball", "NBA Draft", "Player Rankings", "Trade Analysis"],
      // "MLB": ["Fantasy Baseball", "MLB Draft", "Player Rankings", "Trade Analysis"],
      // "NHL": ["Fantasy Hockey", "NHL Draft", "Player Rankings", "Trade Analysis"]
    }
    return topics[sport as keyof typeof topics] || ["Sports"]
  }

  // Generate mock news for fallback
  private generateMockNews(sport: string): unknown[] {
    return [
      {
        id: "1",
        title: `${sport} Fantasy Update: Top Players to Watch`,
        content: `Stay ahead of the competition with our latest ${sport} fantasy insights.`,
        source: "PlayerLAB",
        publishedAt: new Date().toISOString(),
        category: "Fantasy Football",
        sport: sport,
        impact: "high" as const
      }
    ]
  }

  // Generate mock stats based on position
  private generateMockStats(sport: string, position: string): unknown {
    const baseStats = {
      points: Math.floor(Math.random() * 30) + 10,
      games: Math.floor(Math.random() * 16) + 1
    }

    if (sport === "NFL") {
      switch (position) {
        case "QB":
          return {
            ...baseStats,
            completions: Math.floor(Math.random() * 300) + 200,
            attempts: Math.floor(Math.random() * 500) + 300,
            yards: Math.floor(Math.random() * 4000) + 2000,
            touchdowns: Math.floor(Math.random() * 30) + 15,
            interceptions: Math.floor(Math.random() * 10) + 1
          }
        case "RB":
          return {
            ...baseStats,
            carries: Math.floor(Math.random() * 200) + 100,
            yards: Math.floor(Math.random() * 1000) + 500,
            touchdowns: Math.floor(Math.random() * 10) + 5,
            receptions: Math.floor(Math.random() * 50) + 20
          }
        case "WR":
          return {
            ...baseStats,
            receptions: Math.floor(Math.random() * 80) + 40,
            targets: Math.floor(Math.random() * 120) + 60,
            yards: Math.floor(Math.random() * 1000) + 500,
            touchdowns: Math.floor(Math.random() * 8) + 3
          }
        case "TE":
          return {
            ...baseStats,
            receptions: Math.floor(Math.random() * 60) + 30,
            targets: Math.floor(Math.random() * 80) + 40,
            yards: Math.floor(Math.random() * 600) + 300,
            touchdowns: Math.floor(Math.random() * 6) + 2
          }
        default:
          return baseStats
      }
    }

    return baseStats
  }
}

// Export singleton instance
export const multiSportsAPI = new MultiSportsAPI() 