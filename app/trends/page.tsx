"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Filter, 
  Target, 
  AlertTriangle,
  Zap,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Eye
} from "lucide-react"
import { multiSportsAPI } from "@/lib/sports-apis"

interface TrendingPlayer {
  playerId: string
  playerName: string
  position: string
  team: string
  sport: string
  sources: string[]
  trend: "up" | "down"
  count: number
  percentage: number
  reason: string
}

export default function TrendsPage() {
  const [trendingPlayers, setTrendingPlayers] = useState<TrendingPlayer[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<TrendingPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [selectedTrend, setSelectedTrend] = useState("all")
  const [selectedSport, setSelectedSport] = useState("NFL")

  const sports = [
    { value: "NFL", label: "NFL Football" },
    { value: "NBA", label: "NBA Basketball" },
    { value: "MLB", label: "MLB Baseball" },
    { value: "NHL", label: "NHL Hockey" }
  ]

  useEffect(() => {
    fetchTrendingPlayers()
  }, [selectedSport])

  useEffect(() => {
    filterPlayers()
  }, [trendingPlayers, searchTerm, selectedPosition, selectedTrend, selectedSport])

  const fetchTrendingPlayers = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🔄 Fetching ${selectedSport} trending players...`)
      
      const trendingData = await multiSportsAPI.getMultiSportTrends(selectedSport)
      setTrendingPlayers(trendingData)
      console.log(`✅ Loaded ${trendingData.length} ${selectedSport} trending players`)
    } catch (err) {
      console.error("❌ Error fetching trending players:", err)
      setError("Failed to load trending players. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filterPlayers = () => {
    let filtered = trendingPlayers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by position
    if (selectedPosition !== "all") {
      filtered = filtered.filter(item => item.position === selectedPosition)
    }

    // Filter by trend
    if (selectedTrend !== "all") {
      filtered = filtered.filter(item => item.trend === selectedTrend)
    }

    // Filter by sport
    if (selectedSport !== "all") {
      filtered = filtered.filter(item => item.sport === selectedSport)
    }

    setFilteredPlayers(filtered)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600 bg-green-50 border-green-200"
      case "down": return "text-red-600 bg-red-50 border-red-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPositionColor = (position: string) => {
    switch (position) {
      case "QB": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "RB": return "bg-green-500/20 text-green-700 border-green-500/30"
      case "WR": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "TE": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "PG": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "SG": return "bg-green-500/20 text-green-700 border-green-500/30"
      case "SF": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "PF": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "C": return "bg-red-500/20 text-red-700 border-red-500/30"
      case "P": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "1B": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "2B": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "3B": return "bg-red-500/20 text-red-700 border-red-500/30"
      case "SS": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "LF": return "bg-green-500/20 text-green-700 border-green-500/30"
      case "CF": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "RF": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "G": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "D": return "bg-green-500/20 text-green-700 border-green-500/30"
      case "LW": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "RW": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      default: return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  const getSportColor = (sport: string) => {
    switch (sport) {
      case "NFL": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "NBA": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "MLB": return "bg-red-500/20 text-red-700 border-red-500/30"
      case "NHL": return "bg-gray-500/20 text-gray-700 border-gray-500/30"
      default: return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {selectedSport} trending players...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchTrendingPlayers} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const trendingUp = trendingPlayers.filter(p => p.trend === "up")
  const trendingDown = trendingPlayers.filter(p => p.trend === "down")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Multi-Sport Trends
          </h1>
          <Activity className="h-8 w-8 text-green-500" />
        </div>
        <p className="text-gray-600 max-w-2xl">
          Track player performance trends, waiver wire activity, and market movements across all major sports in real-time.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger>
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport.value} value={sport.value}>
                {sport.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPosition} onValueChange={setSelectedPosition}>
          <SelectTrigger>
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {selectedSport === "NFL" && (
              <>
                <SelectItem value="QB">Quarterback</SelectItem>
                <SelectItem value="RB">Running Back</SelectItem>
                <SelectItem value="WR">Wide Receiver</SelectItem>
                <SelectItem value="TE">Tight End</SelectItem>
              </>
            )}
            {selectedSport === "NBA" && (
              <>
                <SelectItem value="PG">Point Guard</SelectItem>
                <SelectItem value="SG">Shooting Guard</SelectItem>
                <SelectItem value="SF">Small Forward</SelectItem>
                <SelectItem value="PF">Power Forward</SelectItem>
                <SelectItem value="C">Center</SelectItem>
              </>
            )}
            {selectedSport === "MLB" && (
              <>
                <SelectItem value="P">Pitcher</SelectItem>
                <SelectItem value="C">Catcher</SelectItem>
                <SelectItem value="1B">First Base</SelectItem>
                <SelectItem value="2B">Second Base</SelectItem>
                <SelectItem value="3B">Third Base</SelectItem>
                <SelectItem value="SS">Shortstop</SelectItem>
                <SelectItem value="LF">Left Field</SelectItem>
                <SelectItem value="CF">Center Field</SelectItem>
                <SelectItem value="RF">Right Field</SelectItem>
              </>
            )}
            {selectedSport === "NHL" && (
              <>
                <SelectItem value="G">Goalie</SelectItem>
                <SelectItem value="D">Defenseman</SelectItem>
                <SelectItem value="LW">Left Wing</SelectItem>
                <SelectItem value="RW">Right Wing</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>

        <Select value={selectedTrend} onValueChange={setSelectedTrend}>
          <SelectTrigger>
            <SelectValue placeholder="Trend" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trends</SelectItem>
            <SelectItem value="up">Trending Up</SelectItem>
            <SelectItem value="down">Trending Down</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={fetchTrendingPlayers} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Trending Up</p>
                <p className="text-2xl font-bold text-green-700">{trendingUp.length}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Trending Down</p>
                <p className="text-2xl font-bold text-red-700">{trendingDown.length}</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Activity</p>
                <p className="text-2xl font-bold text-blue-700">{trendingPlayers.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">{selectedSport} Players</p>
                <p className="text-2xl font-bold text-orange-700">
                  {trendingPlayers.filter(p => p.sport === selectedSport).length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.playerId} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSportColor(player.sport)}>
                      {player.sport}
                    </Badge>
                    <Badge className={getPositionColor(player.position)}>
                      {player.position}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {player.team}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(player.trend)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getTrendColor(player.trend)}`}>
                        {player.trend}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                    {player.playerName}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getPercentageColor(player.percentage)}`}>
                    {player.percentage}%
                  </div>
                  <div className="text-xs text-gray-500">Activity</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {player.sources.length} sources
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Activity Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {player.count}
                  </div>
                  <div className="text-xs text-gray-500">Actions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {player.trend === "up" ? "Adds" : "Drops"}
                  </div>
                  <div className="text-xs text-gray-500">Type</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Activity Level</span>
                  <span>{player.percentage}%</span>
                </div>
                <Progress value={player.percentage} className="h-2" />
              </div>

              {/* Reason */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Reason</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {player.reason}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Activity className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No trending players found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Detailed Stats */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Trend Analysis</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {trendingUp.length > 0 ? Math.round(trendingUp.reduce((acc, p) => acc + p.percentage, 0) / trendingUp.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Up Trend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {trendingDown.length > 0 ? Math.round(trendingDown.reduce((acc, p) => acc + p.percentage, 0) / trendingDown.length) : 0}%
            </div>
            <div className="text-sm text-gray-600">Avg Down Trend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {trendingPlayers.length > 0 ? Math.round(trendingPlayers.reduce((acc, p) => acc + p.count, 0) / trendingPlayers.length) : 0}
            </div>
            <div className="text-sm text-gray-600">Avg Actions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {trendingPlayers.filter(p => p.sport === selectedSport).length}
            </div>
            <div className="text-sm text-gray-600">{selectedSport} Players</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(trendingPlayers.reduce((acc, p) => acc + p.sources.length, 0) / trendingPlayers.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Sources</div>
          </div>
        </div>
      </div>
    </div>
  )
} 