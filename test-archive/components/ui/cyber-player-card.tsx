"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Activity, Zap } from "lucide-react"
import { CyberContainer } from "./cyber-container"
import type { Player } from "@/lib/store"

interface CyberPlayerCardProps {
  player: Player
  showPoints?: boolean
  showTrend?: boolean
  className?: string
  animated?: boolean
  delay?: number
  variant?: "compact" | "detailed" | "sleeper"
}

export function CyberPlayerCard({
  player,
  showPoints = false,
  showTrend = true,
  className,
  animated = true,
  delay = 0,
  variant = "sleeper",
}: CyberPlayerCardProps) {
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
        return "neon-pink"
      default:
        return "neon-yellow"
    }
  }

  if (variant === "sleeper") {
    return (
      <motion.div
        className={cn("cyber-player-card", className)}
        initial={animated ? { opacity: 0, x: -20 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`font-orbitron font-bold text-lg ${getTrendColor()}`}>{player.name}</h3>
              {showTrend && getTrendIcon()}
              <Activity className="w-4 h-4 neon-cyan opacity-60" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="cyber-subtitle font-mono">{player.team}</span>
              <span className="neon-cyan font-mono">{player.position}</span>
            </div>
            {/* Data Bar */}
            <div className="data-bar mt-3" />
          </div>
          {showPoints && player.points && (
            <div className="text-right ml-4">
              <div className="stat-display text-2xl" data-label="PTS">
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
      <CyberContainer variant="player" trending={player.trend} animated={animated} delay={delay} className={className}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 neon-cyan" />
              <h3 className={`font-orbitron font-bold text-xl ${getTrendColor()}`}>{player.name}</h3>
            </div>
            {showTrend && getTrendIcon()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="cyber-subtitle text-xs uppercase tracking-wider mb-1">Team</p>
              <p className="neon-cyan font-mono font-bold">{player.team}</p>
            </div>
            <div>
              <p className="cyber-subtitle text-xs uppercase tracking-wider mb-1">Position</p>
              <p className="neon-cyan font-mono font-bold">{player.position}</p>
            </div>
          </div>

          {showPoints && player.points && (
            <div className="border-t border-cyan-500/30 pt-4">
              <div className="stat-display text-3xl" data-label="FANTASY POINTS">
                {player.points}
              </div>
            </div>
          )}

          <div className="data-bar" />
        </div>
      </CyberContainer>
    )
  }

  // Compact variant
  return (
    <motion.div
      className={cn("cyber-glass p-3 flex items-center gap-3", className)}
      initial={animated ? { opacity: 0, scale: 0.9 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="flex-1">
        <h4 className={`font-orbitron font-semibold ${getTrendColor()}`}>{player.name}</h4>
        <p className="cyber-subtitle text-xs">
          {player.team} • {player.position}
        </p>
      </div>
      {showTrend && getTrendIcon()}
      {showPoints && player.points && <div className="neon-cyan font-mono font-bold">{player.points}</div>}
    </motion.div>
  )
}
