"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassContainerProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  animated?: boolean
  delay?: number
  teamColor?: "blue" | "green" | "red" | "purple" | "cyan" | "magenta"
  depth?: "shallow" | "medium" | "deep"
}

export function GlassContainer({
  children,
  className,
  hover = false,
  glow = false,
  animated = true,
  delay = 0,
  teamColor,
  depth = "medium",
}: GlassContainerProps) {
  const getDepthClasses = () => {
    switch (depth) {
      case "shallow":
        return "backdrop-blur-lg bg-white/5 border border-white/15"
      case "medium":
        return "backdrop-blur-2xl bg-white/10 border border-white/20"
      case "deep":
        return "backdrop-blur-3xl bg-white/15 border border-white/30"
      default:
        return "backdrop-blur-2xl bg-white/10 border border-white/20"
    }
  }

  const getTeamGlow = () => {
    switch (teamColor) {
      case "blue":
        return "shadow-glow-blue hover:shadow-glow-blue-intense border-blue-400/30"
      case "green":
        return "shadow-glow-green hover:shadow-glow-green-intense border-green-400/30"
      case "red":
        return "shadow-glow-red hover:shadow-glow-red-intense border-red-400/30"
      case "purple":
        return "shadow-glow-purple hover:shadow-glow-purple-intense border-purple-400/30"
      case "cyan":
        return "shadow-glow-cyan hover:shadow-glow-cyan-intense border-cyan-400/30"
      case "magenta":
        return "shadow-glow-magenta hover:shadow-glow-magenta-intense border-magenta-400/30"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn(
        getDepthClasses(),
        "rounded-xl shadow-glass relative overflow-hidden",
        hover && "hover:scale-105 hover:bg-white/15 transition-all duration-500 cursor-pointer",
        glow && "shadow-glow",
        teamColor && getTeamGlow(),
        className,
      )}
      initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : {}}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
    >
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-magenta-500/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </motion.div>
  )
}
