"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlaskLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
  showBubbles?: boolean
}

export function FlaskLogo({ size = "md", animated = true, className, showBubbles = true }: FlaskLogoProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  }

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", sizeClasses[size], className)}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, type: "spring" }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Modern Sleek Flask */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))",
        }}
      >
        <defs>
          {/* Ultra-smooth gradients */}
          <linearGradient id="flaskBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <radialGradient id="glassShine" cx="30%" cy="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Flask body - completely smooth curves */}
        <path
          d="M35 25 C35 23 35 23 35 23 L35 35 C35 37 34 39 32 41 L20 65 C18 68 18 72 20 75 C21 76 22 77 24 77 L76 77 C78 77 79 76 80 75 C82 72 82 68 80 65 L68 41 C66 39 65 37 65 35 L65 23 C65 23 65 23 65 25 Z"
          fill="url(#flaskBody)"
          stroke="none"
        />

        {/* Flask neck - sleek and modern */}
        <rect x="40" y="15" width="20" height="12" rx="3" ry="3" fill="url(#flaskBody)" stroke="none" />

        {/* Flask opening */}
        <ellipse cx="50" cy="15" rx="10" ry="2" fill="#1e293b" stroke="none" />

        {/* Liquid - smooth and flowing */}
        <path
          d="M25 60 C25 62 25 64 27 66 C28 67 29 67 30 67 L70 67 C71 67 72 67 73 66 C75 64 75 62 75 60 L70 45 C69 44 68 44 67 44 L33 44 C32 44 31 44 30 45 Z"
          fill="url(#liquidGrad)"
        />

        {/* Liquid surface */}
        <motion.ellipse
          cx="50"
          cy="45"
          rx="18"
          ry="1.5"
          fill="#06b6d4"
          animate={{
            ry: [1.5, 2.5, 1.5],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Glass shine effect */}
        <ellipse cx="42" cy="35" rx="8" ry="15" fill="url(#glassShine)" />
      </svg>

      {/* Floating bubbles */}
      {showBubbles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${45 + i * 3}%`,
                top: `${60 - i * 5}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
