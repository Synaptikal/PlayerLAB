"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, User } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface PlayerData {
  id: string
  name: string
  team: string
  position: string
  avatarUrl: string
  teamLogoUrl: string
  age: number
  experience: number
  injuryStatus?: "healthy" | "questionable" | "doubtful" | "out"
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
  trendValue?: number
}

interface RealPlayerCardProps {
  player: PlayerData
  variant?: "default" | "compact" | "detailed"
  showPoints?: boolean
  showTrendMeter?: boolean
  className?: string
  delay?: number
}

export function RealPlayerCard({
  player,
  variant = "default",
  showPoints = false,
  showTrendMeter = false,
  className,
  delay = 0,
}: RealPlayerCardProps) {
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
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getInjuryStatusColor = () => {
    switch (player.injuryStatus) {
      case "healthy":
        return "bg-green-500/20 text-green-400"
      case "questionable":
        return "bg-yellow-500/20 text-yellow-400"
      case "doubtful":
        return "bg-orange-500/20 text-orange-400"
      case "out":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-green-500/20 text-green-400"
    }
  }

  const getPositionStats = () => {
    if (!player.stats) return null

    const { stats, position } = player

    if (position === "QB") {
      return (
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="text-slate-400 mb-1">COMP/ATT</div>
            <div className="font-orbitron font-bold text-white">
              {stats.completions || 0}/{stats.attempts || 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">PASS YDS</div>
            <div className="font-orbitron font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">PASS TD</div>
            <div className="font-orbitron font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    if (position === "RB") {
      return (
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="text-slate-400 mb-1">CARRIES</div>
            <div className="font-orbitron font-bold text-white">{stats.carries || 0}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">RUSH YDS</div>
            <div className="font-orbitron font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">RUSH TD</div>
            <div className="font-orbitron font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    if (position === "WR" || position === "TE") {
      return (
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="text-slate-400 mb-1">REC/TAR</div>
            <div className="font-orbitron font-bold text-white">
              {stats.receptions || 0}/{stats.targets || 0}
            </div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">REC YDS</div>
            <div className="font-orbitron font-bold text-cyan-400">{stats.yards}</div>
          </div>
          <div className="text-center">
            <div className="text-slate-400 mb-1">REC TD</div>
            <div className="font-orbitron font-bold text-purple-400">{stats.touchdowns}</div>
          </div>
        </div>
      )
    }

    return null
  }

  if (variant === "compact") {
    return (
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-xl p-3 group cursor-pointer",
          "backdrop-blur-xl bg-gradient-to-br border border-cyan-400/30",
          getTrendColor(),
          className,
        )}
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.2)",
        }}
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, delay, type: "spring" }}
        whileHover={{ scale: 1.02, y: -2, x: 4 }}
      >
        <div className="flex items-center gap-3">
          {/* Enhanced Player Avatar with Face Focus */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700/50 ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300">
              {player.avatarUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={player.avatarUrl || "/placeholder.svg"}
                    alt={player.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-500"
                    style={{
                      filter: "contrast(1.1) brightness(1.05) saturate(1.1)",
                    }}
                  />
                  {/* Face Enhancement Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/10 transition-all duration-300" />
                  {/* Holographic Scan Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      y: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cyan-400 font-orbitron font-bold">
                  {player.name.charAt(0)}
                </div>
              )}
            </div>
            {player.teamLogoUrl && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 p-0.5 ring-1 ring-cyan-400/30">
                <Image
                  src={player.teamLogoUrl || "/placeholder.svg"}
                  alt={player.team}
                  width={16}
                  height={16}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-orbitron font-bold text-sm text-white truncate group-hover:text-cyan-400 transition-colors duration-300">
                {player.name}
              </h4>
              {getTrendIcon()}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="px-1.5 py-0.5 bg-purple-500/20 rounded text-purple-400 font-mono font-bold">
                {player.position}
              </span>
              <span>{player.team}</span>
            </div>
          </div>

          {/* Points & Trend */}
          <div className="text-right">
            {showPoints && (
              <div className="font-orbitron font-bold text-lg text-cyan-400 mb-1">{player.points?.toFixed(1)}</div>
            )}
            {showTrendMeter && (
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span
                  className={cn(
                    "text-xs font-orbitron font-bold",
                    player.trend === "up"
                      ? "text-green-400"
                      : player.trend === "down"
                        ? "text-red-400"
                        : "text-slate-400",
                  )}
                >
                  {player.trendValue && player.trendValue > 0 ? "+" : ""}
                  {player.trendValue?.toFixed(1) || "0"}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Holographic Scan Line */}
        <motion.div
          className={cn(
            "absolute top-0 left-0 w-full h-0.5 opacity-60",
            player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-cyan-400",
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

  if (variant === "detailed") {
    return (
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-2xl p-5 group cursor-pointer",
          "backdrop-blur-2xl bg-gradient-to-br border border-cyan-400/30",
          getTrendColor(),
          className,
        )}
        style={{
          boxShadow: `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 32px rgba(6, 182, 212, 0.2),
            0 0 0 1px rgba(6, 182, 212, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
        initial={{ opacity: 0, y: 20, rotateX: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
        whileHover={{
          y: -8,
          rotateX: 5,
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        {/* Corner Accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cyan-400/40 group-hover:border-cyan-400/80 transition-colors duration-300" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-purple-400/40 group-hover:border-purple-400/80 transition-colors duration-300" />

        {/* Player Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Enhanced Player Avatar with Face Focus */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-700/50 ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300">
              {player.avatarUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={player.avatarUrl || "/placeholder.svg"}
                    alt={player.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-500"
                    style={{
                      filter: "contrast(1.15) brightness(1.1) saturate(1.2)",
                    }}
                  />
                  {/* Face Enhancement Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/10 transition-all duration-300" />
                  {/* Holographic Scan Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-400/40 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      y: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  {/* Face Focus Ring */}
                  <motion.div
                    className="absolute inset-2 rounded-xl border border-cyan-400/30 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cyan-400 font-orbitron font-bold text-xl">
                  {player.name.charAt(0)}
                </div>
              )}
            </div>
            {player.teamLogoUrl && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-800 p-1 ring-2 ring-slate-700">
                <Image
                  src={player.teamLogoUrl || "/placeholder.svg"}
                  alt={player.team}
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    // Try alternative URL format first
                    if (!target.src.includes("placeholder")) {
                      const playerId = player.id
                      target.src = `https://sleepercdn.com/avatars/thumbs/${playerId}.jpg`
                      return
                    }
                    // Final fallback to placeholder
                    target.src = "/placeholder.svg?height=20&width=20&text=" + player.team
                  }}
                />
              </div>
            )}
          </div>

          {/* Player Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-400 transition-colors duration-300">
                {player.name}
              </h3>
              {getTrendIcon()}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
              <span className="px-2 py-1 bg-purple-500/20 rounded-lg font-orbitron font-bold text-purple-400">
                {player.position}
              </span>
              <span className="font-mono">{player.team}</span>
              {player.age && <span>Age {player.age}</span>}
            </div>

            {/* Points Display */}
            {showPoints && player.points && (
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-400 mb-1 font-orbitron uppercase tracking-wide">
                    Fantasy Points
                  </div>
                  <div className="font-orbitron font-bold text-2xl text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {player.points.toFixed(1)}
                  </div>
                </div>
                {player.projectedPoints && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-orbitron uppercase tracking-wide">Projected</div>
                    <div className="font-orbitron font-bold text-lg text-purple-400">
                      {player.projectedPoints.toFixed(1)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trend Indicator */}
          {showTrendMeter && player.trendValue && (
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
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
              <div className="w-20 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    player.trend === "up"
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : player.trend === "down"
                        ? "bg-gradient-to-r from-red-400 to-rose-400"
                        : "bg-gradient-to-r from-cyan-400 to-purple-400",
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(player.trendValue || 0) * 5, 100)}%` }}
                  transition={{ duration: 1, delay: delay + 0.5 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Player Stats */}
        {player.stats && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-400 font-orbitron uppercase tracking-wide">Stats</span>
            </div>
            {getPositionStats()}
          </div>
        )}

        {/* Additional Info */}
        <div className="flex justify-between items-center text-xs text-slate-400">
          {player.ownership && (
            <div className="flex items-center gap-2">
              <span>Ownership:</span>
              <div className="flex items-center gap-1">
                <span className="font-orbitron font-bold text-cyan-400">{player.ownership}%</span>
                <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${player.ownership}%` }}
                    transition={{ duration: 1, delay: delay + 0.8 }}
                  />
                </div>
              </div>
            </div>
          )}
          {player.experience && <span>Exp: {player.experience} yrs</span>}
        </div>

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
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full opacity-60",
                player.trend === "up" ? "bg-green-400" : player.trend === "down" ? "bg-red-400" : "bg-cyan-400",
              )}
              style={{
                left: `${15 + i * 20}%`,
                top: `${25 + i * 15}%`,
              }}
              animate={{
                y: [-12, 12, -12],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: delay + i * 0.4,
              }}
            />
          ))}
        </div>

        {/* Holographic Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn("glass-tile p-4 hover:bg-white/15 transition-all duration-300 group cursor-pointer", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        {/* Player Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300">
            <Image
              src={player.avatarUrl || "/placeholder.svg"}
              alt={player.name}
              width={48}
              height={48}
              className="w-full h-full object-cover object-top"
              crossOrigin="anonymous"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                // Try alternative URL format first
                if (!target.src.includes("placeholder")) {
                  const playerId = player.id
                  target.src = `https://sleepercdn.com/avatars/thumbs/${playerId}.jpg`
                  return
                }
                // Final fallback to placeholder
                target.src = "/placeholder.svg?height=48&width=48&text=" + player.position
              }}
              onLoad={(e) => {
                // Add success styling
                const target = e.target as HTMLImageElement
                target.style.opacity = "1"
              }}
              style={{ opacity: 0, transition: "opacity 0.3s ease" }}
            />
          </div>

          {/* Team Logo Overlay */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden bg-slate-800 ring-1 ring-slate-600">
            <Image
              src={player.teamLogoUrl || "/placeholder.svg"}
              alt={player.team}
              width={20}
              height={20}
              className="w-full h-full object-contain"
              crossOrigin="anonymous"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=20&width=20&text=" + player.team
              }}
            />
          </div>

          {/* Holographic Scan Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
              ease: "linear",
            }}
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-orbitron font-bold text-white text-sm truncate group-hover:text-cyan-400 transition-colors">
              {player.name}
            </h4>
            {getTrendIcon()}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{player.team}</span>
            <span>•</span>
            <span>{player.position}</span>
            {player.injuryStatus && player.injuryStatus !== "healthy" && (
              <>
                <span>•</span>
                <span className={cn("px-1.5 py-0.5 rounded text-xs font-bold", getInjuryStatusColor())}>
                  {player.injuryStatus.toUpperCase()}
                </span>
              </>
            )}
          </div>

          {/* Trend Meter */}
          {showTrendMeter && player.trendValue && (
            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Trend:</span>
                <span className={cn("font-bold", getTrendColor())}>
                  {player.trendValue > 0 ? "+" : ""}
                  {player.trendValue.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Points Display */}
        {showPoints && player.points && (
          <div className="text-right">
            <div className="text-lg font-bold text-cyan-400">{player.points.toFixed(1)}</div>
            <div className="text-xs text-slate-400">pts</div>
          </div>
        )}
      </div>

      {/* Stats Row (for detailed variant) */}
      {variant === "detailed" && player.stats && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-white font-bold">{player.stats.yards}</div>
              <div className="text-slate-400">YDS</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">{player.stats.touchdowns}</div>
              <div className="text-slate-400">TD</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold">{player.stats.points.toFixed(1)}</div>
              <div className="text-slate-400">PTS</div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
