"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface VaultButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
}

export function VaultButton({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
}: VaultButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const variantClasses = {
    primary: "vault-button",
    secondary: "vault-button bg-opacity-50",
    outline: "vault-button bg-transparent border-2",
  }

  return (
    <motion.button
      className={cn(variantClasses[variant], sizeClasses[size], disabled && "opacity-50 cursor-not-allowed", className)}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  )
}
