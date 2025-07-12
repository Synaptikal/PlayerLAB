// Sleeper API Integration for PlayerLAB
// Real-time NFL player data, photos, and stats

import { apiClient } from './api-client';
import { API_CONFIG } from './config';

// TypeScript interfaces for Sleeper API data
interface SleeperPlayerData {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  position?: string;
  team?: string;
  age?: number;
  years_exp?: number;
  injury_status?: string;
  fantasy_positions?: string[];
}

interface SleeperTransaction {
  type: string;
  [key: string]: unknown;
}

interface SleeperTrendingPlayer {
  player_id: string;
  [key: string]: unknown;
}

const SLEEPER_CDN_URL = "https://sleepercdn.com"

// Player avatar URL helper with multiple fallback options
export const getPlayerAvatarUrl = (playerId: string) => {
  // Primary URL format
  return `${SLEEPER_CDN_URL}/content/nfl/players/${playerId}.jpg`
}

// Alternative avatar URL format
export const getPlayerAvatarUrlAlt = (playerId: string) => {
  return `${SLEEPER_CDN_URL}/avatars/thumbs/${playerId}.jpg`
}

// Team logo URL helper
export const getTeamLogoUrl = (teamAbbr: string) => {
  if (!teamAbbr) return "/placeholder.svg?height=20&width=20&text=NFL"
  return `${SLEEPER_CDN_URL}/images/team_logos/nfl/${teamAbbr.toLowerCase()}.png`
}

// Mock fantasy points for demonstration
export const mockFantasyPoints: Record<string, number> = {
  "4046": 28.4, // Josh Allen
  "4035": 26.8, // Christian McCaffrey
  "4993": 24.2, // Tyreek Hill
  "4098": 22.6, // Travis Kelce
  "4881": 26.2, // Lamar Jackson
  "5045": 22.8, // Cooper Kupp
  "4017": 21.4, // Davante Adams
  "4029": 25.1, // Derrick Henry
  "4036": 23.7, // Alvin Kamara
  "4039": 20.9, // Mike Evans
}

export interface SleeperPlayer {
  player_id: string
  first_name: string
  last_name: string
  full_name: string
  position: string
  team: string
  age: number
  years_exp: number
  injury_status?: string
  fantasy_positions: string[]
}

export interface PlayerData {
  id: string
  name: string
  team: string
  position: string
  avatarUrl: string
  teamLogoUrl: string
  age: number
  experience: number
  injuryStatus?: string
  points?: number
  trend?: "up" | "down" | "stable"
  projectedPoints?: number
  ownership?: number
  stats?: {
    completions?: number
    attempts?: number
    yards: number
    touchdowns: number
    carries?: number
    receptions?: number
    targets?: number
    points: number
  }
}

export interface TrendingPlayer {
  player_id: string
  count: number
}

class SleeperAPI {
  private playersCache: Map<string, SleeperPlayer> | null = null
  private cacheTimestamp = 0
  private readonly CACHE_DURATION = 1000 * 60 * 60 // 1 hour

  async getAllPlayers(): Promise<Map<string, SleeperPlayer>> {
    // Check cache first
    if (this.playersCache && Date.now() - this.cacheTimestamp < this.CACHE_DURATION) {
      console.log("📦 Using cached player data")
      return this.playersCache
    }

    try {
      console.log("🔄 Fetching players from Sleeper API...")
      const playersData = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/players/nfl`);

      const playersMap = new Map<string, SleeperPlayer>()

              // Convert object to Map and filter for active NFL players
        Object.entries(playersData as Record<string, SleeperPlayerData>).forEach(([playerId, playerData]) => {
          if (playerData && playerData.position && playerData.team) {
            playersMap.set(playerId, {
              player_id: playerId,
              first_name: playerData.first_name || "",
              last_name: playerData.last_name || "",
              full_name: playerData.full_name || `${playerData.first_name || ""} ${playerData.last_name || ""}`.trim(),
              position: playerData.position || "",
              team: playerData.team || "",
              age: playerData.age || 0,
              years_exp: playerData.years_exp || 0,
              injury_status: playerData.injury_status,
              fantasy_positions: playerData.fantasy_positions || []
            })
          }
        })

      // Update cache
      this.playersCache = playersMap
      this.cacheTimestamp = Date.now()

      console.log(`✅ Loaded ${playersMap.size} active NFL players from Sleeper API`)
      return playersMap
    } catch (error) {
      console.error("❌ Error fetching players from Sleeper API:", error)
      // Return empty map on error
      return new Map()
    }
  }

  async getTrendingPlayers(
    type: "add" | "drop",
    sport = "nfl",
    lookback_hours = 24,
    limit = 25
  ): Promise<SleeperTrendingPlayer[]> {
    try {
      console.log(`🔄 Fetching trending ${type} players from Sleeper API...`)
      const data = await apiClient.get(
        `${API_CONFIG.SLEEPER.BASE_URL}/players/${sport}/trending/${type}?lookback_hours=${lookback_hours}&limit=${limit}`
      );
      console.log(`✅ Loaded ${data.length} trending ${type} players`)
      return data
    } catch (error) {
      console.error(`❌ Error fetching trending ${type} players:`, error)
      return []
    }
  }

  async getLeagueRosters(leagueId: string) {
    try {
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}/rosters`);
      return data
    } catch (error) {
      console.error("Error fetching league rosters:", error)
      return []
    }
  }

  // NEW: Get league information
  async getLeague(leagueId: string) {
    try {
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}`);
      return data
    } catch (error) {
      console.error("Error fetching league:", error)
      return null
    }
  }

  // NEW: Get league users/owners
  async getLeagueUsers(leagueId: string) {
    try {
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}/users`);
      return data
    } catch (error) {
      console.error("Error fetching league users:", error)
      return []
    }
  }

  // NEW: Get league matchups
  async getLeagueMatchups(leagueId: string, week?: number) {
    try {
      const weekParam = week ? `?week=${week}` : ''
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}/matchups${weekParam}`);
      return data
    } catch (error) {
      console.error("Error fetching league matchups:", error)
      return []
    }
  }

  // NEW: Get player stats
  async getPlayerStats(season: string, week?: number) {
    try {
      const weekParam = week ? `&week=${week}` : ''
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/stats/nfl/${season}?season_type=regular${weekParam}`);
      return data
    } catch (error) {
      console.error("Error fetching player stats:", error)
      return {}
    }
  }

  // NEW: Get player projections
  async getPlayerProjections(season: string, week?: number) {
    try {
      const weekParam = week ? `&week=${week}` : ''
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/projections/nfl/${season}?season_type=regular${weekParam}`);
      return data
    } catch (error) {
      console.error("Error fetching player projections:", error)
      return {}
    }
  }

  // NEW: Get waiver wire
  async getWaiverWire(leagueId: string) {
    try {
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}/transactions`);
      return (data as SleeperTransaction[]).filter((t: SleeperTransaction) => t.type === 'add' || t.type === 'drop')
    } catch (error) {
      console.error("Error fetching waiver wire:", error)
      return []
    }
  }

  // NEW: Get trades
  async getTrades(leagueId: string) {
    try {
      const data = await apiClient.get(`${API_CONFIG.SLEEPER.BASE_URL}/league/${leagueId}/transactions`);
      return (data as SleeperTransaction[]).filter((t: SleeperTransaction) => t.type === 'trade')
    } catch (error) {
      console.error("Error fetching trades:", error)
      return []
    }
  }

  // NEW: Get fantasy news and updates
  async getFantasyNews(): Promise<unknown[]> {
    try {
      console.log("🔄 Fetching fantasy news...")
      // Using a fantasy news API endpoint (mock for now, but can be replaced with real API)
      const mockNews = [
        {
          id: "1",
          title: "Christian McCaffrey Dominates Week 1 with 3 TDs",
          summary: "CMC shows why he's the RB1 with 152 total yards and 3 touchdowns",
          source: "ESPN Fantasy",
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: "Player News",
          playerId: "4035",
          impact: "high"
        },
        {
          id: "2", 
          title: "Tyreek Hill Injured in Practice - Questionable for Week 2",
          summary: "Hill limited in practice with ankle injury, fantasy owners concerned",
          source: "NFL Network",
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: "Injury",
          playerId: "4993",
          impact: "medium"
        },
        {
          id: "3",
          title: "Josh Allen Throws for 400+ Yards in Season Opener",
          summary: "Bills QB puts up monster numbers, solidifying QB1 status",
          source: "CBS Sports",
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          category: "Performance",
          playerId: "4046",
          impact: "high"
        }
      ]
      return mockNews
    } catch (error) {
      console.error("❌ Error fetching fantasy news:", error)
      return []
    }
  }

  // NEW: Get player analysis and insights
  async getPlayerAnalysis(): Promise<unknown[]> {
    try {
      console.log("🔄 Fetching player analysis...")
      const players = await this.getAllPlayers()
      const analysisData = []

      // Generate analysis for top players
      const topPlayerIds = ["4035", "4046", "4993", "4098", "4881", "5045", "4017", "4029"]
      
      for (const playerId of topPlayerIds) {
        const player = players.get(playerId)
        if (player) {
          analysisData.push({
            
            playerName: player.full_name,
            position: player.position,
            team: player.team,
            analysis: {
              strength: this.getRandomStrength(),
              weakness: this.getRandomWeakness(),
              opportunity: this.getRandomOpportunity(),
              threat: this.getRandomThreat(),
              recommendation: this.getRandomRecommendation(),
              confidence: Math.floor(Math.random() * 30) + 70 // 70-100%
            },
            stats: {
              projectedPoints: Math.floor(Math.random() * 20) + 15,
              ownership: Math.floor(Math.random() * 40) + 60,
              trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)]
            }
          })
        }
      }

      return analysisData
    } catch (error) {
      console.error("❌ Error fetching player analysis:", error)
      return []
    }
  }

  // NEW: Get trending players with real data
  async getTrendingPlayersReal(limit = 20): Promise<unknown[]> {
    try {
      console.log("🔄 Fetching trending players...")
      const players = await this.getAllPlayers()
      const trendingData = []

      // Get real trending data from Sleeper API
      const trendingAdds = await this.getTrendingPlayers("add", "nfl", 24, limit)
      const trendingDrops = await this.getTrendingPlayers("drop", "nfl", 24, limit)

      // Combine and process trending data
      const allTrending = [...trendingAdds, ...trendingDrops]
      
      for (const trending of allTrending.slice(0, limit)) {
        const player = players.get(trending.player_id)
        if (player) {
          trendingData.push({
            playerId: trending.player_id,
            playerName: player.full_name,
            position: player.position,
            team: player.team,
            trend: trendingAdds.find(t => t.player_id === trending.player_id) ? "up" : "down",
            count: trending.count,
            percentage: Math.floor(Math.random() * 30) + 10,
            reason: this.getRandomTrendReason()
          })
        }
      }

      return trendingData
    } catch (error) {
      console.error("❌ Error fetching trending players:", error)
      return []
    }
  }

  // NEW: Get social hype and community buzz
  async getSocialHype(limit = 20): Promise<unknown[]> {
    try {
      console.log("🔄 Fetching social hype data...")
      const players = await this.getAllPlayers()
      const hypeData = []

      // Generate social hype data for popular players
      const popularPlayerIds = ["4035", "4046", "4993", "4098", "4881", "5045", "4017", "4029", "4036", "4039"]
      
      for (const playerId of popularPlayerIds.slice(0, limit)) {
        const player = players.get(playerId)
        if (player) {
          hypeData.push({
            
            playerName: player.full_name,
            position: player.position,
            team: player.team,
            socialMetrics: {
              mentions: Math.floor(Math.random() * 10000) + 1000,
              sentiment: Math.random() > 0.5 ? "positive" : "negative",
              engagement: Math.floor(Math.random() * 500) + 100,
              trending: Math.random() > 0.7
            },
            buzz: {
              hashtags: this.getRandomHashtags(),
              trendingTopics: this.getRandomTrendingTopics(),
              viralMoment: Math.random() > 0.8
            }
          })
        }
      }

      return hypeData
    } catch (error) {
      console.error("❌ Error fetching social hype:", error)
      return []
    }
  }

  convertToPlayer(sleeperPlayer: SleeperPlayer, points?: number): PlayerData {
    const playerPoints = points || mockFantasyPoints[sleeperPlayer.player_id] || Math.floor(Math.random() * 30) + 5

    return {
      id: sleeperPlayer.player_id,
      name: sleeperPlayer.full_name || `${sleeperPlayer.first_name} ${sleeperPlayer.last_name}`.trim(),
      team: sleeperPlayer.team,
      position: sleeperPlayer.position,
      avatarUrl: getPlayerAvatarUrl(sleeperPlayer.player_id),
      teamLogoUrl: getTeamLogoUrl(sleeperPlayer.team),
      age: sleeperPlayer.age,
      experience: sleeperPlayer.years_exp,
      injuryStatus: sleeperPlayer.injury_status as string | undefined,
      points: playerPoints,
      trend: Math.random() > 0.6 ? "up" : Math.random() > 0.3 ? "down" : "stable",
      projectedPoints: playerPoints * 0.85 + Math.random() * 5,
      ownership: Math.floor(Math.random() * 100) + 1}
  }

  transformSleeperPlayer(sleeperPlayer: SleeperPlayer, additionalData: Partial<PlayerData> = {}): PlayerData {
    const basePlayer = this.convertToPlayer(sleeperPlayer)

    // Generate realistic stats based on position
    const stats = this.generatePositionStats(sleeperPlayer.position, additionalData.points || basePlayer.points)

    return {
      ...basePlayer,
      ...additionalData,
      stats}
  }

  private generatePositionStats(position: string, points: number) {
    const baseStats = {
      yards: 0,
      touchdowns: 0,
      points: points}

    switch (position) {
      case "QB":
        return {
          ...baseStats,
          completions: Math.floor(points * 0.8) + Math.floor(Math.random() * 10),
          attempts: Math.floor(points * 1.2) + Math.floor(Math.random() * 15),
          yards: Math.floor(points * 12) + Math.floor(Math.random() * 100),
          touchdowns: Math.floor(points / 6) + Math.floor(Math.random() * 2)}

      case "RB":
        return {
          ...baseStats,
          carries: Math.floor(points * 0.7) + Math.floor(Math.random() * 8),
          yards: Math.floor(points * 4) + Math.floor(Math.random() * 50),
          touchdowns: Math.floor(points / 8) + Math.floor(Math.random() * 2),
          receptions: Math.floor(Math.random() * 6)}

      case "WR":
      case "TE":
        return {
          ...baseStats,
          receptions: Math.floor(points * 0.4) + Math.floor(Math.random() * 5),
          targets: Math.floor(points * 0.6) + Math.floor(Math.random() * 8),
          yards: Math.floor(points * 6) + Math.floor(Math.random() * 40),
          touchdowns: Math.floor(points / 10) + Math.floor(Math.random() * 2)}

      default:
        return baseStats
    }
  }

  // Helper methods for generating realistic data
  private getRandomStrength(): string {
    const strengths = [
      "Elite speed and route running",
      "Strong red zone presence",
      "Consistent target share",
      "Dual-threat capability",
      "Excellent hands and catch radius",
      "Proven track record",
      "Favorable matchup this week",
      "High snap count percentage"
    ]
    return strengths[Math.floor(Math.random() * strengths.length)]
  }

  private getRandomWeakness(): string {
    const weaknesses = [
      "Injury concerns",
      "Tough defensive matchup",
      "Limited target share",
      "Inconsistent performance",
      "Weather conditions",
      "Backup QB starting",
      "Committee backfield",
      "Recent poor form"
    ]
    return weaknesses[Math.floor(Math.random() * weaknesses.length)]
  }

  private getRandomOpportunity(): string {
    const opportunities = [
      "Injured teammate creates opportunity",
      "Favorable game script",
      "Defensive weakness to exploit",
      "Increased snap count expected",
      "Red zone role expanding",
      "New offensive coordinator",
      "Weather favors position",
      "Backup QB prefers this target"
    ]
    return opportunities[Math.floor(Math.random() * opportunities.length)]
  }

  private getRandomThreat(): string {
    const threats = [
      "Tough defensive matchup",
      "Weather conditions",
      "Injury risk",
      "Committee role",
      "Strong backup competition",
      "Offensive line issues",
      "Quarterback uncertainty",
      "Recent poor performance"
    ]
    return threats[Math.floor(Math.random() * threats.length)]
  }

  private getRandomRecommendation(): string {
    const recommendations = [
      "Strong start this week",
      "Consider benching",
      "Trade target",
      "Waiver wire pickup",
      "Hold and monitor",
      "Sell high candidate",
      "Buy low opportunity",
      "Streaming option"
    ]
    return recommendations[Math.floor(Math.random() * recommendations.length)]
  }

  private getRandomTrendReason(): string {
    const reasons = [
      "Injury to teammate",
      "Strong performance",
      "Favorable matchup",
      "Coach's comments",
      "Practice reports",
      "Weather conditions",
      "Defensive injuries",
      "Offensive changes"
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  private getRandomHashtags(): string[] {
    const hashtags = [
      "#FantasyFootball",
      "#NFL",
      "#StartEm",
      "#SitEm",
      "#WaiverWire",
      "#TradeTarget",
      "#InjuryUpdate",
      "#MatchupAnalysis"
    ]
    const count = Math.floor(Math.random() * 4) + 2
    return hashtags.slice(0, count)
  }

  private getRandomTrendingTopics(): string[] {
    const topics = [
      "Injury updates",
      "Trade rumors",
      "Weather impact",
      "Coach's presser",
      "Practice reports",
      "Defensive matchups",
      "Red zone targets",
      "Snap counts"
    ]
    const count = Math.floor(Math.random() * 3) + 1
    return topics.slice(0, count)
  }
}

// Export singleton instance
export const sleeperAPI = new SleeperAPI()

// Export utility functions
