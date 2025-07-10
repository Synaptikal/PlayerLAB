"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { RealPlayerCard } from "./real-player-card"

interface HolographicAnalyticsTileProps {
  title: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
  players?: Array<{
    id: string
    name: string
    team: string
    position: string
    avatarUrl?: string
    teamLogoUrl?: string
    age?: number
    experience?: number
    injuryStatus?: "healthy" | "questionable" | "doubtful" | "out" | "probable"
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
    trend?: "up" | "down" | "stable"
    trendValue?: number
    points: number
    projectedPoints?: number
    ownership?: number
  }>
  data?: Array<{ label: string; value: number; trend?: "up" | "down" | "stable" }>
  delay?: number
  className?: string
  variant?: "players" | "data" | "chart"
}

export function HolographicAnalyticsTile({
  title,
  subtitle,
  icon: Icon = Activity,
  players = [],
  data = [],
  delay = 0,
  className,
  variant = "players",
}: HolographicAnalyticsTileProps) {
  const renderWireframeOverlay = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Wireframe Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(255, 0, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 80px 80px, 80px 80px",
        }}
      />

      {/* Holographic Scan Lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          style={{ top: `${15 + i * 15}%` }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: delay + i * 0.3,
          }}
        />
      ))}

      {/* Floating Data Points */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-60"
          style={{
            left: `${10 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 40}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: delay + i * 0.1,
          }}
        />
      ))}

      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300">
        <motion.path
          d="M50,50 Q200,100 350,50 T350,250 Q200,200 50,250"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: delay + 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )

  const renderDataVisualization = () => {
    if (variant === "chart") {
      return (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
                <span className="text-sm font-orbitron text-slate-300">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / 100) * 100}%` }}
                    transition={{ duration: 1, delay: delay + index * 0.1 }}
                  />
                </div>
                <span className="font-orbitron font-bold text-cyan-400 min-w-[3rem] text-right">
                  {item.value.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {players.slice(0, 3).map((player, index) => (
          <RealPlayerCard
            key={player.id}
            player={player}
            variant="compact"
            showPoints={true}
            showTrendMeter={true}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 group cursor-pointer",
        "backdrop-blur-2xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60",
        "border border-cyan-400/30 hover:border-cyan-400/60",
        className,
      )}
      style={{
        boxShadow: `
          0 25px 50px rgba(0, 0, 0, 0.5),
          0 12px 40px rgba(6, 182, 212, 0.2),
          0 0 0 1px rgba(6, 182, 212, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(255, 0, 255, 0.1)
        `,
      }}
      initial={{ opacity: 0, y: 30, rotateX: -15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={{
        y: -12,
        rotateX: 8,
        scale: 1.02,
        transition: { duration: 0.4 },
      }}
    >
      {/* Holographic Wireframe Overlay */}
      {renderWireframeOverlay()}

      {/* Corner Holographic Accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50 group-hover:border-cyan-400/90 transition-colors duration-300">
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-purple-400/50 group-hover:border-purple-400/90 transition-colors duration-300">
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-purple-400/50 group-hover:border-purple-400/90 transition-colors duration-300">
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50 group-hover:border-cyan-400/90 transition-colors duration-300">
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center ring-2 ring-cyan-400/30 group-hover:ring-cyan-400/60 transition-all duration-300">
              <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: delay + 0.5,
              }}
            />
          </div>

          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
              {title}
            </h3>
            {subtitle && <p className="text-sm text-slate-400 font-mono mt-1">{subtitle}</p>}
          </div>

          {/* Status Indicators */}
          <div className="flex items-center gap-2">
            <motion.div
              className="w-3 h-3 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-xs font-orbitron text-green-400 uppercase tracking-wide">LIVE</span>
          </div>
        </div>

        {/* Holographic Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10">{renderDataVisualization()}</div>

      {/* Holographic Projection Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay,
        }}
      />

      {/* Edge Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Scanning Beam */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
        animate={{
          y: [0, 300, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + Math.random() * 3,
        }}
      />
    </motion.div>
  )
}
