"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  animated?: boolean
  delay?: number
  teamColor?: "blue" | "green" | "red" | "cyan" | "magenta"
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  animated = true,
  delay = 0,
  teamColor,
}: GlassCardProps) {
  const getTeamGlow = () => {
    switch (teamColor) {
      case "blue":
        return "team-glow-blue"
      case "green":
        return "team-glow-green"
      case "red":
        return "team-glow-red"
      case "cyan":
        return "neon-glow"
      case "magenta":
        return "drop-shadow-glow-magenta"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn(
        "glass-card",
        hover && "neon-glow-hover cursor-pointer",
        glow && "neon-glow",
        teamColor && getTeamGlow(),
        className,
      )}
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  )
}
