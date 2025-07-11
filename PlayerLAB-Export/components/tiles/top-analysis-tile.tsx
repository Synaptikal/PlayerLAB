"use client"

import { motion } from "framer-motion"
import { BarChart3, Users, Eye, Loader2 } from "lucide-react"
import Image from "next/image"
import { useSleeperTrending, useSleeperPlayers } from "@/hooks/use-sleeper-data"
import { getPlayerAvatarUrl } from "@/lib/sleeper-api"

interface TopAnalysisTileProps {
  delay?: number
}

export function TopAnalysisTile({ delay = 0 }: TopAnalysisTileProps) {
  const { trendingAdd, loading: trendingLoading } = useSleeperTrending()
  const { players, loading: playersLoading } = useSleeperPlayers()

  const loading = trendingLoading || playersLoading

  // Generate analysis based on real trending players
  const analysisData = trendingAdd
    .slice(0, 3)
    .map((trending, index) => {
      const sleeperPlayer = players[trending.player_id]
      if (!sleeperPlayer) return null

      const analysisTypes = ["Sleeper Pick", "Breakout Alert", "Value Play"]
      const authors = ["Fantasy Expert", "PlayerLAB Pro", "Analytics Team"]

      return {
        id: trending.player_id,
        title: `${analysisTypes[index % 3]}: ${sleeperPlayer.full_name || sleeperPlayer.first_name + " " + sleeperPlayer.last_name}`,
        author: authors[index % 3],
        views: `${(trending.count * 0.1).toFixed(1)}K`,
        thumbnail: getPlayerAvatarUrl(trending.player_id),
        type: analysisTypes[index % 3],
        player: sleeperPlayer,
      }
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
        <div className="glass-tile p-3 rounded-lg glow-pink">
          <BarChart3 className="w-5 h-5 text-pink-400" />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white">Top Analysis</h3>
          <p className="text-sm text-slate-400">Trending player insights</p>
        </div>
      </div>

      {/* Analysis Items */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : analysisData.length > 0 ? (
          analysisData.map((analysis, index) => (
            <motion.div
              key={analysis.id}
              className="glass-tile p-4 hover:bg-white/15 transition-all duration-300 group/item cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-15 h-11 rounded-lg overflow-hidden bg-slate-700">
                  <Image
                    src={analysis.thumbnail || "/placeholder.svg"}
                    alt={analysis.title}
                    width={60}
                    height={45}
                    className="w-full h-full object-cover object-top"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=45&width=60&text=" + analysis.player.position
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-1 left-1 text-xs text-white font-bold">
                    {analysis.player.position}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 text-xs font-orbitron font-bold rounded">
                      {analysis.type}
                    </span>
                  </div>
                  <h4 className="font-orbitron font-semibold text-sm text-white group-hover/item:text-pink-400 transition-colors line-clamp-2">
                    {analysis.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {analysis.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {analysis.views}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-slate-400 text-sm">
            <p>No analysis available</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
