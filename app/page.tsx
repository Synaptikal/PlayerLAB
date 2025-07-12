"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Brain, 
  Activity, 
  Zap,
  ArrowRight,
  Users,
  BarChart3,
  Globe,
  Database,
  Shield
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Holographic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded animate-pulse"></div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-orbitron">
              PlayerLAB
            </h1>
            <Globe className="h-12 w-12 text-cyan-400 animate-spin-slow" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-inter">
            The ultimate fantasy football platform with real-time data integration, AI-powered analysis, and comprehensive insights for NFL fantasy leagues.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2 backdrop-blur-sm">
              <Database className="h-4 w-4 mr-2" />
              NFL API Integration
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 backdrop-blur-sm">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered Analysis
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 backdrop-blur-sm">
              <Shield className="h-4 w-4 mr-2" />
              Real-Time Data
            </Badge>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-cyan-400/50 backdrop-blur-sm">
              <Link href="/news">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore News
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 backdrop-blur-sm">
              <Link href="/analysis">
                <Brain className="h-5 w-5 mr-2" />
                View Analysis
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Content Tiles - Glassmorphic Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* News Tile */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-cyan-400/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-cyan-400/60 hover:shadow-cyan-500/25">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 backdrop-blur-sm">
                  NFL Focus
                </Badge>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors font-orbitron">
                Real-Time News
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">
                Stay ahead with comprehensive NFL news coverage. Get injury updates, trade rumors, and breaking stories from multiple sources.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>NFL Only</span>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-cyan-400 hover:bg-cyan-400/20 backdrop-blur-sm">
                  <Link href="/news">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Tile */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-purple-400/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-purple-400/60 hover:shadow-purple-500/25">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 backdrop-blur-sm">
                  AI-Powered
                </Badge>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors font-orbitron">
                Smart Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">
                AI-driven insights with SWOT analysis, confidence ratings, and multi-source data averaging for accurate NFL player evaluations.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Database className="h-4 w-4" />
                  <span>Multiple Sources</span>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-400/20 backdrop-blur-sm">
                  <Link href="/analysis">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trends Tile */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-green-400/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-green-400/60 hover:shadow-green-500/25">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <Activity className="h-7 w-7 text-white" />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                  Live Data
                </Badge>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors font-orbitron">
                Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">
                Track NFL player performance trends, waiver wire activity, and market movements in real-time.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <BarChart3 className="h-4 w-4" />
                  <span>Real-Time</span>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/20 backdrop-blur-sm">
                  <Link href="/trends">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hype Tile */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-pink-400/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-pink-400/60 hover:shadow-pink-500/25">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 backdrop-blur-sm">
                  Social Buzz
                </Badge>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-pink-400 transition-colors font-orbitron">
                Social Hype
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">
                Monitor NFL social media buzz, community sentiment, and viral moments with comprehensive hashtag and topic tracking.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="h-4 w-4" />
                  <span>Multi-Platform</span>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-pink-400 hover:bg-pink-400/20 backdrop-blur-sm">
                  <Link href="/hype">
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/5 backdrop-blur-xl border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2 font-orbitron">21+</div>
              <div className="text-gray-300">Active Pages</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-purple-400/30 hover:border-purple-400/60 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">15+</div>
              <div className="text-gray-300">API Sources</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-xl border-green-400/30 hover:border-green-400/60 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">100%</div>
              <div className="text-gray-300">NFL Focus</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">Quick Actions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 backdrop-blur-sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-400/50 text-purple-400 hover:bg-purple-400/20 backdrop-blur-sm">
              <Link href="/tools">Tools</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-400/50 text-green-400 hover:bg-green-400/20 backdrop-blur-sm">
              <Link href="/analytics">Analytics</Link>
            </Button>
            <Button asChild variant="outline" className="border-pink-400/50 text-pink-400 hover:bg-pink-400/20 backdrop-blur-sm">
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
