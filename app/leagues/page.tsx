"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Users, 
  Trophy, 
  Calendar,
  ArrowRight,
  Plus,
  Settings,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { sleeperAPI } from "@/lib/sleeper-api"

interface League {
  league_id: string
  name: string
  season: string
  status: string
  total_rosters: number
  sport: string
  settings: {
    name: string
    season: string
    status: string
    total_rosters: number
    sport: string
    season_type: string
    league_id: string
  }
}

export default function LeaguesPage() {
  const [leagueId, setLeagueId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [league, setLeague] = useState<League | null>(null)
  const [error, setError] = useState("")

  const handleConnectLeague = async () => {
    if (!leagueId.trim()) {
      setError("Please enter a league ID")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const leagueData = await sleeperAPI.getLeague(leagueId)
      if (leagueData) {
        setLeague(leagueData)
      } else {
        setError("League not found. Please check the league ID.")
      }
    } catch (err) {
      setError("Failed to connect to league. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-orbitron font-bold text-white mb-4">
            Connect Your League
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Connect to your Sleeper fantasy football league to access real-time data, 
            roster management, and advanced analytics.
          </p>
        </motion.div>

        {/* League Connection Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-8"
        >
          <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Sleeper League ID
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter league ID..."
                    value={leagueId}
                    onChange={(e) => setLeagueId(e.target.value)}
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
                  />
                  <Button
                    onClick={handleConnectLeague}
                    disabled={isLoading}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white"
                  >
                    {isLoading ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Connected League Display */}
        {league && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-orbitron font-bold text-white">
                    {league.name}
                  </h2>
                  <p className="text-slate-400">Season {league.season}</p>
                </div>
                <Badge 
                  variant={league.status === "in_season" ? "default" : "secondary"}
                  className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30"
                >
                  {league.status === "in_season" ? "Active" : "Off Season"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-orbitron font-bold text-white">
                    {league.total_rosters}
                  </div>
                  <div className="text-sm text-slate-400">Teams</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-orbitron font-bold text-white">
                    {league.sport.toUpperCase()}
                  </div>
                  <div className="text-sm text-slate-400">Sport</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  View League
                </Button>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-orbitron font-bold text-white text-center mb-8">
            League Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Roster Management</h4>
              <p className="text-slate-400 text-sm">
                View and manage your team roster with real-time player data and stats.
              </p>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Live Scoring</h4>
              <p className="text-slate-400 text-sm">
                Real-time scoring updates and matchup tracking throughout the season.
              </p>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Advanced Analytics</h4>
              <p className="text-slate-400 text-sm">
                Deep insights into player performance, trends, and league statistics.
              </p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 