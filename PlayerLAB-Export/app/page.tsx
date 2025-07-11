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
  Shield,
  Zap as ZapIcon
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-12 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded"></div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            PlayerLAB
          </h1>
          <Globe className="h-12 w-12 text-blue-500" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          The ultimate multi-sport fantasy platform with real-time data integration, AI-powered analysis, and comprehensive insights across NFL, NBA, MLB, and NHL.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 px-4 py-2">
            <Database className="h-4 w-4 mr-2" />
            Multi-Sport API Integration
          </Badge>
          <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30 px-4 py-2">
            <Brain className="h-4 w-4 mr-2" />
            AI-Powered Analysis
          </Badge>
          <Badge className="bg-green-500/20 text-green-700 border-green-500/30 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Real-Time Data
          </Badge>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link href="/news">
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore News
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/analysis">
              <Brain className="h-5 w-5 mr-2" />
              View Analysis
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* News Tile */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30">
                Multi-Sport
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              Real-Time News
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4">
              Stay ahead with comprehensive news coverage across NFL, NBA, MLB, and NHL. Get injury updates, trade rumors, and breaking stories from multiple sources.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>4 Sports</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="group-hover:bg-blue-500/10">
                <Link href="/news">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Tile */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30">
                AI-Powered
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
              Smart Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4">
              AI-driven insights with SWOT analysis, confidence ratings, and multi-source data averaging for accurate player evaluations across all sports.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Database className="h-4 w-4" />
                <span>Multiple Sources</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="group-hover:bg-purple-500/10">
                <Link href="/analysis">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trends Tile */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                Live Data
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4">
              Track player performance trends, waiver wire activity, and market movements in real-time across all major sports leagues.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <BarChart3 className="h-4 w-4" />
                <span>Real-Time</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="group-hover:bg-green-500/10">
                <Link href="/trends">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hype Tile */}
        <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-pink-500 rounded-lg flex items-center justify-center">
                <ZapIcon className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-pink-500/20 text-pink-700 border-pink-500/30">
                Social Buzz
              </Badge>
            </div>
            <CardTitle className="text-xl group-hover:text-pink-600 transition-colors">
              Social Hype
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-600 mb-4">
              Monitor social media buzz, community sentiment, and viral moments across all sports with comprehensive hashtag and topic tracking.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe className="h-4 w-4" />
                <span>Multi-Platform</span>
              </div>
              <Button asChild variant="ghost" size="sm" className="group-hover:bg-pink-500/10">
                <Link href="/hype">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Multi-Sport Data Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NFL</span>
                </div>
                <h3 className="text-lg font-semibold">NFL Football</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Comprehensive NFL data with Sleeper API integration, real-time stats, and fantasy insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NBA</span>
                </div>
                <h3 className="text-lg font-semibold">NBA Basketball</h3>
              </div>
              <p className="text-gray-600 text-sm">
                BallDontLie API integration with player stats, performance trends, and fantasy basketball data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MLB</span>
                </div>
                <h3 className="text-lg font-semibold">MLB Baseball</h3>
              </div>
              <p className="text-gray-600 text-sm">
                MLB Stats API integration with comprehensive baseball data and fantasy insights.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NHL</span>
                </div>
                <h3 className="text-lg font-semibold">NHL Hockey</h3>
              </div>
              <p className="text-gray-600 text-sm">
                NHL API integration with hockey stats, player performance, and fantasy hockey data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Data Averaging</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Multi-source data integration with intelligent averaging for accurate insights across all sports.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">Real-Time Updates</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Live data feeds with caching and fallback systems for reliable, up-to-date information.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Major Sports</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">5+</div>
            <div className="text-sm text-gray-600">API Sources</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">1000+</div>
            <div className="text-sm text-gray-600">Players Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">24/7</div>
            <div className="text-sm text-gray-600">Data Updates</div>
          </div>
        </div>
      </div>
    </div>
  )
}
