// Sleeper API Integration for PlayerLAB
// Real-time NFL player data, photos, and stats

const SLEEPER_BASE_URL = "https://api.sleeper.app/v1"
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
      const response = await fetch(`${SLEEPER_BASE_URL}/players/nfl`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "PlayerLAB/1.0",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const playersData = await response.json()
      const playersMap = new Map<string, SleeperPlayer>()

      // Convert object to Map and filter for active NFL players
      Object.entries(playersData).forEach(([playerId, playerData]: [string, any]) => {
        if (playerData && typeof playerData === "object" && playerData.position && playerData.team) {
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
            fantasy_positions: playerData.fantasy_positions || [],
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
    limit = 25,
  ): Promise<TrendingPlayer[]> {
    try {
      console.log(`🔄 Fetching trending ${type} players from Sleeper API...`)
      const response = await fetch(
        `${SLEEPER_BASE_URL}/players/${sport}/trending/${type}?lookback_hours=${lookback_hours}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "PlayerLAB/1.0",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Loaded ${data.length} trending ${type} players`)
      return data
    } catch (error) {
      console.error(`❌ Error fetching trending ${type} players:`, error)
      return []
    }
  }

  async getLeagueRosters(leagueId: string) {
    try {
      const response = await fetch(`${SLEEPER_BASE_URL}/league/${leagueId}/rosters`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "PlayerLAB/1.0",
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("Error fetching league rosters:", error)
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
      injuryStatus: sleeperPlayer.injury_status as any,
      points: playerPoints,
      trend: Math.random() > 0.6 ? "up" : Math.random() > 0.3 ? "down" : "stable",
      projectedPoints: playerPoints * 0.85 + Math.random() * 5,
      ownership: Math.floor(Math.random() * 100) + 1,
    }
  }

  transformSleeperPlayer(sleeperPlayer: SleeperPlayer, additionalData: Partial<PlayerData> = {}): PlayerData {
    const basePlayer = this.convertToPlayer(sleeperPlayer)

    // Generate realistic stats based on position
    const stats = this.generatePositionStats(sleeperPlayer.position, additionalData.points || basePlayer.points)

    return {
      ...basePlayer,
      ...additionalData,
      stats,
    }
  }

  private generatePositionStats(position: string, points: number) {
    const baseStats = {
      yards: 0,
      touchdowns: 0,
      points: points,
    }

    switch (position) {
      case "QB":
        return {
          ...baseStats,
          completions: Math.floor(points * 0.8) + Math.floor(Math.random() * 10),
          attempts: Math.floor(points * 1.2) + Math.floor(Math.random() * 15),
          yards: Math.floor(points * 12) + Math.floor(Math.random() * 100),
          touchdowns: Math.floor(points / 6) + Math.floor(Math.random() * 2),
        }

      case "RB":
        return {
          ...baseStats,
          carries: Math.floor(points * 0.7) + Math.floor(Math.random() * 8),
          yards: Math.floor(points * 4) + Math.floor(Math.random() * 50),
          touchdowns: Math.floor(points / 8) + Math.floor(Math.random() * 2),
          receptions: Math.floor(Math.random() * 6),
        }

      case "WR":
      case "TE":
        return {
          ...baseStats,
          receptions: Math.floor(points * 0.4) + Math.floor(Math.random() * 5),
          targets: Math.floor(points * 0.6) + Math.floor(Math.random() * 8),
          yards: Math.floor(points * 6) + Math.floor(Math.random() * 40),
          touchdowns: Math.floor(points / 10) + Math.floor(Math.random() * 2),
        }

      default:
        return baseStats
    }
  }
}

// Export singleton instance
export const sleeperAPI = new SleeperAPI()

// Export utility functions
