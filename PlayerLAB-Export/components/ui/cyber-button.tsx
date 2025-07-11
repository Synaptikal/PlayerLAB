"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CyberButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
}

export function CyberButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: CyberButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantClasses = {
    primary: "cyber-button",
    secondary: "cyber-button secondary",
    outline: "cyber-button border-2 bg-transparent",
  }

  return (
    <motion.button
      className={cn(variantClasses[variant], sizeClasses[size], disabled && "opacity-50 cursor-not-allowed", className)}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  )
}
