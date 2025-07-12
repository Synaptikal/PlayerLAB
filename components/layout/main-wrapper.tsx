"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface MainWrapperProps {
  children: ReactNode
  className?: string
}

export default function MainWrapper({ children, className = "" }: MainWrapperProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Consistent Holographic Background for All Pages */}
      <div className="absolute inset-0">
        {/* Base Holographic Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Dynamic Gradient Orbs */}
        <div className="dynamic-gradient-orbs">
          <div className="gradient-orb"></div>
          <div className="gradient-orb"></div>
          <div className="gradient-orb"></div>
        </div>
        
        {/* Floating Data Nodes */}
        <div className="floating-data-nodes">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="data-node"></div>
          ))}
        </div>
        
        {/* Data Stream Lines */}
        <div className="data-stream-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="data-stream-line"></div>
          ))}
        </div>
        
        {/* Corner HUD Elements */}
        <div className="corner-hud top-left">
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
        </div>
        <div className="corner-hud bottom-right">
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
          <div className="pulsing-dot"></div>
        </div>
        
        {/* Scanning Beam */}
        <div className="scanning-beam"></div>
        
        {/* Holographic Grid Lines */}
        <div className="holographic-grid-lines"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        className={`relative z-10 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
