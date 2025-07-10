"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function HolographicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating Data Nodes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 border border-cyan-400/30 rounded-full"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + i * 6}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          <div className="absolute inset-0.5 bg-cyan-400/20 rounded-full animate-pulse" />
        </motion.div>
      ))}

      {/* Holographic Grid Lines */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(14, 165, 233, 0.5)" strokeWidth="1" />
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(14, 165, 233, 0.3)" />
              <stop offset="50%" stopColor="rgba(6, 182, 212, 0.2)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#gridGradient)" />
        </svg>
      </div>

      {/* Scanning Beam */}
      <motion.div
        className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
        animate={{
          x: ["-100vw", "100vw"],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Corner HUD Elements */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-cyan-400/30">
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400/60 rounded-full animate-pulse" />
      </div>
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-cyan-400/30">
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-cyan-400/60 rounded-full animate-pulse" />
      </div>

      {/* Data Stream Lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          style={{
            top: `${20 + i * 15}%`,
            left: "0%",
            right: "0%",
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
