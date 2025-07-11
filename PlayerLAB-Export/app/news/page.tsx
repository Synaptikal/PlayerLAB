"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bookmark, Share2, ExternalLink, Filter, Search, Clock, TrendingUp, AlertTriangle, Zap, Eye, Hash, User } from "lucide-react"
import { multiSportsAPI } from "@/lib/sports-apis"

interface NewsItem {
  id: string
  title: string
  summary: string
  content?: string
  source: string
  publishedAt: string
  url?: string
  imageUrl?: string
  category: string
  sport: string
  impact: "high" | "medium" | "low"
  tags: string[]
  author?: string
  readTime?: number
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImpact, setSelectedImpact] = useState("all")
  const [selectedSport, setSelectedSport] = useState("NFL")
  const [bookmarkedNews, setBookmarkedNews] = useState<Set<string>>(new Set())

  const sports = [
    { value: "NFL", label: "NFL Football" },
    { value: "NBA", label: "NBA Basketball" },
    { value: "MLB", label: "MLB Baseball" },
    { value: "NHL", label: "NHL Hockey" }
  ]

  useEffect(() => {
    fetchNews()
  }, [selectedSport])

  useEffect(() => {
    filterNews()
  }, [news, searchTerm, selectedCategory, selectedImpact, selectedSport])

  const fetchNews = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log(`🔄 Fetching ${selectedSport} news from multiple sources...`)
      
      const newsData = await multiSportsAPI.getMultiSportNews(selectedSport)
      setNews(newsData)
      console.log(`✅ Loaded ${newsData.length} ${selectedSport} news items`)
    } catch (err) {
      console.error("❌ Error fetching news:", err)
      setError("Failed to load news. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filterNews = () => {
    let filtered = news

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Filter by impact
    if (selectedImpact !== "all") {
      filtered = filtered.filter(item => item.impact === selectedImpact)
    }

    // Filter by sport
    if (selectedSport !== "all") {
      filtered = filtered.filter(item => item.sport === selectedSport)
    }

    setFilteredNews(filtered)
  }

  const toggleBookmark = (newsId: string) => {
    const newBookmarked = new Set(bookmarkedNews)
    if (newBookmarked.has(newsId)) {
      newBookmarked.delete(newsId)
    } else {
      newBookmarked.add(newsId)
    }
    setBookmarkedNews(newBookmarked)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-500/20 text-red-700 border-red-500/30"
      case "medium": return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      case "low": return "bg-green-500/20 text-green-700 border-green-500/30"
      default: return "bg-gray-500/20 text-gray-700 border-gray-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Player News": return "bg-blue-500/20 text-blue-700 border-blue-500/30"
      case "Injury": return "bg-red-500/20 text-red-700 border-red-500/30"
      case "Performance": return "bg-green-500/20 text-green-700 border-green-500/30"
      case "Trade": return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "Season Update": return "bg-orange-500/20 text-orange-700 border-orange-500/30"
      case "Draft": return "bg-indigo-500/20 text-indigo-700 border-indigo-500/30"
      case "Fantasy": return "bg-pink-500/20 text-pink-700 border-pink-500/30"
      case "Breaking": return "bg-red-500/20 text-red-700 border-red-500/30"
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading {selectedSport} news from multiple sources...</p>
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
            <Button onClick={fetchNews} variant="outline">
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
          <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Source News
          </h1>
          <TrendingUp className="h-8 w-8 text-blue-500" />
        </div>
        <p className="text-gray-600 max-w-2xl">
          Stay ahead of the competition with real-time sports news from ESPN, FantasyPros, Reddit, and multiple RSS feeds across all major sports.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search news, tags, or sources..."
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

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Player News">Player News</SelectItem>
            <SelectItem value="Injury">Injury</SelectItem>
            <SelectItem value="Performance">Performance</SelectItem>
            <SelectItem value="Trade">Trade</SelectItem>
            <SelectItem value="Season Update">Season Update</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Fantasy">Fantasy</SelectItem>
            <SelectItem value="Breaking">Breaking</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedImpact} onValueChange={setSelectedImpact}>
          <SelectTrigger>
            <SelectValue placeholder="Impact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Impact</SelectItem>
            <SelectItem value="high">High Impact</SelectItem>
            <SelectItem value="medium">Medium Impact</SelectItem>
            <SelectItem value="low">Low Impact</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={fetchNews} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getSportColor(item.sport)}>
                      {item.sport}
                    </Badge>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    <Badge className={getImpactColor(item.impact)}>
                      {item.impact} impact
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Bookmark className={`h-4 w-4 ${bookmarkedNews.has(item.id) ? 'fill-current text-blue-500' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {item.summary}
              </p>
              
              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Hash className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(item.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="font-medium text-gray-700">{item.source}</span>
                  </div>
                  {item.readTime && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{item.readTime} min read</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No news found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{news.length}</div>
            <div className="text-sm text-gray-600">Total News</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {news.filter(item => item.impact === "high").length}
            </div>
            <div className="text-sm text-gray-600">High Impact</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {news.filter(item => item.category === "Injury").length}
            </div>
            <div className="text-sm text-gray-600">Injury Updates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {news.filter(item => item.sport === selectedSport).length}
            </div>
            <div className="text-sm text-gray-600">{selectedSport} News</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {news.filter(item => item.source === "ESPN").length}
            </div>
            <div className="text-sm text-gray-600">ESPN Sources</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {bookmarkedNews.size}
            </div>
            <div className="text-sm text-gray-600">Bookmarked</div>
          </div>
        </div>
      </div>
    </div>
  )
}
