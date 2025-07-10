"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { HolographicAnalyticsTile } from "@/components/ui/holographic-analytics-tile"
import { MobilePlayerCard } from "@/components/ui/mobile-player-card"
import { useAnalyticsStore } from "@/lib/store"
import { TrendingUp, TrendingDown, Trophy, AlertTriangle, Calendar, Filter, Activity, Zap } from "lucide-react"

const timeframeOptions = ["Week", "Season", "Custom"]

export default function AnalyticsPage() {
  const { overviewData, selectedTimeframe, setOverviewData, setSelectedTimeframe } = useAnalyticsStore()

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const mockData = {
        mostAdded: [
          { id: "1", name: "Josh Jacobs", team: "LV", position: "RB", trend: "up" as const },
          { id: "2", name: "Tua Tagovailoa", team: "MIA", position: "QB", trend: "up" as const },
          { id: "3", name: "DeVonta Smith", team: "PHI", position: "WR", trend: "up" as const },
        ],
        mostDropped: [
          { id: "4", name: "Leonard Fournette", team: "TB", position: "RB", trend: "down" as const },
          { id: "5", name: "Allen Robinson", team: "LAR", position: "WR", trend: "down" as const },
          { id: "6", name: "Matt Ryan", team: "IND", position: "QB", trend: "down" as const },
        ],
        topPoints: [
          { id: "7", name: "Josh Allen", team: "BUF", position: "QB", points: 28.4 },
          { id: "8", name: "Christian McCaffrey", team: "SF", position: "RB", points: 26.8 },
          { id: "9", name: "Tyreek Hill", team: "MIA", position: "WR", points: 24.2 },
        ],
        injuryWatch: [
          { id: "10", name: "Keenan Allen", team: "LAC", position: "WR", trend: "stable" as const },
          { id: "11", name: "Dalvin Cook", team: "MIN", position: "RB", trend: "stable" as const },
          { id: "12", name: "Mike Williams", team: "LAC", position: "WR", trend: "stable" as const },
        ],
      }
      setOverviewData(mockData)
    }

    fetchAnalyticsData()
  }, [setOverviewData])

  return (
    <div className="min-h-screen pt-20">
      {/* Header with Holographic Elements */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="holographic-projection w-16 h-16 mx-auto mb-6">
              <Activity className="w-8 h-8 neon-cyan" />
            </div>
            <h1 className="title-lg font-orbitron font-bold mb-4 neon-cyan">PLAYERLAB ANALYTICS</h1>
            <div className="flex items-center justify-center gap-2 text-compact text-purple-400 font-mono">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>&gt; REAL-TIME INSIGHTS FOR YOUR FANTASY EDGE</span>
            </div>
          </motion.div>

          {/* Holographic Filters */}
          <motion.div
            className="fantasy-panel p-6 mb-12"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 neon-cyan" />
                <span className="text-compact text-slate-400 font-orbitron">Timeframe:</span>
              </div>
              {timeframeOptions.map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => setSelectedTimeframe(option)}
                  className={`mobile-button text-micro ${selectedTimeframe === option ? "glow-cyan" : ""}`}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Holographic Analytics Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <HolographicAnalyticsTile
              title="MOST ADDED"
              icon={<TrendingUp className="w-5 h-5" />}
              delay={0.2}
              glowColor="green"
              holographicElement={true}
            >
              {overviewData?.mostAdded.slice(0, 3).map((player, index) => (
                <MobilePlayerCard key={player.id} player={player} delay={index * 0.1} variant="compact" />
              ))}
            </HolographicAnalyticsTile>

            <HolographicAnalyticsTile
              title="MOST DROPPED"
              icon={<TrendingDown className="w-5 h-5" />}
              delay={0.4}
              glowColor="red"
              holographicElement={true}
            >
              {overviewData?.mostDropped.slice(0, 3).map((player, index) => (
                <MobilePlayerCard key={player.id} player={player} delay={index * 0.1} variant="compact" />
              ))}
            </HolographicAnalyticsTile>

            <HolographicAnalyticsTile
              title="TOP POINTS"
              icon={<Trophy className="w-5 h-5" />}
              delay={0.6}
              glowColor="cyan"
              holographicElement={true}
            >
              {overviewData?.topPoints.slice(0, 3).map((player, index) => (
                <MobilePlayerCard key={player.id} player={player} showPoints delay={index * 0.1} variant="compact" />
              ))}
            </HolographicAnalyticsTile>

            <HolographicAnalyticsTile
              title="INJURY WATCH"
              icon={<AlertTriangle className="w-5 h-5" />}
              delay={0.8}
              glowColor="purple"
              holographicElement={true}
            >
              {overviewData?.injuryWatch.slice(0, 3).map((player, index) => (
                <MobilePlayerCard key={player.id} player={player} delay={index * 0.1} variant="compact" />
              ))}
            </HolographicAnalyticsTile>
          </div>
        </div>
      </section>

      {/* Interactive Charts Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="title-md font-orbitron font-bold text-center mb-12 neon-cyan"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            INTERACTIVE HOLOGRAPHIC CHARTS
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              className="fantasy-panel h-64 flex items-center justify-center group cursor-pointer"
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 2,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center">
                <div className="holographic-projection w-16 h-16 mx-auto mb-4">
                  <Filter className="w-8 h-8 neon-purple" />
                </div>
                <p className="text-compact text-slate-300 font-orbitron mb-2">Advanced Charts Coming Soon</p>
                <p className="text-micro text-slate-500">Line, Bar, and Holographic Visualizations</p>
              </div>
            </motion.div>

            <motion.div
              className="fantasy-panel h-64 flex items-center justify-center group cursor-pointer"
              initial={{ opacity: 0, x: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: -2,
                transition: { duration: 0.3 },
              }}
            >
              <div className="text-center">
                <div className="holographic-projection w-16 h-16 mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 neon-pink" />
                </div>
                <p className="text-compact text-slate-300 font-orbitron mb-2">Trend Analysis</p>
                <p className="text-micro text-slate-500">Player Performance Over Time</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
