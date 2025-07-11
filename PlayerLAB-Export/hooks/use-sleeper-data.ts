"use client"

import { useState, useEffect } from "react"
import { sleeperAPI } from "@/lib/sleeper-api"

export function useSleeperTrending() {
  const [trendingAdd, setTrendingAdd] = useState<any[]>([])
  const [trendingDrop, setTrendingDrop] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("🚀 Starting Sleeper API trending data fetch...")

        const [addData, dropData] = await Promise.all([
          sleeperAPI.getTrendingPlayers("add", "nfl", 24, 25),
          sleeperAPI.getTrendingPlayers("drop", "nfl", 24, 25),
        ])

        // Filter out players with invalid IDs
        const validAddData = addData.filter((player) => player.player_id && player.count > 0)
        const validDropData = dropData.filter((player) => player.player_id && player.count > 0)

        setTrendingAdd(validAddData)
        setTrendingDrop(validDropData)

        console.log("✅ Successfully loaded trending data:", {
          adds: validAddData.length,
          drops: validDropData.length,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch trending data"
        setError(errorMessage)
        console.error("❌ Error fetching trending data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingData()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchTrendingData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { trendingAdd, trendingDrop, loading, error }
}

export function useSleeperPlayers() {
  const [players, setPlayers] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("🚀 Starting Sleeper players fetch...")

        const playersMap = await sleeperAPI.getAllPlayers()
        const playersObject = Object.fromEntries(playersMap)

        // Filter out players without essential data
        const validPlayers = Object.fromEntries(
          Object.entries(playersObject).filter(
            ([id, player]: [string, any]) => player && player.full_name && player.position && player.team,
          ),
        )

        setPlayers(validPlayers)

        console.log("✅ Successfully loaded players:", {
          total: Object.keys(playersObject).length,
          valid: Object.keys(validPlayers).length,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch players"
        setError(errorMessage)
        console.error("❌ Error fetching players:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()

    // Refresh player data every hour
    const interval = setInterval(fetchPlayers, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { players, loading, error }
}

export function useSleeperRosters(leagueId: string) {
  const [rosters, setRosters] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!leagueId) return

    const fetchRosters = async () => {
      try {
        setLoading(true)
        setError(null)

        const rostersData = await sleeperAPI.getLeagueRosters(leagueId)
        setRosters(rostersData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch rosters"
        setError(errorMessage)
        console.error("❌ Error fetching rosters:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRosters()
  }, [leagueId])

  return { rosters, loading, error }
}
