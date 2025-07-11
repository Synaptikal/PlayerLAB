"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { Player } from "@/lib/store"

interface VaultPlayerCardProps {
  player: Player
  showPoints?: boolean
  className?: string
  animated?: boolean
  delay?: number
}

export function VaultPlayerCard({
  player,
  showPoints = false,
  className,
  animated = true,
  delay = 0,
}: VaultPlayerCardProps) {
  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 neon-green" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <motion.div
      className={cn("player-card", className)}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="player-name text-lg">{player.name}</h3>
            {getTrendIcon()}
          </div>
          <p className="player-stats">
            {player.team} • {player.position}
          </p>
        </div>
        {showPoints && player.points && (
          <div className="text-right">
            <p className="data-value text-2xl">{player.points}</p>
            <p className="data-label">pts</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
