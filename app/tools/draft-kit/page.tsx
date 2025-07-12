"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingDown, Star, Target, Users, Zap } from 'lucide-react';import { useState } from "react"

// Mock data for demonstration
const draftRankings = [
  {
    id: 1,
    name: "Christian McCaffrey",
    team: "SF",
    position: "RB",
    rank: 1,
    tier: "Tier 1",
    adp: 1.2,
    value: "Elite",
    notes: "RB1, high volume, great schedule"
  },
  {
    id: 2,
    name: "Tyreek Hill",
    team: "MIA",
    position: "WR",
    rank: 2,
    tier: "Tier 1",
    adp: 2.1,
    value: "Elite",
    notes: "Speed demon, consistent production"
  },
  {
    id: 3,
    name: "Travis Kelce",
    team: "KC",
    position: "TE",
    rank: 3,
    tier: "Tier 1",
    adp: 3.5,
    value: "Elite",
    notes: "TE1, Mahomes connection"
  }
]

const aiRecommendations = [
  {
    type: "Best Available",
    player: "Saquon Barkley",
    reason: "High upside, favorable schedule",
    confidence: 95
  },
  {
    type: "Value Pick",
    player: "Deebo Samuel",
    reason: "Undervalued at current ADP",
    confidence: 88
  },
  {
    type: "Avoid",
    player: "Aaron Rodgers",
    reason: "Age concerns, new system",
    confidence: 92
  }
]

export default function DraftKitPage() {
  const [selectedPosition, setSelectedPosition] = useState("all")
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
            Draft Kit
          </h1>
          <p className="text-slate-300 text-lg">
            AI-powered draft recommendations and rankings to dominate your league
          </p>
        </motion.div>

        {/* AI Recommendations */}
        <motion.section
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            AI Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {rec.type === "Best Available" && <Star className="w-5 h-5 text-yellow-400" />}
                      {rec.type === "Value Pick" && <Target className="w-5 h-5 text-green-400" />}
                      {rec.type === "Avoid" && <TrendingDown className="w-5 h-5 text-red-400" />}
                      <span className="text-sm font-orbitron text-cyan-400 uppercase tracking-wide">
                        {rec.type}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">{rec.confidence}%</span>
                  </div>
                  <h3 className="text-lg font-orbitron font-semibold text-white mb-2">
                    {rec.player}
                  </h3>
                  <p className="text-sm text-slate-300">{rec.reason}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Search and Filters */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
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
            <div className="flex gap-4">
              <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                <SelectTrigger className="w-32 backdrop-blur-xl bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Position" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="qb">QB</SelectItem>
                  <SelectItem value="rb">RB</SelectItem>
                  <SelectItem value="wr">WR</SelectItem>
                  <SelectItem value="te">TE</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
              >
                <Users className="w-4 h-4 mr-2" />
                My Team
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Draft Rankings */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6">Draft Rankings</h2>
          <div className="space-y-4">
            {draftRankings.map((player, index) => (
              <motion.div
                key={player.id}
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-orbitron font-bold text-cyan-400 w-8">
                          {player.rank}
                        </span>
                        <div>
                          <h3 className="text-lg font-orbitron font-semibold text-white">
                            {player.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-slate-400">{player.team}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-400">{player.position}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-purple-400">{player.tier}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-slate-400">ADP</div>
                        <div className="text-lg font-orbitron font-semibold text-white">
                          {player.adp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Value</div>
                        <div className="text-lg font-orbitron font-semibold text-green-400">
                          {player.value}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                      >
                        Draft
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
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
