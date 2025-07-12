"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface PlayerStats {
  completions?: number
  attempts?: number
  yards: number
  touchdowns: number
  carries?: number
  receptions?: number
  targets?: number
  points: number
}

interface SleeperPlayer {
  id: string
  name: string
  team: string
  position: string
  avatarUrl?: string
  teamLogoUrl?: string
  age?: number
  experience?: number
  injuryStatus?: "healthy" | "questionable" | "doubtful" | "out" | "probable"
  stats: PlayerStats
  trend: "up" | "down" | "stable"
  trendValue: number
  points: number
  projectedPoints?: number
  ownership?: number
}

interface SleeperPlayerCardProps {
  player: SleeperPlayer
  showPoints?: boolean
  showStats?: boolean
  showTrendMeter?: boolean
  delay?: number
  variant?: "sleeper" | "compact"
}

export function SleeperPlayerCard({
  player,
  showPoints = false,
  showStats = false,
  showTrendMeter = false,
  delay = 0,
  variant = "sleeper",
}: SleeperPlayerCardProps) {
  const getTrendIcon = () => {
    switch (player.trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Minus className="w-4 h-4 text-slate-400" />
    }
  }

  const getTrendColor = () => {
    switch (player.trend) {
      case "up":
        return "from-green-500/20 to-emerald-500/20"
      case "down":
        return "from-red-500/20 to-rose-500/20"
      default:
        return "from-slate-500/20 to-gray-500/20"
    }
  }

  const getInjuryIcon = () => {
    switch (player.injuryStatus) {
      case "questionable":
        return <AlertTriangle className="w-3 h-3 text-yellow-400" />
      case "doubtful":
        return <AlertTriangle className="w-3 h-3 text-orange-400" />
      case "out":
        return <AlertTriangle className="w-3 h-3 text-red-400" />
      case "probable":
        return <Shield className="w-3 h-3 text-green-400" />
      default:
        return null
    }
  }

  const getPositionStats = () => {
    const { stats, position } = player

    if (position === "QB") {
      return (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-slate-400">COMP/ATT</div>
            <div className="font-bold text-white">
              {stats.completions || 0}/{stats.attempts || 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">PASS YDS</div>
            <div className="font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">PASS TD</div>
            <div className="font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    if (position === "RB") {
      return (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-slate-400">CARRIES</div>
            <div className="font-bold text-white">{stats.carries || 0}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">RUSH YDS</div>
            <div className="font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">RUSH TD</div>
            <div className="font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    if (position === "WR" || position === "TE") {
      return (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="text-slate-400">REC/TAR</div>
            <div className="font-bold text-white">
              {stats.receptions || 0}/{stats.targets || 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">REC YDS</div>
            <div className="font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400">REC TD</div>
            <div className="font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    return null
  }

  if (variant === "compact") {
    return (
      <motion.div
        className="relative overflow-hidden rounded-xl p-3 group cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${getTrendColor()}, rgba(15, 23, 42, 0.8))`,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(6, 182, 212, 0.2)",
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <div className="flex items-center gap-3">
          {/* Player Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
              {player.avatarUrl ? (
                <Image
                  src={player.avatarUrl || "/placeholder.svg"}
                  alt={player.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                  {player.name.charAt(0)}
                </div>
              )}
            </div>
            {player.teamLogoUrl && (
              <Image
                src={player.teamLogoUrl || "/placeholder.svg"}
                alt={player.team}
                width={16}
                height={16}
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-800 p-0.5"
              />
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-orbitron font-bold text-sm text-white truncate">{player.name}</h4>
              {getInjuryIcon()}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{player.position}</span>
              <span>•</span>
              <span>{player.team}</span>
            </div>
          </div>

          {/* Points & Trend */}
          <div className="text-right">
            {showPoints && <div className="font-bold text-lg text-cyan-400">{player.points.toFixed(1)}</div>}
            {showTrendMeter && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span
                  className={cn(
                    "text-xs font-bold",
                    player.trend === "up"
                      ? "text-green-400"
                      : player.trend === "down"
                        ? "text-red-400"
                        : "text-slate-400",
                  )}
                >
                  {player.trendValue > 0 ? "+" : ""}
                  {player.trendValue.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Holographic Scan Line */}
        <motion.div
          className={cn(
            "absolute top-0 left-0 w-full h-0.5 opacity-60",
            player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-slate-400",
          )}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: delay + Math.random() * 2,
          }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-4 group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${getTrendColor()}, rgba(15, 23, 42, 0.9))`,
        backdropFilter: "blur(32px) saturate(200%)",
        border: "1px solid rgba(6, 182, 212, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.2)",
      }}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay, type: "spring" }}
      whileHover={{
        y: -8,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      {/* Corner Accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-colors duration-300" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-purple-400/40 group-hover:border-purple-400/80 transition-colors duration-300" />

      {/* Player Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Player Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-700 ring-2 ring-cyan-400/30">
            {player.avatarUrl ? (
              <Image
                src={player.avatarUrl || "/placeholder.svg"}
                alt={player.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          {player.teamLogoUrl && (
            <Image
              src={player.teamLogoUrl || "/placeholder.svg"}
              alt={player.team}
              width={24}
              height={24}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-800 p-1 ring-2 ring-slate-700"
            />
          )}
        </div>

        {/* Player Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-orbitron font-bold text-lg text-white">{player.name}</h3>
            {getInjuryIcon()}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <span className="px-2 py-1 bg-slate-700/50 rounded-lg font-bold">{player.position}</span>
            <span>{player.team}</span>
            {player.age && <span>• Age {player.age}</span>}
          </div>

          {/* Points Display */}
          {showPoints && (
            <div className="flex items-center gap-4">
              <div>
                <div className="text-xs text-slate-400">FANTASY PTS</div>
                <div className="font-orbitron font-bold text-2xl text-cyan-400">{player.points.toFixed(1)}</div>
              </div>
              {player.projectedPoints && (
                <div>
                  <div className="text-xs text-slate-400">PROJECTED</div>
                  <div className="font-orbitron font-bold text-lg text-purple-400">
                    {player.projectedPoints.toFixed(1)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Trend Indicator */}
        {showTrendMeter && (
          <div className="text-right">
            <div className="flex items-center gap-1 mb-2">
              {getTrendIcon()}
              <span
                className={cn(
                  "font-orbitron font-bold text-sm",
                  player.trend === "up"
                    ? "text-green-400"
                    : player.trend === "down"
                      ? "text-red-400"
                      : "text-slate-400",
                )}
              >
                {player.trendValue > 0 ? "+" : ""}
                {player.trendValue.toFixed(1)}%
              </span>
            </div>

            {/* Trend Meter */}
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  player.trend === "up"
                    ? "bg-gradient-to-r from-green-400 to-emerald-400"
                    : player.trend === "down"
                      ? "bg-gradient-to-r from-red-400 to-rose-400"
                      : "bg-gradient-to-r from-slate-400 to-gray-400",
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(player.trendValue) * 5, 100)}%` }}
                transition={{ duration: 1, delay: delay + 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Player Stats */}
      {showStats && (
        <div className="mb-4">
          <div className="text-xs text-slate-400 mb-2 font-orbitron uppercase tracking-wide">Performance</div>
          {getPositionStats()}
        </div>
      )}

      {/* Additional Info */}
      {player.ownership && (
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Ownership: {player.ownership}%</span>
          {player.experience && <span>Exp: {player.experience} yrs</span>}
        </div>
      )}

      {/* Holographic Scan Lines */}
      <motion.div
        className={cn(
          "absolute top-0 left-0 w-full h-px opacity-60",
          player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-cyan-400",
        )}
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + Math.random() * 3,
        }}
      />

      <motion.div
        className={cn(
          "absolute bottom-0 left-0 w-full h-px opacity-40",
          player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-purple-400",
        )}
        animate={{
          x: ["100%", "-100%"],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + Math.random() * 2 + 1,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full opacity-60",
              player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-cyan-400",
            )}
            style={{
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: delay + i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
