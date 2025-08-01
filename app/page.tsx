"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  ArrowRight,
  Users,
  BarChart3,
  Globe,
  Database,
  Shield,
  Target,
  FlaskConical,
  Puzzle,
  LayoutDashboard,
  Wrench
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
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
          <Button asChild size="lg" className="glass-effect bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-cyan-400/50">
            <Link href="/dashboard">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="glass-effect border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20">
            <Link href="/tools">
              <Wrench className="h-5 w-5 mr-2" />
              Explore Tools
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Tiles - Enhanced Glassmorphic Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Dashboard Tile */}
        <Card className="glass-effect group hover:shadow-2xl transition-all duration-500 border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-cyan-500/25">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <LayoutDashboard className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 backdrop-blur-sm">
                Main Hub
              </Badge>
            </div>
            <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors font-orbitron">
              Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-300 mb-4">
              Your central command center with real-time stats, player insights, and league management tools.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="h-4 w-4" />
                <span>All Features</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-cyan-400 hover:bg-cyan-400/20 backdrop-blur-sm">
                <Link href="/dashboard">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tools Tile */}
        <Card className="glass-effect group hover:shadow-2xl transition-all duration-500 border-purple-400/30 hover:border-purple-400/60 hover:shadow-purple-500/25">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Wrench className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 backdrop-blur-sm">
                AI Tools
              </Badge>
            </div>
            <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors font-orbitron">
              Fantasy Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-300 mb-4">
              Draft Kit, Trade Analyzer, Smart Tester - all the tools you need for fantasy success.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Brain className="h-4 w-4" />
                <span>3 Tools</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-400/20 backdrop-blur-sm">
                <Link href="/tools">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Tile */}
        <Card className="glass-effect group hover:shadow-2xl transition-all duration-500 border-green-400/30 hover:border-green-400/60 hover:shadow-green-500/25">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                Live Data
              </Badge>
            </div>
            <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors font-orbitron">
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-300 mb-4">
              Advanced analytics with heatmaps, A/B testing, and comprehensive data visualization.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Database className="h-4 w-4" />
                <span>Real-Time</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/20 backdrop-blur-sm">
                <Link href="/analytics">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plugins Tile */}
        <Card className="glass-effect group hover:shadow-2xl transition-all duration-500 border-pink-400/30 hover:border-pink-400/60 hover:shadow-pink-500/25">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Puzzle className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 backdrop-blur-sm">
                Extensions
              </Badge>
            </div>
            <CardTitle className="text-xl text-white group-hover:text-pink-400 transition-colors font-orbitron">
              Plugins
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-300 mb-4">
              Extend functionality with custom plugins and third-party integrations.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="h-4 w-4" />
                <span>Marketplace</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-pink-400 hover:bg-pink-400/20 backdrop-blur-sm">
                <Link href="/plugins">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button asChild className="glass-effect border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 h-16">
            <Link href="/dashboard">
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild className="glass-effect border-purple-400/50 text-purple-400 hover:bg-purple-400/20 h-16">
            <Link href="/tools/draft-kit">
              <Target className="h-5 w-5 mr-2" />
              Draft Kit
            </Link>
          </Button>
          <Button asChild className="glass-effect border-green-400/50 text-green-400 hover:bg-green-400/20 h-16">
            <Link href="/tools/trade-analyzer">
              <Target className="h-5 w-5 mr-2" />
              Trade Analyzer
            </Link>
          </Button>
          <Button asChild className="glass-effect border-pink-400/50 text-pink-400 hover:bg-pink-400/20 h-16">
            <Link href="/tools/smart-tester">
              <FlaskConical className="h-5 w-5 mr-2" />
              Smart Tester
            </Link>
          </Button>
          <Button asChild className="glass-effect border-orange-400/50 text-orange-400 hover:bg-orange-400/20 h-16">
            <Link href="/analytics">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button asChild className="glass-effect border-teal-400/50 text-teal-400 hover:bg-teal-400/20 h-16">
            <Link href="/plugins">
              <Puzzle className="h-5 w-5 mr-2" />
              Plugins
            </Link>
          </Button>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 font-orbitron text-center">All Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button asChild variant="outline" className="glass-effect border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20">
            <Link href="/vault">Vault</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-purple-400/50 text-purple-400 hover:bg-purple-400/20">
            <Link href="/news">News</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-green-400/50 text-green-400 hover:bg-green-400/20">
            <Link href="/trends">Trends</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-pink-400/50 text-pink-400 hover:bg-pink-400/20">
            <Link href="/hype">Hype</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-orange-400/50 text-orange-400 hover:bg-orange-400/20">
            <Link href="/analysis">Analysis</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-teal-400/50 text-teal-400 hover:bg-teal-400/20">
            <Link href="/achievements">Achievements</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/20">
            <Link href="/leagues">Leagues</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-amber-400/50 text-amber-400 hover:bg-amber-400/20">
            <Link href="/teams">Teams</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/20">
            <Link href="/players">Players</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-red-400/50 text-red-400 hover:bg-red-400/20">
            <Link href="/matchups">Matchups</Link>
          </Button>
          <Button asChild variant="outline" className="glass-effect border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/20">
            <Link href="/settings">Settings</Link>
          </Button>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="glass-effect bg-white/5 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2 font-orbitron">30+</div>
            <div className="text-gray-300">Active Pages</div>
          </CardContent>
        </Card>
        <Card className="glass-effect bg-white/5 border-purple-400/30 hover:border-purple-400/60 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-orbitron">15+</div>
            <div className="text-gray-300">API Sources</div>
          </CardContent>
        </Card>
        <Card className="glass-effect bg-white/5 border-green-400/30 hover:border-green-400/60 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2 font-orbitron">100%</div>
            <div className="text-gray-300">NFL Focus</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
