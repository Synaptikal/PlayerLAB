"use client"

import { motion } from "framer-motion"
import { FlaskLogo } from "./flask-logo"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "wordmark" | "nfl" | "monogram" | "flask"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

export function Logo({ variant = "nfl", size = "md", animated = true, className }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const flaskSizes = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
  }

  if (variant === "flask") {
    return (
      <motion.div
        className={cn("flex items-center gap-3", className)}
        initial={animated ? { opacity: 0, scale: 0.9 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <FlaskLogo size={flaskSizes[size]} animated={animated} />
        <div className="flex flex-col">
          <span className={cn("font-orbitron font-bold nfl-title", sizeClasses[size])}>PlayerLAB</span>
          <span className="text-xs neon-cyan font-mono tracking-widest opacity-80">ANALYTICS</span>
        </div>
      </motion.div>
    )
  }

  if (variant === "nfl") {
    return (
      <motion.div
        className={cn("flex items-center gap-3", className)}
        initial={animated ? { opacity: 0, scale: 0.9 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="nfl-glass nfl-glow-blue p-2 rounded-lg">
          <span className="font-orbitron font-bold neon-blue text-lg">PL</span>
        </div>
        <div className="flex flex-col">
          <span className={cn("font-orbitron font-bold nfl-title", sizeClasses[size])}>PlayerLAB</span>
          <span className="text-xs neon-cyan font-mono tracking-widest opacity-80">NFL.EDGE</span>
        </div>
      </motion.div>
    )
  }

  if (variant === "wordmark") {
    return (
      <motion.div
        className={cn("font-orbitron font-bold nfl-title", sizeClasses[size], className)}
        initial={animated ? { opacity: 0, y: -20 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        PlayerLAB
      </motion.div>
    )
  }

  if (variant === "monogram") {
    return (
      <motion.div
        className={cn(
          "nfl-glass nfl-glow-blue p-4 rounded-lg w-12 h-12 flex items-center justify-center cursor-pointer",
          className,
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-orbitron font-bold neon-blue text-xl">P</span>
      </motion.div>
    )
  }

  return null
}
