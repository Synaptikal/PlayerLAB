"use client"

import { motion } from "framer-motion"
import { Suspense } from "react"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { HUDOverlay } from "@/components/ui/hud-elements"
import { FlaskLogo } from "@/components/ui/flask-logo"
import { NewsTile } from "@/components/tiles/news-tile"
import { HighlightsTile } from "@/components/tiles/highlights-tile"
import { TrendsTile } from "@/components/tiles/trends-tile"
import { TopAnalysisTile } from "@/components/tiles/top-analysis-tile"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Holographic Background */}
      <HolographicBackground />

      {/* HUD Overlay */}
      <HUDOverlay />

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-32">
        {/* Hero Section */}
        <motion.section
          className="text-center py-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <FlaskLogo size="lg" animated />
            </motion.div>

            {/* Hero Text */}
            <motion.h1
              className="font-orbitron font-bold text-5xl md:text-7xl mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              PlayerLAB
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-slate-300 mb-8 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Advanced Fantasy Sports Analytics Platform
            </motion.p>

            <motion.div
              className="text-sm font-orbitron text-cyan-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Real-time Player Intelligence • Holographic Interface • AI-Powered Insights
            </motion.div>
          </div>
        </motion.section>

        {/* Today in PlayerLAB Section */}
        <section className="px-4 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">Today in PlayerLAB</h2>
            <p className="text-slate-400 font-inter">
              Real-time insights and trending analysis powered by live Sleeper API data
            </p>
          </motion.div>

          {/* Responsive Tile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* News Tile */}
            <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-3xl h-96" />}>
              <NewsTile delay={0.2} />
            </Suspense>

            {/* Highlights Tile */}
            <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-3xl h-96" />}>
              <HighlightsTile delay={0.4} />
            </Suspense>

            {/* Trends Tile - NOW WITH REAL SLEEPER API DATA */}
            <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-3xl h-96" />}>
              <TrendsTile delay={0.6} />
            </Suspense>

            {/* Top Trending Analysis Tile - NOW WITH REAL SLEEPER API DATA */}
            <Suspense fallback={<div className="animate-pulse bg-slate-800 rounded-3xl h-96" />}>
              <TopAnalysisTile delay={0.8} />
            </Suspense>
          </div>
        </section>

        {/* Live Data Status */}
        <motion.div
          className="fixed bottom-32 left-4 right-4 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="max-w-md mx-auto backdrop-blur-xl bg-slate-900/80 rounded-2xl border border-cyan-400/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-orbitron text-green-400 uppercase tracking-wide">Live Sleeper API</span>
              </div>
              <div className="text-xs font-mono text-slate-400">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
