"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, TrendingDown, Scale, Zap, Users, ArrowRight, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"

// Mock data for demonstration
const tradeAnalysis = {
  fairness: 85,
  winner: "Team A",
  confidence: 92,
  reasoning: "Team A gains significant value with McCaffrey while Team B receives multiple high-upside players",
  details: [
    { metric: "Value Gain", teamA: "+15%", teamB: "-8%", winner: "A" },
    { metric: "Risk Level", teamA: "Low", teamB: "Medium", winner: "A" },
    { metric: "Roster Balance", teamA: "Improved", teamB: "Maintained", winner: "A" }
  ]
}

const recentTrades = [
  {
    id: 1,
    teamA: "McCaffrey + Hill",
    teamB: "Barkley + Adams + 2nd",
    result: "Fair",
    date: "2024-01-15"
  },
  {
    id: 2,
    teamA: "Kelce + 1st",
    teamB: "Andrews + 3rd",
    result: "Team A Wins",
    date: "2024-01-14"
  }
]

export default function TradeAnalyzerPage() {
  const [teamAPlayers, setTeamAPlayers] = useState("")
  const [teamBPlayers, setTeamBPlayers] = useState("")
  const [leagueType, setLeagueType] = useState("ppr")

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
            Trade Analyzer
          </h1>
          <p className="text-slate-300 text-lg">
            AI-powered trade evaluation and analysis to make informed decisions
          </p>
        </motion.div>

        {/* Trade Input Form */}
        <motion.section
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-8">
            <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
              <Scale className="w-6 h-6 text-cyan-400" />
              Analyze Trade
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team A */}
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white mb-4">Team A</h3>
                <Textarea
                  placeholder="Enter players from Team A (e.g., Christian McCaffrey, Tyreek Hill)"
                  value={teamAPlayers}
                  onChange={(e) => setTeamAPlayers(e.target.value)}
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-32"
                />
              </div>

              {/* Team B */}
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white mb-4">Team B</h3>
                <Textarea
                  placeholder="Enter players from Team B (e.g., Saquon Barkley, Davante Adams)"
                  value={teamBPlayers}
                  onChange={(e) => setTeamBPlayers(e.target.value)}
                  className="backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400 min-h-32"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Select value={leagueType} onValueChange={setLeagueType}>
                <SelectTrigger className="w-32 backdrop-blur-xl bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="League Type" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                  <SelectItem value="ppr">PPR</SelectItem>
                  <SelectItem value="half-ppr">Half PPR</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
              >
                <Zap className="w-4 h-4 mr-2" />
                Analyze Trade
              </Button>
            </div>
          </Card>
        </motion.section>

        {/* Trade Analysis Results */}
        <motion.section
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6">Analysis Results</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Fairness Score */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 text-center">
                <Scale className="w-8 h-8 mx-auto mb-4 text-cyan-400" />
                <h3 className="text-lg font-orbitron font-semibold text-white mb-2">Fairness Score</h3>
                <div className="text-3xl font-orbitron font-bold text-cyan-400 mb-2">
                  {tradeAnalysis.fairness}%
                </div>
                <p className="text-sm text-slate-300">Trade is {tradeAnalysis.fairness >= 80 ? "Fair" : "Unfair"}</p>
              </Card>
            </motion.div>

            {/* Winner */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-green-400/30 hover:border-green-400/60 hover:shadow-glow-green rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-4 text-green-400" />
                <h3 className="text-lg font-orbitron font-semibold text-white mb-2">Winner</h3>
                <div className="text-xl font-orbitron font-bold text-green-400 mb-2">
                  {tradeAnalysis.winner}
                </div>
                <p className="text-sm text-slate-300">Clear advantage</p>
              </Card>
            </motion.div>

            {/* Confidence */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple rounded-2xl p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-4 text-purple-400" />
                <h3 className="text-lg font-orbitron font-semibold text-white mb-2">Confidence</h3>
                <div className="text-3xl font-orbitron font-bold text-purple-400 mb-2">
                  {tradeAnalysis.confidence}%
                </div>
                <p className="text-sm text-slate-300">AI confidence level</p>
              </Card>
            </motion.div>
          </div>

          {/* Detailed Analysis */}
          <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-orbitron font-semibold text-white mb-4">Detailed Analysis</h3>
            <p className="text-slate-300 mb-6">{tradeAnalysis.reasoning}</p>
            
            <div className="space-y-4">
              {tradeAnalysis.details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <span className="text-sm text-slate-400">{detail.metric}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white">{detail.teamA}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-white">{detail.teamB}</span>
                    <div className="flex items-center gap-1">
                      {detail.winner === "A" ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Recent Trades */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            Recent Trades
          </h2>
          <div className="space-y-4">
            {recentTrades.map((trade, index) => (
              <motion.div
                key={trade.id}
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <h3 className="text-lg font-orbitron font-semibold text-white">Team A</h3>
                        <p className="text-sm text-slate-300">{trade.teamA}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-slate-400" />
                      <div>
                        <h3 className="text-lg font-orbitron font-semibold text-white">Team B</h3>
                        <p className="text-sm text-slate-300">{trade.teamB}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${
                        trade.result === "Fair" ? "text-green-400" : 
                        trade.result === "Team A Wins" ? "text-cyan-400" : "text-red-400"
                      }`}>
                        {trade.result}
                      </div>
                      <div className="text-xs text-slate-400">{trade.date}</div>
                    </div>
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
