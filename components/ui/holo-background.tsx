"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface HoloBackgroundProps {
  children: React.ReactNode
  showScanningBeam?: boolean
  showDataNodes?: boolean
  showCornerHUD?: boolean
  showDataStreams?: boolean
  showGradientOrbs?: boolean
  showGridLines?: boolean
}

export function HoloBackground({
  children,
  showScanningBeam = true,
  showDataNodes = true,
  showCornerHUD = true,
  showDataStreams = true,
  showGradientOrbs = true,
  showGridLines = true,
}: HoloBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* FIGMA SPEC HOLOGRAPHIC BACKGROUND ELEMENTS */}
      
      {/* Holographic Grid Lines */}
      {showGridLines && (
        <div className="holographic-grid-lines" />
      )}

      {/* Dynamic Gradient Orbs - Mouse following */}
      {showGradientOrbs && (
        <div className="dynamic-gradient-orbs">
          <motion.div
            className="gradient-orb"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <div className="gradient-orb" />
          <div className="gradient-orb" />
        </div>
      )}

      {/* Floating Data Nodes - 12 nodes with staggered delays */}
      {showDataNodes && (
        <div className="floating-data-nodes">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="data-node"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      {/* Data Stream Lines - 5 horizontal streams */}
      {showDataStreams && (
        <div className="data-stream-lines">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="data-stream-line" />
          ))}
        </div>
      )}

      {/* Corner HUD Elements - 96x96px with pulsing dots */}
      {showCornerHUD && (
        <>
          <div className="corner-hud top-left">
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
          </div>
          <div className="corner-hud bottom-right">
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
            <div className="pulsing-dot" />
          </div>
        </>
      )}

      {/* Scanning Beam Effect */}
      {showScanningBeam && (
        <motion.div
          className="scanning-beam"
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Holographic Container Component
export function HoloContainer({ children }: { children: React.ReactNode }) {
  return (
    <HoloBackground>
      <div className="container-responsive section-responsive">
        {children}
      </div>
    </HoloBackground>
  )
}

// Holographic Card Component with FIGMA spec styling
export function HoloCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`glass-effect hover:shadow-glow-cyan ${className}`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

// Holographic Button Component with FIGMA spec styling
export function HoloButton({ 
  children, 
  className = "", 
  variant = "primary" 
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: "primary" | "secondary" | "glow";
}) {
  const baseClasses = "px-6 py-3 rounded-lg font-orbitron font-medium transition-all duration-300"
  
  const variantClasses = {
    primary: "bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-glow-cyan",
    secondary: "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    glow: "bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/30 hover:shadow-glow-cyan"
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}

// Holographic Text Components with FIGMA spec typography
export function HoloH1({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h1 className={`text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white ${className}`}>
      {children}
    </h1>
  )
}

export function HoloH2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-white ${className}`}>
      {children}
    </h2>
  )
}

export function HoloH3({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-3xl md:text-4xl lg:text-5xl font-orbitron font-semibold text-white ${className}`}>
      {children}
    </h3>
  )
}

export function HoloBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base font-inter leading-relaxed text-slate-300 ${className}`}>
      {children}
    </p>
  )
}

export function HoloCaption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-xs font-audiowide leading-tight text-cyan-400 ${className}`}>
      {children}
    </span>
  )
}

export function HoloMicro({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`text-[10px] font-audiowide leading-tight text-slate-400 ${className}`}>
      {children}
    </span>
  )
}
