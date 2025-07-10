"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnalyticsTileProps {
  title: string
  icon: ReactNode
  children: ReactNode
  className?: string
  delay?: number
  glowColor?: "blue" | "cyan" | "green" | "red" | "yellow"
}

export function AnalyticsTile({ title, icon, children, className, delay = 0, glowColor = "blue" }: AnalyticsTileProps) {
  const glowClass = {
    blue: "glow-blue",
    cyan: "glow-cyan",
    green: "glow-green",
    red: "glow-red",
    yellow: "glow-yellow",
  }[glowColor]

  return (
    <motion.div
      className={cn("fantasy-panel group cursor-pointer", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("glass-tile p-3 rounded-lg", glowClass)}>{icon}</div>
        <div className="flex-1">
          <h3 className="font-orbitron font-bold text-sm text-secondary-dark uppercase tracking-wide">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">{children}</div>
    </motion.div>
  )
}
