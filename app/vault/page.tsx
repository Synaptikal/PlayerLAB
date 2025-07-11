"use client"

import { motion } from "framer-motion"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { GlassContainer } from "@/components/ui/glass-container"
import { PlayerCard } from "@/components/ui/player-card"
import { MobilePlayerCard } from "@/components/ui/mobile-player-card"
import { GlowButton } from "@/components/ui/glow-button"
import { Search, Filter, Star, TrendingUp, Shield } from "lucide-react"

const mockVaultPlayers = [
  {
    id: "1",
    name: "Josh Allen",
    team: "BUF",
    position: "QB",
    points: 28.4,
    trend: "up" as const,
    status: "active",
    notes: "Elite QB, consistent performer",
  },
  {
    id: "2",
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    points: 26.8,
    trend: "up" as const,
    status: "active",
    notes: "RB1, high volume",
  },
  {
    id: "3",
    name: "Tyreek Hill",
    team: "MIA",
    position: "WR",
    points: 24.2,
    trend: "stable" as const,
    status: "active",
    notes: "Speed demon, big play potential",
  },
  {
    id: "4",
    name: "Travis Kelce",
    team: "KC",
    position: "TE",
    points: 22.6,
    trend: "down" as const,
    status: "watch",
    notes: "Age concerns, monitor closely",
  },
]

export default function VaultPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Holographic Background */}
      <HolographicBackground />

      {/* Header */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="holographic-projection w-16 h-16 mx-auto mb-6">
              <Shield className="w-8 h-8 neon-cyan" />
            </div>
            <h1 className="title-lg font-orbitron font-bold mb-4 neon-cyan">PLAYER VAULT</h1>
            <div className="flex items-center justify-center gap-2 text-compact text-purple-400 font-mono">
              <Star className="w-4 h-4 animate-pulse" />
              <span>&gt; YOUR ELITE PLAYER COLLECTION</span>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="fantasy-panel p-6 mb-8"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-medium-grey" />
                <input
                  type="text"
                  placeholder="Search vault players..."
                  className="glass-tile pl-10 pr-4 py-2 w-full text-compact bg-transparent border-0 focus:glow-blue text-primary-dark placeholder-medium-grey"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 neon-cyan" />
                <select className="glass-tile px-3 py-2 text-compact bg-transparent border-0 focus:glow-blue text-primary-dark">
                  <option>All Positions</option>
                  <option>QB</option>
                  <option>RB</option>
                  <option>WR</option>
                  <option>TE</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vault Players Grid */}
      <section className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVaultPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <GlassContainer className="p-6 group cursor-pointer hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        player.status === 'active' ? 'bg-neon-green' : 'bg-neon-yellow'
                      }`} />
                      <span className="text-micro font-orbitron text-neon-cyan uppercase tracking-wide">
                        {player.status}
                      </span>
                    </div>
                    <Star className="w-4 h-4 text-neon-yellow" />
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="title-sm font-orbitron font-bold text-primary-dark mb-1">
                      {player.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-micro">
                      <span className="text-neon-cyan font-orbitron">{player.team}</span>
                      <span className="text-text-secondary">•</span>
                      <span className="text-text-secondary">{player.position}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-micro text-text-secondary">Points</span>
                      <span className="text-compact font-orbitron text-neon-green">
                        {player.points}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-micro text-text-secondary">Trend</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${
                          player.trend === 'up' ? 'text-neon-green' : 
                          player.trend === 'down' ? 'text-neon-red' : 'text-neon-cyan'
                        }`} />
                        <span className="text-micro font-orbitron text-neon-cyan uppercase">
                          {player.trend}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <p className="text-micro text-text-secondary leading-relaxed">
                      {player.notes}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                    <GlowButton size="sm" teamColor="cyan">
                      View Details
                    </GlowButton>
                    <button className="text-micro text-neon-red hover:text-neon-red/80 transition-colors">
                      Remove
                    </button>
                  </div>
                </GlassContainer>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Player CTA */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="fantasy-panel p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Star className="w-12 h-12 mx-auto mb-4 neon-yellow" />
            <h2 className="title-md font-orbitron font-bold mb-4 neon-cyan">ADD TO VAULT</h2>
            <p className="text-compact text-text-secondary mb-6 max-w-2xl mx-auto">
              Build your elite player collection. Add players to your vault for quick access and detailed tracking.
            </p>
            <GlowButton size="lg" teamColor="cyan">
              Browse Players
            </GlowButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 