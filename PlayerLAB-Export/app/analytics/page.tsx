"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Zap, 
  Activity, 
  Award,
  Plus,
  Settings,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Star,
  Calendar,
  Trophy,
  AlertTriangle,
  CheckCircle,
  Clock,
  Map,
  Split,
  Bug,
  ActivitySquare,
  MousePointer,
  MousePointerClick,
  Scroll,
  Monitor,
  Smartphone,
  Globe,
  Filter,
  Search,
  Download as DownloadIcon,
  Upload,
  Play,
  Pause,
  Square,
  BarChart,
  PieChart,
  LineChart,

  Users as UsersIcon,
  Target as TargetIcon,
  Zap as ZapIcon
} from "lucide-react"
import { useState, useEffect } from "react"

interface HeatmapData {
  x: number
  y: number
  intensity: number
  clicks: number
  hovers: number
}

interface ABTest {
  id: string
  name: string
  status: "running" | "paused" | "completed"
  variantA: string
  variantB: string
  trafficSplit: number
  conversionRateA: number
  conversionRateB: number
  confidence: number
  startDate: string
  endDate?: string
}

interface ErrorLog {
  id: string
  timestamp: string
  level: "error" | "warning" | "info"
  message: string
  stack?: string
  userAgent: string
  url: string
  userId?: string
  sessionId: string
}

const mockHeatmapData: HeatmapData[] = [
  { x: 100, y: 150, intensity: 0.8, clicks: 45, hovers: 120 },
  { x: 300, y: 200, intensity: 0.6, clicks: 32, hovers: 89 },
  { x: 500, y: 100, intensity: 0.9, clicks: 67, hovers: 156 },
  { x: 200, y: 300, intensity: 0.4, clicks: 18, hovers: 45 },
  { x: 400, y: 250, intensity: 0.7, clicks: 41, hovers: 98 },
]

const mockABTests: ABTest[] = [
  {
    id: "1",
    name: "Dashboard Layout A/B Test",
    status: "running",
    variantA: "Grid Layout",
    variantB: "List Layout",
    trafficSplit: 50,
    conversionRateA: 12.5,
    conversionRateB: 15.2,
    confidence: 87.3,
    startDate: "2024-01-15"
  },
  {
    id: "2",
    name: "CTA Button Color Test",
    status: "completed",
    variantA: "Blue Button",
    variantB: "Green Button",
    trafficSplit: 50,
    conversionRateA: 8.3,
    conversionRateB: 11.7,
    confidence: 95.1,
    startDate: "2024-01-01",
    endDate: "2024-01-14"
  },
  {
    id: "3",
    name: "Navigation Menu Test",
    status: "paused",
    variantA: "Horizontal Menu",
    variantB: "Sidebar Menu",
    trafficSplit: 50,
    conversionRateA: 6.8,
    conversionRateB: 7.1,
    confidence: 45.2,
    startDate: "2024-01-10"
  }
]

const mockErrorLogs: ErrorLog[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:00Z",
    level: "error",
    message: "Failed to load dashboard widgets",
    stack: "TypeError: Cannot read property 'map' of undefined\n    at DashboardWidgets (app/dashboard/page.tsx:45:12)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    url: "https://playerlab.net/dashboard",
    userId: "user-123",
    sessionId: "session-456"
  },
  {
    id: "2",
    timestamp: "2024-01-15T10:25:00Z",
    level: "warning",
    message: "API response time exceeded threshold",
    stack: undefined,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    url: "https://playerlab.net/api/tools/trade-analyzer",
    sessionId: "session-789"
  },
  {
    id: "3",
    timestamp: "2024-01-15T10:20:00Z",
    level: "info",
    message: "User completed trade analysis",
    stack: undefined,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    url: "https://playerlab.net/tools/trade-analyzer",
    userId: "user-456",
    sessionId: "session-123"
  }
]

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const [selectedView, setSelectedView] = useState("overview")
  const [heatmapData, setHeatmapData] = useState(mockHeatmapData)
  const [abTests, setABTests] = useState(mockABTests)
  const [errorLogs, setErrorLogs] = useState(mockErrorLogs)
  const [isRealTime, setIsRealTime] = useState(true)

  // Simulate real-time error logging
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      const newError: ErrorLog = {
        id: `error-${Date.now()}`,
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.8 ? "error" : Math.random() > 0.6 ? "warning" : "info",
        message: "Real-time error simulation",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        url: "https://playerlab.net/dashboard",
        sessionId: `session-${Math.random().toString(36).substr(2, 9)}`
      }
      setErrorLogs(prev => [newError, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [isRealTime])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-green-400"
      case "paused": return "text-yellow-400"
      case "completed": return "text-blue-400"
      default: return "text-slate-400"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "text-red-400"
      case "warning": return "text-yellow-400"
      case "info": return "text-blue-400"
      default: return "text-slate-400"
    }
  }

  const renderHeatmap = () => (
    <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
      {heatmapData.map((point, index) => (
        <motion.div
          key={index}
          className="absolute w-4 h-4 rounded-full"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            backgroundColor: `rgba(6, 182, 212, ${point.intensity})`,
            boxShadow: `0 0 ${point.intensity * 20}px rgba(6, 182, 212, ${point.intensity})`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: point.intensity }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        />
      ))}
      <div className="absolute bottom-4 left-4 text-xs text-slate-400">
        Click intensity: {heatmapData.reduce((sum, point) => sum + point.clicks, 0)} total clicks
      </div>
    </div>
  )

  const renderABTests = () => (
    <div className="space-y-4">
      {abTests.map((test) => (
        <Card key={test.id} className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-orbitron font-semibold text-white">{test.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className={`text-sm font-medium ${getStatusColor(test.status)}`}>
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </span>
                <span className="text-sm text-slate-400">{test.trafficSplit}% split</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {test.status === "running" && (
                <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-yellow-400/20">
                  <Pause className="w-4 h-4" />
                </Button>
              )}
              {test.status === "paused" && (
                <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-green-400/20">
                  <Play className="w-4 h-4" />
                </Button>
              )}
              <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-white">{test.variantA}</div>
              <div className="text-sm text-slate-400">{test.conversionRateA}% conversion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-white">{test.variantB}</div>
              <div className="text-sm text-slate-400">{test.conversionRateB}% conversion</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Confidence: {test.confidence}%</span>
            <span className="text-sm text-slate-400">
              {test.conversionRateB > test.conversionRateA ? "B winning" : "A winning"}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderErrorLogs = () => (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {errorLogs.map((error) => (
        <Card key={error.id} className="backdrop-blur-xl bg-white/5 border border-red-400/30 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium ${getLevelColor(error.level)}`}>
                  {error.level.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">{new Date(error.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-sm text-white mb-2">{error.message}</p>
              <div className="text-xs text-slate-400 space-y-1">
                <div>URL: {error.url}</div>
                <div>Session: {error.sessionId}</div>
                {error.userId && <div>User: {error.userId}</div>}
              </div>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-slate-400 cursor-pointer">Stack trace</summary>
                  <pre className="text-xs text-slate-300 mt-2 bg-slate-900/50 p-2 rounded overflow-x-auto">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
            <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-red-400/20">
              <Bug className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
                Analytics
              </h1>
              <p className="text-slate-300 text-lg">
                Real-time insights, heatmaps, A/B testing, and error monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 backdrop-blur-xl bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                  <SelectItem value="hour">Last Hour</SelectItem>
                  <SelectItem value="day">Last Day</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className={`backdrop-blur-xl border-cyan-400/50 ${
                  isRealTime 
                    ? "bg-green-400/20 hover:bg-green-400/30" 
                    : "bg-cyan-400/20 hover:bg-cyan-400/30"
                }`}
                onClick={() => setIsRealTime(!isRealTime)}
              >
                <Activity className="w-4 h-4 mr-2" />
                {isRealTime ? "Live" : "Paused"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.section
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            {[
              { value: "overview", label: "Overview", icon: BarChart },
              { value: "heatmaps", label: "Heatmaps", icon: Map },
              { value: "ab-tests", label: "A/B Tests", icon: Split },
              { value: "errors", label: "Error Logs", icon: Bug }
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={selectedView === tab.value ? "default" : "outline"}
                onClick={() => setSelectedView(tab.value)}
                className={`backdrop-blur-xl ${
                  selectedView === tab.value
                    ? "bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                    : "bg-white/5 border-white/20 hover:bg-cyan-400/20"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </motion.section>

        {/* Content */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {selectedView === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Users</p>
                    <p className="text-2xl font-orbitron font-bold text-white">12,847</p>
                    <p className="text-sm text-green-400">+12.5% from last week</p>
                  </div>
                  <UsersIcon className="w-8 h-8 text-cyan-400" />
                </div>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/5 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Conversion Rate</p>
                    <p className="text-2xl font-orbitron font-bold text-white">8.3%</p>
                    <p className="text-sm text-green-400">+2.1% from last week</p>
                  </div>
                  <TargetIcon className="w-8 h-8 text-purple-400" />
                </div>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/5 border border-green-400/30 hover:border-green-400/60 hover:shadow-glow-green rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Avg Session</p>
                    <p className="text-2xl font-orbitron font-bold text-white">4m 32s</p>
                    <p className="text-sm text-green-400">+18s from last week</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-400" />
                </div>
              </Card>
              
              <Card className="backdrop-blur-xl bg-white/5 border border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-glow-yellow rounded-2xl p-6 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Error Rate</p>
                    <p className="text-2xl font-orbitron font-bold text-white">0.12%</p>
                    <p className="text-sm text-red-400">+0.03% from last week</p>
                  </div>
                  <Bug className="w-8 h-8 text-yellow-400" />
                </div>
              </Card>
            </div>
          )}

          {selectedView === "heatmaps" && (
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-orbitron font-semibold text-white">Click Heatmap</h3>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              {renderHeatmap()}
            </Card>
          )}

          {selectedView === "ab-tests" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-orbitron font-semibold text-white">A/B Tests</h3>
                <Button className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30">
                  <Plus className="w-4 h-4 mr-2" />
                  New Test
                </Button>
              </div>
              {renderABTests()}
            </div>
          )}

          {selectedView === "errors" && (
            <Card className="backdrop-blur-xl bg-white/5 border border-red-400/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-orbitron font-semibold text-white">Error Logs</h3>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-red-400/20">
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" variant="outline" className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-red-400/20">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              {renderErrorLogs()}
            </Card>
          )}
        </motion.section>
      </div>
    </div>
  )
}
