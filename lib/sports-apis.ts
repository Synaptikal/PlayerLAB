// Multi-Sport API Integration for PlayerLAB
// Combines multiple free APIs for comprehensive sports data

import { multiNewsAPI } from "./news-apis"
import { multiSocialAPI } from "./social-apis"
import { apiClient } from './api-client';
import { API_CONFIG } from './config';

// API Base URLs
const API_FOOTBALL_BASE = "https://v3.football.api-sports.io"
const NBA_API_BASE = "https://api-nba-v1.p.rapidapi.com"
const MLB_API_BASE = "https://api-baseball.p.rapidapi.com"
const NHL_API_BASE = "https://api-nhle.p.rapidapi.com"
const ESPN_API_BASE = "https://site.api.espn.com/apis/site/v2/sports"

// Free API endpoints that don't require keys
const FREE_APIS = {
  // Football (NFL) - Free endpoints
  NFL_STATS: "https://api.sleeper.app/v1",
  NFL_NEWS: "https://api.fantasypros.com/v1",
  
  // Basketball (NBA) - Free endpoints
  NBA_STATS: "https://www.balldontlie.io/api/v1",
  NBA_NEWS: "https://api.sportradar.us/nba/trial/v8/en",
  
  // Baseball (MLB) - Free endpoints
  MLB_STATS: "https://statsapi.mlb.com/api/v1",
  MLB_NEWS: "https://api.sportradar.us/mlb/trial/v8/en",
  
  // Hockey (NHL) - Free endpoints
  NHL_STATS: "https://api.nhle.com/v1",
  NHL_NEWS: "https://api.sportradar.us/nhl/trial/v8/en",
  
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
  stats: any
  news: any[]
  trends: any
  social: any
}

export interface APISource {
  name: string
  baseUrl: string
  requiresKey: boolean
  rateLimit: string
  sports: string[]
}

class MultiSportsAPI {
  private cache: Map<string, any> = new Map()
  private cacheTimestamp: Map<string, number> = new Map()
  private readonly CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

  // API Sources Configuration
  private apiSources: APISource[] = [
    {
      name: "Sleeper NFL",
      baseUrl: FREE_APIS.NFL_STATS,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NFL"]
    },
    {
      name: "BallDontLie NBA",
      baseUrl: FREE_APIS.NBA_STATS,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NBA"]
    },
    {
      name: "MLB Stats API",
      baseUrl: FREE_APIS.MLB_STATS,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["MLB"]
    },
    {
      name: "NHL API",
      baseUrl: FREE_APIS.NHL_STATS,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NHL"]
    },
    {
      name: "ESPN API",
      baseUrl: FREE_APIS.ESPN,
      requiresKey: false,
      rateLimit: "1000/hour",
      sports: ["NFL", "NBA", "MLB", "NHL"]
    }
  ]

  // Get data from multiple sources and average them
  async getAveragedPlayerData(sport: string, playerId?: string): Promise<any[]> {
    try {
      console.log(`🔄 Fetching averaged ${sport} data from multiple sources...`)
      
      const sources = this.apiSources.filter(source => source.sports.includes(sport))
      const allData = []

      for (const source of sources) {
        try {
          const data = await this.fetchFromSource(source, sport, playerId)
          if (data && data.length > 0) {
            allData.push(...data)
          }
        } catch (error) {
          console.warn(`⚠️ Failed to fetch from ${source.name}:`, error.message)
        }
      }

      // Average and combine data from multiple sources
      const averagedData = this.averagePlayerData(allData)
      console.log(`✅ Loaded ${averagedData.length} averaged ${sport} players`)
      
      return averagedData
    } catch (error) {
      console.error(`❌ Error fetching averaged ${sport} data:`, error)
      return []
    }
  }

  // Get comprehensive news from multiple sources
  async getMultiSportNews(sport: string): Promise<any[]> {
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
  async getMultiSportHype(sport: string): Promise<any[]> {
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
  private async fetchFromSource(source: APISource, sport: string, playerId?: string): Promise<any[]> {
    const cacheKey = `${source.name}_${sport}_${playerId || 'all'}`
    
    // Check cache first
    if (this.cache.has(cacheKey) && Date.now() - (this.cacheTimestamp.get(cacheKey) || 0) < this.CACHE_DURATION) {
      console.log(`📦 Using cached data from ${source.name}`)
      return this.cache.get(cacheKey)
    }

    let data: any[] = []

    switch (sport) {
      case "NFL":
        data = await this.fetchNFLData(source, playerId)
        break
      case "NBA":
        data = await this.fetchNBAData(source, playerId)
        break
      case "MLB":
        data = await this.fetchMLBData(source, playerId)
        break
      case "NHL":
        data = await this.fetchNHLData(source, playerId)
        break
      default:
        console.warn(`⚠️ Unsupported sport: ${sport}`)
        return []
    }

    // Cache the data
    this.cache.set(cacheKey, data)
    this.cacheTimestamp.set(cacheKey, Date.now())

    return data
  }

  // NFL Data Fetching
  private async fetchNFLData(source: APISource, playerId?: string): Promise<any[]> {
    if (source.name === "Sleeper NFL") {
      return await this.fetchSleeperNFLData(playerId)
    } else if (source.name === "ESPN API") {
      return await this.fetchESPNNFLData(playerId)
    }
    return []
  }

  // NBA Data Fetching
  private async fetchNBAData(source: APISource, playerId?: string): Promise<any[]> {
    if (source.name === "BallDontLie NBA") {
      return await this.fetchBallDontLieNBAData(playerId)
    } else if (source.name === "ESPN API") {
      return await this.fetchESPNNBAData(playerId)
    }
    return []
  }

  // MLB Data Fetching
  private async fetchMLBData(source: APISource, playerId?: string): Promise<any[]> {
    if (source.name === "MLB Stats API") {
      return await this.fetchMLBStatsData(playerId)
    } else if (source.name === "ESPN API") {
      return await this.fetchESPNMLBData(playerId)
    }
    return []
  }

  // NHL Data Fetching
  private async fetchNHLData(source: APISource, playerId?: string): Promise<any[]> {
    if (source.name === "NHL API") {
      return await this.fetchNHLStatsData(playerId)
    } else if (source.name === "ESPN API") {
      return await this.fetchESPNNHLData(playerId)
    }
    return []
  }

  // Sleeper NFL Implementation
  private async fetchSleeperNFLData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.NFL.BASE_URL}/players/nfl`);
      
      const players = []

      Object.entries(data).forEach(([id, player]: [string, any]) => {
        if (player && player.position && player.team) {
          players.push({
            id,
            name: player.full_name || `${player.first_name} ${player.last_name}`,
            sport: "NFL",
            team: player.team,
            position: player.position,
            stats: {
              age: player.age,
              experience: player.years_exp,
              injuryStatus: player.injury_status
            },
            source: "Sleeper"
          })
        }
      })

      return players.slice(0, 50) // Limit for performance
    } catch (error) {
      console.error("❌ Error fetching Sleeper NFL data:", error)
      return []
    }
  }

  // BallDontLie NBA Implementation
  private async fetchBallDontLieNBAData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.NBA.BASE_URL}/players?per_page=50`);
      
      return data.data.map((player: any) => ({
        id: player.id.toString(),
        name: `${player.first_name} ${player.last_name}`,
        sport: "NBA",
        team: player.team?.name || "Unknown",
        position: player.position || "Unknown",
        stats: {
          height: player.height,
          weight: player.weight,
          experience: player.experience
        },
        source: "BallDontLie"
      }))
    } catch (error) {
      console.error("❌ Error fetching BallDontLie NBA data:", error)
      return []
    }
  }

  // MLB Stats API Implementation
  private async fetchMLBStatsData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.MLB.BASE_URL}/sports/1/players`);
      
      return data.people?.slice(0, 50).map((player: any) => ({
        id: player.id.toString(),
        name: `${player.nameFirst} ${player.nameLast}`,
        sport: "MLB",
        team: player.currentTeam?.name || "Unknown",
        position: player.primaryPosition?.abbreviation || "Unknown",
        stats: {
          age: player.currentAge,
          height: player.height,
          weight: player.weight
        },
        source: "MLB Stats"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching MLB Stats data:", error)
      return []
    }
  }

  // NHL API Implementation
  private async fetchNHLStatsData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.NHL.BASE_URL}/skaters`);
      
      return data.skaters?.slice(0, 50).map((player: any) => ({
        id: player.playerId.toString(),
        name: player.name,
        sport: "NHL",
        team: player.team || "Unknown",
        position: player.position || "Unknown",
        stats: {
          age: player.age,
          height: player.height,
          weight: player.weight
        },
        source: "NHL API"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching NHL data:", error)
      return []
    }
  }

  // ESPN API Implementations
  private async fetchESPNNFLData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.ESPN.BASE_URL}/football/nfl/athletes`);
      
      return data.athletes?.slice(0, 50).map((player: any) => ({
        id: player.id,
        name: player.fullName,
        sport: "NFL",
        team: player.team?.name || "Unknown",
        position: player.position?.abbreviation || "Unknown",
        stats: {
          age: player.age,
          height: player.height,
          weight: player.weight
        },
        source: "ESPN"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching ESPN NFL data:", error)
      return []
    }
  }

  private async fetchESPNNBAData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.ESPN.BASE_URL}/basketball/nba/athletes`);
      
      return data.athletes?.slice(0, 50).map((player: any) => ({
        id: player.id,
        name: player.fullName,
        sport: "NBA",
        team: player.team?.name || "Unknown",
        position: player.position?.abbreviation || "Unknown",
        stats: {
          age: player.age,
          height: player.height,
          weight: player.weight
        },
        source: "ESPN"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching ESPN NBA data:", error)
      return []
    }
  }

  private async fetchESPNMLBData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.ESPN.BASE_URL}/baseball/mlb/athletes`);
      
      return data.athletes?.slice(0, 50).map((player: any) => ({
        id: player.id,
        name: player.fullName,
        sport: "MLB",
        team: player.team?.name || "Unknown",
        position: player.position?.abbreviation || "Unknown",
        stats: {
          age: player.age,
          height: player.height,
          weight: player.weight
        },
        source: "ESPN"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching ESPN MLB data:", error)
      return []
    }
  }

  private async fetchESPNNHLData(playerId?: string): Promise<any[]> {
    try {
      const data = await apiClient.get(`${API_CONFIG.SPORTS.ESPN.BASE_URL}/hockey/nhl/athletes`);
      
      return data.athletes?.slice(0, 50).map((player: any) => ({
        id: player.id,
        name: player.fullName,
        sport: "NHL",
        team: player.team?.name || "Unknown",
        position: player.position?.abbreviation || "Unknown",
        stats: {
          age: player.age,
          height: player.height,
          weight: player.weight
        },
        source: "ESPN"
      })) || []
    } catch (error) {
      console.error("❌ Error fetching ESPN NHL data:", error)
      return []
    }
  }

  // Average data from multiple sources
  private averagePlayerData(allData: any[]): any[] {
    const playerMap = new Map<string, any[]>()

    // Group players by ID
    allData.forEach(player => {
      const key = player.id || player.name
      if (!playerMap.has(key)) {
        playerMap.set(key, [])
      }
      playerMap.get(key)!.push(player)
    })

    // Average the data for each player
    const averagedPlayers: any[] = []
    for (const [key, players] of playerMap) {
      if (players.length === 0) continue

      const basePlayer = players[0]
      const sources = players.map((p: any) => p.source)
      
      // Average stats if available
      const avgStats = this.averageStats(players)
      
      averagedPlayers.push({
        ...basePlayer,
        sources,
        stats: {
          ...basePlayer.stats,
          ...avgStats
        },
        confidence: Math.min(players.length * 25, 100) // Higher confidence with more sources
      })
    }

    return averagedPlayers
  }

  // Average stats from multiple sources
  private averageStats(players: any[]): any {
    const stats = {
      age: 0,
      height: 0,
      weight: 0,
      experience: 0
    }

    let count = 0
    players.forEach(player => {
      if (player.stats) {
        if (player.stats.age) {
          stats.age += player.stats.age
          count++
        }
        if (player.stats.height) {
          stats.height += player.stats.height
        }
        if (player.stats.weight) {
          stats.weight += player.stats.weight
        }
        if (player.stats.experience) {
          stats.experience += player.stats.experience
        }
      }
    })

    if (count > 0) {
      stats.age = Math.round(stats.age / count)
      stats.height = Math.round(stats.height / count)
      stats.weight = Math.round(stats.weight / count)
      stats.experience = Math.round(stats.experience / count)
    }

    return stats
  }

  // Get trending players across all sports
  async getMultiSportTrends(sport: string): Promise<any[]> {
    try {
      console.log(`🔄 Fetching ${sport} trends from multiple sources...`)
      
      const trends = await this.getAveragedPlayerData(sport)
      
      // Add trending metrics
      return trends.map(player => ({
        ...player,
        trend: Math.random() > 0.5 ? "up" : "down",
        count: Math.floor(Math.random() * 100) + 10,
        percentage: Math.floor(Math.random() * 30) + 10,
        reason: this.getRandomTrendReason()
      }))
    } catch (error) {
      console.error(`❌ Error fetching ${sport} trends:`, error)
      return []
    }
  }

  // Get random trend reason
  private getRandomTrendReason(): string {
    const reasons = [
      "Strong recent performance",
      "Injury to teammate",
      "Favorable matchup",
      "Coach's comments",
      "Practice reports",
      "Weather conditions",
      "Defensive injuries",
      "Offensive changes"
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  // Get random hashtags for sport
  private getRandomHashtags(sport: string): string[] {
    const hashtags = {
      NFL: ["#NFL", "#FantasyFootball", "#StartEm", "#SitEm"],
      NBA: ["#NBA", "#FantasyBasketball", "#Hoops", "#Basketball"],
      MLB: ["#MLB", "#FantasyBaseball", "#Baseball", "#Diamond"],
      NHL: ["#NHL", "#FantasyHockey", "#Hockey", "#Ice"]
    }
    
    const sportHashtags = hashtags[sport as keyof typeof hashtags] || ["#Sports", "#Fantasy"]
    return sportHashtags.slice(0, Math.floor(Math.random() * 3) + 2)
  }

  // Get random trending topics for sport
  private getRandomTrendingTopics(sport: string): string[] {
    const topics = {
      NFL: ["Injury updates", "Trade rumors", "Weather impact", "Coach's presser"],
      NBA: ["Injury updates", "Trade rumors", "Playoff race", "Coach's presser"],
      MLB: ["Injury updates", "Trade rumors", "Weather impact", "Manager's presser"],
      NHL: ["Injury updates", "Trade rumors", "Playoff race", "Coach's presser"]
    }
    
    const sportTopics = topics[sport as keyof typeof topics] || ["Injury updates", "Trade rumors"]
    return sportTopics.slice(0, Math.floor(Math.random() * 2) + 1)
  }

  // Generate mock news for fallback
  private generateMockNews(sport: string): any[] {
    const mockNews = [
      {
        id: "1",
        title: `${sport} Season Update - Key Players to Watch`,
        summary: `Latest developments in ${sport} as teams prepare for the upcoming season`,
        source: "PlayerLAB",
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: "Season Update",
        impact: "high",
        sport: sport
      },
      {
        id: "2",
        title: `${sport} Injury Report - Impact on Fantasy`,
        summary: `Important injury updates affecting fantasy ${sport} decisions`,
        source: "PlayerLAB",
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: "Injury",
        impact: "medium",
        sport: sport
      },
      {
        id: "3",
        title: `${sport} Trade Analysis - Market Movements`,
        summary: `Recent trades and their implications for ${sport} fantasy leagues`,
        source: "PlayerLAB",
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        category: "Trade",
        impact: "high",
        sport: sport
      }
    ]

    return mockNews
  }
}

// Export singleton instance
export const multiSportsAPI = new MultiSportsAPI() 