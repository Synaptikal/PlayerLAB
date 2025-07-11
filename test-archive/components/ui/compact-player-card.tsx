"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/store"

interface CompactPlayerCardProps {
  player: Player
  showPoints?: boolean
  className?: string
  delay?: number
}

export function CompactPlayerCard({ player, showPoints = false, className, delay = 0 }: CompactPlayerCardProps) {
  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 neon-green" />
      case "down":
        return <TrendingDown className="w-3 h-3 neon-red" />
      default:
        return <Minus className="w-3 h-3 text-slate-400" />
    }
  }

  const getTrendClass = () => {
    switch (player.trend) {
      case "up":
        return "trending-up"
      case "down":
        return "trending-down"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn("mobile-card", getTrendClass(), className)}
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        type: "spring",
        stiffness: 120,
      }}
      whileHover={{
        x: 6,
        y: -2,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Holographic Scan Line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-orbitron font-semibold text-sm text-white truncate group-hover:neon-cyan transition-colors duration-300">
              {player.name}
            </h4>
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <Zap className="w-2 h-2 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300" />
            </div>
          </div>
          <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
            {player.team} • {player.position}
          </p>
        </div>

        {showPoints && player.points && (
          <div className="text-right ml-4 relative">
            <div className="relative">
              <p className="font-orbitron font-bold text-sm neon-cyan group-hover:scale-110 transition-transform duration-300">
                {player.points}
              </p>
              <p className="text-xs text-slate-500">pts</p>
              {/* Points Glow Effect */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors duration-300" />

      {/* Data Stream Indicators */}
      <div className="absolute bottom-1 right-2 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
