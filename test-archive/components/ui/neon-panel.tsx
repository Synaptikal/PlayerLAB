"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NeonPanelProps {
  children: ReactNode
  className?: string
  color?: "blue" | "green" | "red" | "purple" | "cyan" | "magenta"
  animated?: boolean
  delay?: number
  hover?: boolean
}

export function NeonPanel({
  children,
  className,
  color = "blue",
  animated = true,
  delay = 0,
  hover = true,
}: NeonPanelProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "border-blue-400/50 shadow-glow-blue hover:shadow-glow-blue-intense hover:border-blue-400/80"
      case "green":
        return "border-green-400/50 shadow-glow-green hover:shadow-glow-green-intense hover:border-green-400/80"
      case "red":
        return "border-red-400/50 shadow-glow-red hover:shadow-glow-red-intense hover:border-red-400/80"
      case "purple":
        return "border-purple-400/50 shadow-glow-purple hover:shadow-glow-purple-intense hover:border-purple-400/80"
      case "cyan":
        return "border-cyan-400/50 shadow-glow-cyan hover:shadow-glow-cyan-intense hover:border-cyan-400/80"
      case "magenta":
        return "border-magenta-400/50 shadow-glow-magenta hover:shadow-glow-magenta-intense hover:border-magenta-400/80"
      default:
        return "border-blue-400/50 shadow-glow-blue hover:shadow-glow-blue-intense hover:border-blue-400/80"
    }
  }

  return (
    <motion.div
      className={cn(
        "backdrop-blur-lg bg-white/10 rounded-xl p-4 transition-all duration-500",
        getColorClasses(),
        hover && "hover:scale-105 cursor-pointer",
        className,
      )}
      initial={animated ? { opacity: 0, y: 20, rotateX: -10 } : {}}
      animate={animated ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay, type: "spring" }}
      whileHover={hover ? { y: -5, rotateX: 5 } : {}}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-border-glow" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
