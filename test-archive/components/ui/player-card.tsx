"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { GlassContainer } from "./glass-container"
import type { Player } from "@/lib/store"

interface PlayerCardProps {
  player: Player
  showPoints?: boolean
  className?: string
  animated?: boolean
  delay?: number
  teamColor?: "blue" | "green" | "red" | "purple" | "cyan" | "magenta"
}

export function PlayerCard({
  player,
  showPoints = false,
  className,
  animated = true,
  delay = 0,
  teamColor = "purple",
}: PlayerCardProps) {
  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-neon-green" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-neon-red" />
      default:
        return <Minus className="w-4 h-4 text-text-secondary" />
    }
  }

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 10 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
    >
      <GlassContainer hover teamColor={teamColor} className={cn("cursor-pointer", className)}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-header font-bold text-text-primary text-sm">{player.name}</h3>
              {getTrendIcon()}
            </div>
            <p className="text-text-secondary text-xs">
              {player.team} • {player.position}
            </p>
          </div>
          {showPoints && player.points && (
            <div className="text-right">
              <p className="text-neon-cyan font-bold text-lg">{player.points}</p>
              <p className="text-text-secondary text-xs">pts</p>
            </div>
          )}
        </div>
      </GlassContainer>
    </motion.div>
  )
}
