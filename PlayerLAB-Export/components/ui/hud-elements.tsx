"use client"

import { motion } from "framer-motion"
import { Activity, Zap, Target } from "lucide-react"

interface HUDElementProps {
  type: "scanner" | "data-node" | "status-indicator" | "targeting-reticle"
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  animated?: boolean
  size?: "sm" | "md" | "lg"
}

export function HUDElement({ type, position, animated = true, size = "md" }: HUDElementProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  }

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  if (type === "scanner") {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none`}
        initial={animated ? { opacity: 0, scale: 0 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/60 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute inset-2 border border-cyan-400/40 rounded-full"
            animate={{
              rotate: [360, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (type === "data-node") {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} pointer-events-none`}
        initial={animated ? { opacity: 0, y: 20 } : {}}
        animate={animated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative">
          <motion.div
            className="w-3 h-3 bg-cyan-400/80 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 border border-cyan-400/40 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    )
  }

  if (type === "status-indicator") {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} flex items-center gap-2 pointer-events-none`}
        initial={animated ? { opacity: 0, x: -20 } : {}}
        animate={animated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Zap className="w-4 h-4 text-cyan-400" />
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-cyan-400/60 rounded-full"
              animate={{
                scaleY: [0.3, 1, 0.3],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    )
  }

  if (type === "targeting-reticle") {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none`}
        initial={animated ? { opacity: 0, scale: 2 } : {}}
        animate={animated ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/60"
            style={{
              clipPath: "polygon(0 0, 30% 0, 30% 2px, 2px 2px, 2px 30%, 0 30%)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/60"
            style={{
              clipPath: "polygon(70% 0, 100% 0, 100% 30%, calc(100% - 2px) 30%, calc(100% - 2px) 2px, 70% 2px)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/60"
            style={{
              clipPath: "polygon(0 70%, 0 100%, 30% 100%, 30% calc(100% - 2px), 2px calc(100% - 2px), 2px 70%)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute inset-0 border-2 border-cyan-400/60"
            style={{
              clipPath:
                "polygon(70% calc(100% - 2px), 70% 100%, 100% 100%, 100% 70%, calc(100% - 2px) 70%, calc(100% - 2px) calc(100% - 2px))",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Target className="w-6 h-6 text-cyan-400/80" />
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}

export function HUDOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <HUDElement type="scanner" position="top-left" size="md" />
      <HUDElement type="data-node" position="top-right" />
      <HUDElement type="status-indicator" position="bottom-left" />
      <HUDElement type="targeting-reticle" position="bottom-right" size="lg" />

      {/* Central Data Stream */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
