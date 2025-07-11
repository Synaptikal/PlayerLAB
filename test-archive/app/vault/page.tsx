"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Star, Filter, Grid, List } from "lucide-react"
import { useState } from "react"

// Mock data for demonstration
const savedPlayers = [
  {
    id: 1,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    status: "Active",
    value: "High",
    notes: "Elite RB1, great ROS schedule"
  },
  {
    id: 2,
    name: "Tyreek Hill",
    team: "MIA",
    position: "WR",
    status: "Active",
    value: "High",
    notes: "Speed demon, consistent production"
  },
  {
    id: 3,
    name: "Travis Kelce",
    team: "KC",
    position: "TE",
    status: "Active",
    value: "High",
    notes: "TE1, Mahomes connection"
  }
]

const watchlists = [
  {
    id: 1,
    name: "Trade Targets",
    count: 12,
    color: "cyan"
  },
  {
    id: 2,
    name: "Waiver Wire",
    count: 8,
    color: "green"
  },
  {
    id: 3,
    name: "Draft Prospects",
    count: 15,
    color: "purple"
  }
]

export default function VaultPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 pt-32 pb-16 px-6">
        {/* Header */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            Player Vault
          </h1>
          <p className="text-slate-300 text-lg">
            Manage your saved players, watchlists, and player notes
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Player
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Watchlists Section */}
        <motion.section
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6">Watchlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {watchlists.map((list, index) => (
              <motion.div
                key={list.id}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 cursor-pointer transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-orbitron font-semibold text-white">{list.name}</h3>
                    <span className="text-sm text-slate-400">{list.count} players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${list.color}-400`}></div>
                    <span className="text-sm text-slate-300">Active watchlist</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Saved Players Section */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6">Saved Players</h2>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {savedPlayers.map((player, index) => (
              <motion.div
                key={player.id}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-orbitron font-semibold text-white">{player.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-400">{player.team}</span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-slate-400">{player.position}</span>
                        <span className="text-sm text-slate-400">•</span>
                        <span className="text-sm text-green-400">{player.status}</span>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Value:</span>
                      <span className="text-sm text-cyan-400 font-semibold">{player.value}</span>
                    </div>
                    <p className="text-sm text-slate-300">{player.notes}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
} 