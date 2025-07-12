"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GlowButton } from "@/components/ui/glow-button"
import { GlassContainer } from "@/components/ui/glass-container"
import { HolographicBackground } from "@/components/ui/holographic-background"
import { PlayerCard } from "@/components/ui/player-card"
import { HolographicAnalyticsTile } from "@/components/ui/holographic-analytics-tile"
import { MobilePlayerCard } from "@/components/ui/mobile-player-card"
import { 
  Activity, 
  TrendingUp, 
  Trophy, 
  Search,
  Settings,
  User
} from "lucide-react";

export default function UIShowcase() {
  const [activeTab, setActiveTab] = useState("buttons")

  const mockPlayer = {
    id: "1",
    name: "Josh Allen",
    team: "BUF",
    position: "QB",
    points: 28.4,
    trend: "up" as const,
  }

  const mockAnalyticsData = {
    mostAdded: [
      { id: "1", name: "Josh Jacobs", team: "LV", position: "RB", trend: "up" as const },
      { id: "2", name: "Tua Tagovailoa", team: "MIA", position: "QB", trend: "up" as const },
    ],
    mostDropped: [
      { id: "3", name: "Leonard Fournette", team: "TB", position: "RB", trend: "down" as const },
    ],
    topPoints: [
      { id: "4", name: "Christian McCaffrey", team: "SF", position: "RB", points: 26.8 },
    ],
    injuryWatch: [
      { id: "5", name: "Keenan Allen", team: "LAC", position: "WR", trend: "stable" as const },
    ],
  }

  return (
    <div className="min-h-screen bg-deep-black text-white">
      {/* Holographic Background */}
      <HolographicBackground />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-8">
        <div className="container mx-auto px-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            PlayerLAB UI Kit
          </motion.h1>
          <p className="text-center text-text-secondary font-inter">
            Design System Components & Variants
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 container mx-auto px-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {["buttons", "cards", "inputs", "navigation", "analytics", "players"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-orbitron text-sm transition-all ${
                activeTab === tab
                  ? "bg-neon-cyan text-deep-black shadow-glow"
                  : "bg-glass-light text-text-secondary hover:bg-glass-dark"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-20">
        {activeTab === "buttons" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Button Variants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron">Primary Buttons</h3>
                  <div className="space-y-2">
                    <Button size="sm">Small Primary</Button>
                    <Button>Default Primary</Button>
                    <Button size="lg">Large Primary</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron">Glow Buttons</h3>
                  <div className="space-y-2">
                    <GlowButton size="sm" teamColor="cyan">Small Glow</GlowButton>
                    <GlowButton teamColor="blue">Default Glow</GlowButton>
                    <GlowButton size="lg" teamColor="green">Large Glow</GlowButton>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron">Icon Buttons</h3>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline">
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "cards" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Card Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-container">
                  <h3 className="text-lg font-orbitron font-bold mb-2">Glass Card</h3>
                  <p className="text-text-secondary">A glassmorphic card with backdrop blur effects.</p>
                </Card>

                <GlassContainer className="p-6">
                  <h3 className="text-lg font-orbitron font-bold mb-2">Glass Container</h3>
                  <p className="text-text-secondary">Container with enhanced glassmorphism styling.</p>
                </GlassContainer>

                <Card className="neon-panel">
                  <h3 className="text-lg font-orbitron font-bold mb-2">Neon Panel</h3>
                  <p className="text-text-secondary">Card with neon glow effects and borders.</p>
                </Card>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "inputs" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Input Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron">Text Inputs</h3>
                  <div className="space-y-2">
                    <Input placeholder="Default input" />
                    <Input placeholder="Search..." className="glass-input" />
                    <Input placeholder="With icon" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-orbitron">Input States</h3>
                  <div className="space-y-2">
                    <Input placeholder="Focused state" className="focus:shadow-glow" />
                    <Input placeholder="Error state" className="border-neon-red shadow-glow-red" />
                    <Input placeholder="Success state" className="border-neon-green shadow-glow-green" />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "navigation" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Navigation Components</h2>
              <div className="space-y-6">
                <div className="glass-container p-4">
                  <h3 className="text-lg font-orbitron font-bold mb-4">Top Navigation</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-neon-cyan font-orbitron">PlayerLAB</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">Analytics</Button>
                      <Button variant="ghost" size="sm">News</Button>
                      <Button variant="ghost" size="sm">Tools</Button>
                    </div>
                  </div>
                </div>

                <div className="glass-container p-4">
                  <h3 className="text-lg font-orbitron font-bold mb-4">Bottom Navigation (Mobile)</h3>
                  <div className="flex items-center justify-around">
                    <Button variant="ghost" size="sm">
                      <Activity className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <TrendingUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trophy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Analytics Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HolographicAnalyticsTile
                  title="MOST ADDED"
                  icon={<TrendingUp className="w-5 h-5" />}
                  delay={0.2}
                  glowColor="green"
                  holographicElement={true}
                >
                  {mockAnalyticsData.mostAdded.map((player, index) => (
                    <MobilePlayerCard key={player.id} player={player} delay={index * 0.1} variant="compact" />
                  ))}
                </HolographicAnalyticsTile>

                <HolographicAnalyticsTile
                  title="TOP POINTS"
                  icon={<Trophy className="w-5 h-5" />}
                  delay={0.4}
                  glowColor="cyan"
                  holographicElement={true}
                >
                  {mockAnalyticsData.topPoints.map((player, index) => (
                    <MobilePlayerCard key={player.id} player={player} showPoints delay={index * 0.1} variant="compact" />
                  ))}
                </HolographicAnalyticsTile>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "players" && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <section>
              <h2 className="text-2xl font-orbitron font-bold mb-6 text-neon-cyan">Player Card Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PlayerCard player={mockPlayer} />
                <MobilePlayerCard player={mockPlayer} variant="compact" />
                <div className="glass-container p-4">
                  <h3 className="text-lg font-orbitron font-bold mb-2">Card Variants</h3>
                  <div className="space-y-2">
                    <MobilePlayerCard player={mockPlayer} variant="compact" />
                    <MobilePlayerCard player={mockPlayer} variant="detailed" />
                    <MobilePlayerCard player={mockPlayer} showPoints />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </div>
  )
} 