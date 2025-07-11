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
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Hash,
  TrendingUp as TrendingUpIcon,
  Zap as ZapIcon,
  ThumbsUp,
  MessageSquare,
  Repeat
} from "lucide-react"
import { multiSportsAPI } from "@/lib/sports-apis"

interface HypePlayer {
  playerId: string
  playerName: string
  position: string
  team: string
  sport: string
  sources: string[]
  socialMetrics: {
    mentions: number
    sentiment: "positive" | "negative" | "neutral"
    engagement: number
    trending: boolean
  }
  buzz: {
    hashtags: string[]
    trendingTopics: string[]
    viralMoment: boolean
  }
  socialPosts?: any[]
  platformMetrics?: any
}

export default function HypePage() {
  const [hypePlayers, setHypePlayers] = useState<HypePlayer[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<HypePlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [selectedSentiment, setSelectedSentiment] = useState("all")
  const [selectedSport, setSelectedSport] = useState("NFL")

  const sports = [
    { value: "NFL", label: "NFL Football" },
    { value: "NBA", label: "NBA Basketball" },
    { value: "MLB", label: "MLB Baseball" },
    { value: "NHL", label: "NHL Hockey" }
  ]

  useEffect(() => {
    fetchHypePlayers()
  }, [selectedSport])

  useEffect(() => {
    filterPlayers()
  }, [hypePlayers, searchTerm, selectedPosition, selectedSentiment, selectedSport])

  const fetchHypePlayers = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🔄 Fetching ${selectedSport} social hype data from multiple platforms...`)
      
      const hypeData = await multiSportsAPI.getMultiSportHype(selectedSport)
      setHypePlayers(hypeData)
      console.log(`✅ Loaded ${hypeData.length} ${selectedSport} hype players with social data`)
    } catch (err) {
      console.error("❌ Error fetching hype players:", err)
      setError("Failed to load hype data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filterPlayers = () => {
    let filtered = hypePlayers

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.buzz.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.buzz.trendingTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by position
    if (selectedPosition !== "all") {
      filtered = filtered.filter(item => item.position === selectedPosition)
    }

    // Filter by sentiment
    if (selectedSentiment !== "all") {
      filtered = filtered.filter(item => item.socialMetrics.sentiment === selectedSentiment)
    }

    // Filter by sport
    if (selectedSport !== "all") {
      filtered = filtered.filter(item => item.sport === selectedSport)
    }

    setFilteredPlayers(filtered)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-green-600 bg-green-50 border-green-200"
      case "negative": return "text-red-600 bg-red-50 border-red-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <TrendingUp className="h-4 w-4 text-green-500" />
      case "negative": return <TrendingDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {selectedSport} social hype data from multiple platforms...</p>
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
            <Button onClick={fetchHypePlayers} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const positiveSentiment = hypePlayers.filter(p => p.socialMetrics.sentiment === "positive")
  const negativeSentiment = hypePlayers.filter(p => p.socialMetrics.sentiment === "negative")
  const trendingPlayers = hypePlayers.filter(p => p.socialMetrics.trending)
  const viralPlayers = hypePlayers.filter(p => p.buzz.viralMoment)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-1 bg-gradient-to-b from-pink-500 to-purple-500 rounded"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Platform Social Hype
          </h1>
          <ZapIcon className="h-8 w-8 text-pink-500" />
        </div>
        <p className="text-gray-600 max-w-2xl">
          Track social media buzz, community sentiment, and viral moments from Reddit, Mastodon, YouTube, and multiple platforms across all major sports in real-time.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search players, hashtags, or topics..."
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

        <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
          <SelectTrigger>
            <SelectValue placeholder="Sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiment</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={fetchHypePlayers} 
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
                <p className="text-sm font-medium text-green-600">Positive Buzz</p>
                <p className="text-2xl font-bold text-green-700">{positiveSentiment.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Negative Buzz</p>
                <p className="text-2xl font-bold text-red-700">{negativeSentiment.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Trending</p>
                <p className="text-2xl font-bold text-purple-700">{trendingPlayers.length}</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-pink-600">Viral Moments</p>
                <p className="text-2xl font-bold text-pink-700">{viralPlayers.length}</p>
              </div>
              <ZapIcon className="h-8 w-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hype Players Grid */}
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
                      {getSentimentIcon(player.socialMetrics.sentiment)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getSentimentColor(player.socialMetrics.sentiment)}`}>
                        {player.socialMetrics.sentiment}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-pink-600 transition-colors">
                    {player.playerName}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-pink-600">
                    {formatNumber(player.socialMetrics.mentions)}
                  </div>
                  <div className="text-xs text-gray-500">Mentions</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {player.sources.length} sources
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {/* Social Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {formatNumber(player.socialMetrics.engagement)}
                  </div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {player.buzz.hashtags.length}
                  </div>
                  <div className="text-xs text-gray-500">Hashtags</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    {player.buzz.trendingTopics.length}
                  </div>
                  <div className="text-xs text-gray-500">Topics</div>
                </div>
              </div>

              {/* Platform Breakdown */}
              {player.platformMetrics && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Platform Activity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(player.platformMetrics.platformBreakdown || {}).slice(0, 4).map(([platform, count]) => (
                      <div key={platform} className="flex justify-between">
                        <span className="capitalize">{platform}</span>
                        <span className="font-medium">{count as number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hashtags */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Trending Hashtags</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {player.buzz.hashtags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Trending Topics</span>
                </div>
                <div className="space-y-1">
                  {player.buzz.trendingTopics.slice(0, 2).map((topic, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      • {topic}
                    </p>
                  ))}
                </div>
              </div>

              {/* Recent Social Posts */}
              {player.socialPosts && player.socialPosts.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Recent Posts</span>
                  </div>
                  <div className="space-y-2">
                    {player.socialPosts.slice(0, 2).map((post, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{post.platform}</span>
                          <div className="flex items-center gap-1 text-gray-500">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{post.likes}</span>
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.comments}</span>
                            <Repeat className="h-3 w-3" />
                            <span>{post.shares}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-2">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Viral Status */}
              {player.buzz.viralMoment && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="h-4 w-4 text-pink-500" />
                    <span className="text-sm font-medium text-pink-700">Viral Moment!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPlayers.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ZapIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No hype data found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Detailed Stats */}
      <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">
              {formatNumber(hypePlayers.reduce((acc, p) => acc + p.socialMetrics.mentions, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Mentions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatNumber(hypePlayers.reduce((acc, p) => acc + p.socialMetrics.engagement, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {hypePlayers.filter(p => p.socialMetrics.sentiment === "positive").length}
            </div>
            <div className="text-sm text-gray-600">Positive Sentiment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {hypePlayers.filter(p => p.sport === selectedSport).length}
            </div>
            <div className="text-sm text-gray-600">{selectedSport} Players</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(hypePlayers.reduce((acc, p) => acc + p.sources.length, 0) / hypePlayers.length)}
            </div>
            <div className="text-sm text-gray-600">Avg Sources</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {hypePlayers.filter(p => p.buzz.viralMoment).length}
            </div>
            <div className="text-sm text-gray-600">Viral Players</div>
          </div>
        </div>
      </div>
    </div>
  )
} 