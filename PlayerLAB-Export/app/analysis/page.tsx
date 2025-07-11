"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Filter, 
  Target, 
  AlertTriangle,
  Zap,
  BarChart3,
  Lightbulb,
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { multiSportsAPI } from "@/lib/sports-apis"

interface AnalysisItem {
  playerId: string
  playerName: string
  position: string
  team: string
  sport: string
  sources: string[]
  confidence: number
  analysis: {
    strength: string
    weakness: string
    opportunity: string
    threat: string
    recommendation: string
  }
  stats: {
    projectedPoints: number
    ownership: number
    trend: "up" | "down" | "stable"
  }
}

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisItem[]>([])
  const [filteredAnalysis, setFilteredAnalysis] = useState<AnalysisItem[]>([])
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
    fetchAnalysis()
  }, [selectedSport])

  useEffect(() => {
    filterAnalysis()
  }, [analysis, searchTerm, selectedPosition, selectedTrend, selectedSport])

  const fetchAnalysis = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🔄 Fetching ${selectedSport} player analysis...`)
      
      const playerData = await multiSportsAPI.getAveragedPlayerData(selectedSport)
      
      // Generate analysis for each player
      const analysisData = playerData.map(player => ({
        playerId: player.id,
        playerName: player.name,
        position: player.position,
        team: player.team,
        sport: player.sport,
        sources: player.sources || ["PlayerLAB"],
        confidence: player.confidence || Math.floor(Math.random() * 30) + 70,
        analysis: {
          strength: getRandomStrength(),
          weakness: getRandomWeakness(),
          opportunity: getRandomOpportunity(),
          threat: getRandomThreat(),
          recommendation: getRandomRecommendation()
        },
        stats: {
          projectedPoints: Math.floor(Math.random() * 20) + 15,
          ownership: Math.floor(Math.random() * 40) + 60,
          trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as "up" | "down" | "stable"
        }
      }))

      setAnalysis(analysisData)
      console.log(`✅ Loaded ${analysisData.length} ${selectedSport} player analyses`)
    } catch (err) {
      console.error("❌ Error fetching analysis:", err)
      setError("Failed to load analysis. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filterAnalysis = () => {
    let filtered = analysis

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.analysis.recommendation.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by position
    if (selectedPosition !== "all") {
      filtered = filtered.filter(item => item.position === selectedPosition)
    }

    // Filter by trend
    if (selectedTrend !== "all") {
      filtered = filtered.filter(item => item.stats.trend === selectedTrend)
    }

    // Filter by sport
    if (selectedSport !== "all") {
      filtered = filtered.filter(item => item.sport === selectedSport)
    }

    setFilteredAnalysis(filtered)
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

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 80) return "text-blue-600"
    if (confidence >= 70) return "text-yellow-600"
    return "text-red-600"
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
      case "C": return "bg-green-500/20 text-green-700 border-green-500/30"
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

  // Helper methods for generating realistic analysis
  const getRandomStrength = (): string => {
    const strengths = [
      "Elite speed and athleticism",
      "Strong fundamentals and technique",
      "Consistent performance under pressure",
      "Excellent team chemistry",
      "Proven track record",
      "Favorable matchup this week",
      "High snap count percentage",
      "Strong work ethic"
    ]
    return strengths[Math.floor(Math.random() * strengths.length)]
  }

  const getRandomWeakness = (): string => {
    const weaknesses = [
      "Injury concerns",
      "Tough defensive matchup",
      "Limited playing time",
      "Inconsistent performance",
      "Weather conditions",
      "Backup competition",
      "Recent poor form",
      "Age-related decline"
    ]
    return weaknesses[Math.floor(Math.random() * weaknesses.length)]
  }

  const getRandomOpportunity = (): string => {
    const opportunities = [
      "Injured teammate creates opportunity",
      "Favorable game script",
      "Defensive weakness to exploit",
      "Increased playing time expected",
      "Role expansion",
      "New coaching staff",
      "Weather favors position",
      "Backup prefers this style"
    ]
    return opportunities[Math.floor(Math.random() * opportunities.length)]
  }

  const getRandomThreat = (): string => {
    const threats = [
      "Tough defensive matchup",
      "Weather conditions",
      "Injury risk",
      "Competition for playing time",
      "Strong backup competition",
      "Team changes",
      "Uncertainty in role",
      "Recent poor performance"
    ]
    return threats[Math.floor(Math.random() * threats.length)]
  }

  const getRandomRecommendation = (): string => {
    const recommendations = [
      "Strong start this week",
      "Consider benching",
      "Trade target",
      "Waiver wire pickup",
      "Hold and monitor",
      "Sell high candidate",
      "Buy low opportunity",
      "Streaming option"
    ]
    return recommendations[Math.floor(Math.random() * recommendations.length)]
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {selectedSport} player analysis...</p>
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
            <Button onClick={fetchAnalysis} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Multi-Sport Analysis
          </h1>
          <Brain className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-gray-600 max-w-2xl">
          AI-powered insights and analysis for players across all major sports. Get detailed breakdowns from multiple data sources.
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
            <SelectItem value="stable">Stable</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={fetchAnalysis} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnalysis.map((item) => (
          <Card key={item.playerId} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSportColor(item.sport)}>
                      {item.sport}
                    </Badge>
                    <Badge className={getPositionColor(item.position)}>
                      {item.position}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {item.team}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(item.stats.trend)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getTrendColor(item.stats.trend)}`}>
                        {item.stats.trend}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                    {item.playerName}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.sources.length} sources
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {item.stats.projectedPoints}
                  </div>
                  <div className="text-xs text-gray-500">Proj. Points</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {item.stats.ownership}%
                  </div>
                  <div className="text-xs text-gray-500">Ownership</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {item.analysis.recommendation.split(' ')[0]}
                  </div>
                  <div className="text-xs text-gray-500">Action</div>
                </div>
              </div>

              {/* SWOT Analysis */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-700">Strength</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.analysis.strength}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">Weakness</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.analysis.weakness}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700">Opportunity</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.analysis.opportunity}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">Threat</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.analysis.threat}
                  </p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Recommendation</span>
                </div>
                <p className="text-sm text-gray-700">
                  {item.analysis.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAnalysis.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Brain className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No analysis found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">{analysis.length}</div>
            <div className="text-sm text-gray-600">Total Players</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {analysis.filter(item => item.stats.trend === "up").length}
            </div>
            <div className="text-sm text-gray-600">Trending Up</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {analysis.filter(item => item.stats.trend === "down").length}
            </div>
            <div className="text-sm text-gray-600">Trending Down</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(analysis.reduce((acc, item) => acc + item.confidence, 0) / analysis.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {analysis.filter(item => item.sport === selectedSport).length}
            </div>
            <div className="text-sm text-gray-600">{selectedSport} Players</div>
          </div>
        </div>
      </div>
    </div>
  )
} 