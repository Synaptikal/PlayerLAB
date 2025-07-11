"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlowButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline" | "gradient"
  size?: "sm" | "md" | "lg"
  teamColor?: "blue" | "green" | "red" | "purple" | "cyan" | "magenta"
  onClick?: () => void
  disabled?: boolean
  pulse?: boolean
}

export function GlowButton({
  children,
  className,
  variant = "gradient",
  size = "md",
  teamColor = "cyan",
  onClick,
  disabled = false,
  pulse = false,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantClasses = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
    secondary: "backdrop-blur-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20",
    outline: "border-2 border-cyan-400 bg-transparent text-cyan-400 hover:bg-cyan-400/10",
    gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white",
  }

  const getTeamGlow = () => {
    switch (teamColor) {
      case "blue":
        return "shadow-glow-blue hover:shadow-glow-blue-intense"
      case "green":
        return "shadow-glow-green hover:shadow-glow-green-intense"
      case "red":
        return "shadow-glow-red hover:shadow-glow-red-intense"
      case "purple":
        return "shadow-glow-purple hover:shadow-glow-purple-intense"
      case "cyan":
        return "shadow-glow-cyan hover:shadow-glow-cyan-intense"
      case "magenta":
        return "shadow-glow-magenta hover:shadow-glow-magenta-intense"
      default:
        return "shadow-glow-cyan hover:shadow-glow-cyan-intense"
    }
  }

  return (
    <motion.button
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        getTeamGlow(),
        "relative font-medium transition-all duration-300 rounded-full overflow-hidden",
        pulse && "animate-pulse-glow",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Holographic shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
