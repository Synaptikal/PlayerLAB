"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HolographicBackground } from "@/components/ui/holographic-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Holographic Background */}
      <HolographicBackground />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Content Area */}
        <div className="pt-32 pb-16 px-6">
          {/* Hero Section */}
          <motion.section
            className="text-center max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h2 
              className="text-5xl md:text-7xl font-orbitron font-bold mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Own the Draft. Win the League.
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-8 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              AI-powered fantasy insights at your fingertips. Smarter trades. Better picks. Total domination.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button className="text-lg px-8 py-4 rounded-xl backdrop-blur-xl bg-white/10 border border-cyan-400/50 hover:bg-cyan-400/20 hover:border-cyan-400 hover:shadow-glow-cyan transition-all duration-300 hover:scale-105">
                Launch Tools
              </Button>
            </motion.div>
          </motion.section>

          {/* Feature Tiles - HUD Grid */}
          <motion.section 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {/* Draft Kit Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 h-full transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 mr-3 animate-pulse"></div>
                  <h3 className="text-xl font-orbitron font-semibold text-white">Draft Kit</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Get instant recommendations and top picks based on your live roster. AI-powered insights for every draft decision.
                </p>
              </Card>
            </motion.div>

            {/* Trade Analyzer Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple rounded-2xl p-6 h-full transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-3 animate-pulse"></div>
                  <h3 className="text-xl font-orbitron font-semibold text-white">Trade Analyzer</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  AI breakdowns of trade fairness, value shifts, and win probability. Make informed decisions with confidence.
                </p>
              </Card>
            </motion.div>

            {/* Vault Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-green-400/30 hover:border-green-400/60 hover:shadow-glow-green rounded-2xl p-6 h-full transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3 animate-pulse"></div>
                  <h3 className="text-xl font-orbitron font-semibold text-white">Vault</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Track your saved players, favorites, and custom watchlists in one place. Your personal player database.
                </p>
              </Card>
            </motion.div>
          </motion.section>

          {/* Live Status Indicator */}
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="backdrop-blur-xl bg-slate-900/80 rounded-2xl border border-cyan-400/30 p-4">
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
                <div className="text-xs font-mono text-slate-400">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
