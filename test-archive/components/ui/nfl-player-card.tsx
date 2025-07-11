"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Zap, Star } from "lucide-react"
import { NFLContainer } from "./nfl-container"
import type { Player } from "@/lib/store"

interface NFLPlayerCardProps {
  player: Player
  showPoints?: boolean
  showTrend?: boolean
  className?: string
  animated?: boolean
  delay?: number
  variant?: "compact" | "detailed" | "sleeper"
}

export function NFLPlayerCard({
  player,
  showPoints = false,
  showTrend = true,
  className,
  animated = true,
  delay = 0,
  variant = "sleeper",
}: NFLPlayerCardProps) {
  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 trend-up" />
      case "down":
        return <TrendingDown className="w-4 h-4 trend-down" />
      default:
        return <Minus className="w-4 h-4 trend-neutral" />
    }
  }

  const getTrendColor = () => {
    switch (player.trend) {
      case "up":
        return "neon-green"
      case "down":
        return "neon-red"
      default:
        return "neon-silver"
    }
  }

  if (variant === "sleeper") {
    return (
      <motion.div
        className={cn("nfl-player-card", className)}
        initial={animated ? { opacity: 0, x: -24 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className={`font-orbitron font-bold text-lg ${getTrendColor()}`}>{player.name}</h3>
              {showTrend && getTrendIcon()}
              <Star className="w-4 h-4 neon-cyan opacity-60" />
            </div>
            <div className="flex items-center gap-4 text-sm mb-3">
              <span className="nfl-subtitle font-mono font-semibold">{player.team}</span>
              <span className="neon-blue font-mono font-bold">{player.position}</span>
            </div>
            {/* Stats Bar */}
            <div className="stats-bar" />
          </div>
          {showPoints && player.points && (
            <div className="text-right ml-6">
              <div className="nfl-stat text-2xl" data-label="PTS">
                {player.points}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  if (variant === "detailed") {
    return (
      <NFLContainer variant="player" trending={player.trend} animated={animated} delay={delay} className={className}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 neon-blue" />
              <h3 className={`font-orbitron font-bold text-xl ${getTrendColor()}`}>{player.name}</h3>
            </div>
            {showTrend && getTrendIcon()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="nfl-subtitle text-xs uppercase tracking-wider mb-1">Team</p>
              <p className="neon-blue font-mono font-bold">{player.team}</p>
            </div>
            <div>
              <p className="nfl-subtitle text-xs uppercase tracking-wider mb-1">Position</p>
              <p className="neon-blue font-mono font-bold">{player.position}</p>
            </div>
          </div>

          {showPoints && player.points && (
            <div className="border-t border-blue-500/30 pt-4">
              <div className="nfl-stat text-3xl" data-label="FANTASY POINTS">
                {player.points}
              </div>
            </div>
          )}

          <div className="stats-bar" />
        </div>
      </NFLContainer>
    )
  }

  // Compact variant
  return (
    <motion.div
      className={cn("nfl-glass p-3 flex items-center gap-3", className)}
      initial={animated ? { opacity: 0, scale: 0.95 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02, x: 6 }}
    >
      <div className="flex-1">
        <h4 className={`font-orbitron font-semibold ${getTrendColor()}`}>{player.name}</h4>
        <p className="nfl-subtitle text-xs">
          {player.team} • {player.position}
        </p>
      </div>
      {showTrend && getTrendIcon()}
      {showPoints && player.points && <div className="neon-blue font-mono font-bold">{player.points}</div>}
    </motion.div>
  )
}
