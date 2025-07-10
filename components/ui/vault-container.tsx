"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface VaultContainerProps {
  children: ReactNode
  className?: string
  variant?: "glass" | "hud" | "data"
  glow?: "cyan" | "magenta" | "green" | "none"
  animated?: boolean
  delay?: number
}

export function VaultContainer({
  children,
  className,
  variant = "glass",
  glow = "none",
  animated = true,
  delay = 0,
}: VaultContainerProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "hud":
        return "hud-panel"
      case "data":
        return "data-tile"
      default:
        return "vault-glass"
    }
  }

  const getGlowClasses = () => {
    switch (glow) {
      case "cyan":
        return "vault-glow-cyan"
      case "magenta":
        return "vault-glow-magenta"
      case "green":
        return "vault-glow-green"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className={cn(getVariantClasses(), glow !== "none" && getGlowClasses(), "p-6", className)}
      initial={animated ? { opacity: 0, y: 20, scale: 0.95 } : {}}
      animate={animated ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  )
}
