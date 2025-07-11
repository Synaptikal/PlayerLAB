"use client"

import { motion } from "framer-motion"
import { TrendingUp, Loader2 } from "lucide-react"
import { RealPlayerCard } from "@/components/ui/real-player-card"
import { useSleeperTrending, useSleeperPlayers } from "@/hooks/use-sleeper-data"
import { sleeperAPI } from "@/lib/sleeper-api"

interface TrendsTileProps {
  delay?: number
}

export function TrendsTile({ delay = 0 }: TrendsTileProps) {
  const { trendingAdd, loading: trendingLoading, error: trendingError } = useSleeperTrending()
  const { players, loading: playersLoading, error: playersError } = useSleeperPlayers()

  const loading = trendingLoading || playersLoading
  const error = trendingError || playersError

  // Convert Sleeper trending data to our player format
  const trendingPlayers = trendingAdd
    .slice(0, 3)
    .map((trending) => {
      const sleeperPlayer = players[trending.player_id]
      if (!sleeperPlayer) return null

      return sleeperAPI.transformSleeperPlayer(sleeperPlayer, {
        trend: "up" as const,
        trendValue: Math.random() * 20 + 5, // Mock trend value for now
        points: Math.floor(Math.random() * 25) + 10,
      })
    })
    .filter(Boolean)

  return (
    <motion.div
      className="fantasy-panel h-96 group cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="glass-tile p-3 rounded-lg glow-green">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white">Trending Players</h3>
          <p className="text-sm text-slate-400">Most added this week</p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className="ml-2 text-slate-400 text-sm">Loading player data...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 text-sm">
            <p>Unable to load trending players</p>
            <p className="text-xs text-slate-500 mt-1">Check network connection</p>
          </div>
        ) : trendingPlayers.length > 0 ? (
          trendingPlayers.map((player, index) => (
            <RealPlayerCard
              key={player.id}
              player={player}
              variant="compact"
              showPoints={true}
              showTrendMeter={true}
              delay={delay + index * 0.1}
            />
          ))
        ) : (
          <div className="text-center text-slate-400 text-sm">
            <p>No trending players available</p>
            <p className="text-xs text-slate-500 mt-1">Try refreshing the page</p>
          </div>
        )}
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-2 bg-slate-800/50 rounded text-xs text-slate-400">
          <div>Trending: {trendingAdd.length} players</div>
          <div>Players DB: {Object.keys(players).length} loaded</div>
          <div>Status: {loading ? "Loading..." : error ? "Error" : "Ready"}</div>
        </div>
      )}
    </motion.div>
  )
}
