"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NFLContainerProps {
  children: ReactNode
  className?: string
  variant?: "glass" | "fantasy" | "player"
  glow?: "blue" | "cyan" | "silver" | "none"
  animated?: boolean
  delay?: number
  trending?: "up" | "down" | "neutral" | "none"
}

export function NFLContainer({
  children,
  className,
  variant = "glass",
  glow = "none",
  animated = true,
  delay = 0,
  trending = "none",
}: NFLContainerProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "fantasy":
        return "fantasy-panel"
      case "player":
        return `nfl-player-card ${trending !== "none" ? `trending-${trending}` : ""}`
      default:
        return "nfl-glass"
    }
  }

  const getGlowClasses = () => {
    switch (glow) {
      case "blue":
        return "nfl-glow-blue"
      case "cyan":
        return "nfl-glow-cyan"
      case "silver":
        return "nfl-glow-silver"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn(getVariantClasses(), glow !== "none" && getGlowClasses(), className)}
      initial={animated ? { opacity: 0, y: 24, scale: 0.96 } : {}}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 80,
        damping: 20,
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  )
}
