"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CyberContainerProps {
  children: ReactNode
  className?: string
  variant?: "glass" | "data" | "player"
  glow?: "cyan" | "pink" | "green" | "none"
  animated?: boolean
  delay?: number
  trending?: "up" | "down" | "neutral" | "none"
}

export function CyberContainer({
  children,
  className,
  variant = "glass",
  glow = "none",
  animated = true,
  delay = 0,
  trending = "none",
}: CyberContainerProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "data":
        return "data-panel"
      case "player":
        return `cyber-player-card ${trending !== "none" ? `trending-${trending}` : ""}`
      default:
        return "cyber-glass"
    }
  }

  const getGlowClasses = () => {
    switch (glow) {
      case "cyan":
        return "cyber-glow-cyan"
      case "pink":
        return "cyber-glow-pink"
      case "green":
        return "cyber-glow-green"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn(getVariantClasses(), glow !== "none" && getGlowClasses(), className)}
      initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : {}}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  )
}
