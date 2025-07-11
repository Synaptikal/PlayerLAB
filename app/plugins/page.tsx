"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Puzzle,
  Zap,
  Download,
  Star,
  Eye,
  Settings,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Pause,
  Square,
  Code,
  Database,
  Globe,
  Shield,
  Users,
  TrendingUp,
  Activity,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download as DownloadIcon,
  Upload,
  Share2,
  Heart,
  MessageSquare,
  GitBranch,
  Package,
  ExternalLink,
  Lock,
  Unlock,
  Crown,
  Sparkles,
  Target,
  BarChart3,
  FlaskConical,
  Palette,
  Bot,
  Lightbulb,
  Bell,
  CloudRain
} from "lucide-react"
import { useState } from "react"

interface Plugin {
  id: string
  name: string
  description: string
  author: string
  version: string
  category: string
  rating: number
  downloads: number
  price: "free" | "premium" | "enterprise"
  status: "installed" | "available" | "updating"
  features: string[]
  tags: string[]
  icon: any
  color: string
  lastUpdated: string
  size: string
  compatibility: string[]
}

interface APIIntegration {
  id: string
  name: string
  description: string
  provider: string
  category: string
  status: "connected" | "available" | "error"
  endpoints: number
  rateLimit: string
  pricing: string
  icon: any
  color: string
}

const mockPlugins: Plugin[] = [
  {
    id: "1",
    name: "Advanced Analytics Dashboard",
    description: "Enhanced analytics with custom widgets, heatmaps, and real-time data visualization",
    author: "PlayerLAB Team",
    version: "2.1.0",
    category: "Analytics",
    rating: 4.8,
    downloads: 15420,
    price: "free",
    status: "installed",
    features: ["Custom Widgets", "Heatmaps", "Real-time Data", "Export Options"],
    tags: ["analytics", "dashboard", "visualization"],
    icon: BarChart3,
    color: "cyan",
    lastUpdated: "2024-01-15",
    size: "2.4MB",
    compatibility: ["v1.0+", "React 18+"]
  },
  {
    id: "2",
    name: "AI Trade Assistant",
    description: "Intelligent trade analysis powered by machine learning algorithms",
    author: "FantasyAI Labs",
    version: "1.5.2",
    category: "AI/ML",
    rating: 4.9,
    downloads: 8920,
    price: "premium",
    status: "available",
    features: ["ML Analysis", "Trade Suggestions", "Risk Assessment", "Historical Data"],
    tags: ["ai", "trading", "machine-learning"],
    icon: Bot,
    color: "purple",
    lastUpdated: "2024-01-12",
    size: "5.1MB",
    compatibility: ["v1.0+", "Python 3.8+"]
  },
  {
    id: "3",
    name: "Dark Theme Pro",
    description: "Premium dark theme with custom color schemes and animations",
    author: "ThemeCraft",
    version: "3.0.1",
    category: "UI/UX",
    rating: 4.7,
    downloads: 23410,
    price: "premium",
    status: "available",
    features: ["Custom Themes", "Animations", "Color Schemes", "Responsive Design"],
    tags: ["theme", "ui", "dark-mode"],
    icon: Palette,
    color: "green",
    lastUpdated: "2024-01-10",
    size: "1.8MB",
    compatibility: ["v1.0+", "CSS3+"]
  },
  {
    id: "4",
    name: "Sleeper API Integration",
    description: "Seamless integration with Sleeper fantasy football platform",
    author: "PlayerLAB Team",
    version: "1.2.0",
    category: "Integration",
    rating: 4.6,
    downloads: 18750,
    price: "free",
    status: "installed",
    features: ["Real-time Data", "Auto Sync", "League Management", "Player Stats"],
    tags: ["sleeper", "api", "integration"],
    icon: Database,
    color: "blue",
    lastUpdated: "2024-01-08",
    size: "3.2MB",
    compatibility: ["v1.0+", "REST API"]
  },
  {
    id: "5",
    name: "Advanced Draft Kit",
    description: "Professional draft tools with rankings, projections, and strategy guides",
    author: "DraftMaster Pro",
    version: "2.3.0",
    category: "Draft Tools",
    rating: 4.9,
    downloads: 12560,
    price: "enterprise",
    status: "available",
    features: ["Live Rankings", "Projections", "Strategy Guides", "Mock Drafts"],
    tags: ["draft", "rankings", "projections"],
    icon: Target,
    color: "orange",
    lastUpdated: "2024-01-05",
    size: "8.7MB",
    compatibility: ["v1.0+", "Node.js 16+"]
  },
  {
    id: "6",
    name: "Smart Notifications",
    description: "Intelligent notification system with custom alerts and scheduling",
    author: "NotifyPro",
    version: "1.8.3",
    category: "Communication",
    rating: 4.5,
    downloads: 9870,
    price: "free",
    status: "available",
    features: ["Custom Alerts", "Scheduling", "Push Notifications", "Email Integration"],
    tags: ["notifications", "alerts", "communication"],
    icon: Bell,
    color: "pink",
    lastUpdated: "2024-01-03",
    size: "2.1MB",
    compatibility: ["v1.0+", "Web Push API"]
  }
]

const mockAPIIntegrations: APIIntegration[] = [
  {
    id: "1",
    name: "ESPN Fantasy API",
    description: "Connect to ESPN fantasy football leagues and data",
    provider: "ESPN",
    category: "Fantasy Sports",
    status: "available",
    endpoints: 15,
    rateLimit: "1000 requests/hour",
    pricing: "Free tier available",
    icon: Globe,
    color: "red"
  },
  {
    id: "2",
    name: "Yahoo Fantasy API",
    description: "Access Yahoo fantasy football data and league management",
    provider: "Yahoo",
    category: "Fantasy Sports",
    status: "connected",
    endpoints: 12,
    rateLimit: "500 requests/hour",
    pricing: "Premium required",
    icon: Globe,
    color: "purple"
  },
  {
    id: "3",
    name: "NFL Stats API",
    description: "Real-time NFL statistics and player data",
    provider: "NFL",
    category: "Sports Data",
    status: "available",
    endpoints: 25,
    rateLimit: "2000 requests/hour",
    pricing: "Usage-based",
    icon: Activity,
    color: "blue"
  },
  {
    id: "4",
    name: "Weather API",
    description: "Weather data for game day conditions and analysis",
    provider: "OpenWeather",
    category: "External Data",
    status: "available",
    endpoints: 8,
    rateLimit: "1000 requests/day",
    pricing: "Free tier available",
    icon: CloudRain,
    color: "cyan"
  }
]

const categories = [
  "All",
  "Analytics",
  "AI/ML",
  "UI/UX",
  "Integration",
  "Draft Tools",
  "Communication"
]

export default function PluginsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTab, setSelectedTab] = useState<"plugins" | "integrations">("plugins")

  const filteredPlugins = mockPlugins.filter(plugin => {
    const matchesCategory = selectedCategory === "All" || plugin.category === selectedCategory
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getPriceColor = (price: string) => {
    switch (price) {
      case "free": return "text-green-400"
      case "premium": return "text-yellow-400"
      case "enterprise": return "text-purple-400"
      default: return "text-slate-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "installed": return "text-green-400"
      case "available": return "text-blue-400"
      case "updating": return "text-yellow-400"
      case "connected": return "text-green-400"
      case "error": return "text-red-400"
      default: return "text-slate-400"
    }
  }

  const renderPluginCard = (plugin: Plugin) => {
    const Icon = plugin.icon
    
    return (
      <motion.div
        key={plugin.id}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan rounded-2xl p-6 h-full transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-${plugin.color}-400/20`}>
                <Icon className={`w-6 h-6 text-${plugin.color}-400`} />
              </div>
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white">{plugin.name}</h3>
                <p className="text-sm text-slate-400">by {plugin.author}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-white">{plugin.rating}</span>
              </div>
              <span className={`text-xs font-medium ${getPriceColor(plugin.price)}`}>
                {plugin.price.toUpperCase()}
              </span>
            </div>
          </div>
          
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">{plugin.description}</p>
          
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
            <span>v{plugin.version}</span>
            <span>•</span>
            <span>{plugin.downloads.toLocaleString()} downloads</span>
            <span>•</span>
            <span>{plugin.size}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {plugin.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-slate-800/50 text-slate-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${getStatusColor(plugin.status)}`}>
              {plugin.status.charAt(0).toUpperCase() + plugin.status.slice(1)}
            </span>
            <div className="flex items-center gap-2">
              {plugin.status === "installed" ? (
                <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20">
                  <Settings className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30">
                  <Download className="w-4 h-4 mr-2" />
                  Install
                </Button>
              )}
              <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  const renderAPICard = (api: APIIntegration) => {
    const Icon = api.icon
    
    return (
      <motion.div
        key={api.id}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="backdrop-blur-xl bg-white/5 border border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple rounded-2xl p-6 h-full transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-${api.color}-400/20`}>
                <Icon className={`w-6 h-6 text-${api.color}-400`} />
              </div>
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white">{api.name}</h3>
                <p className="text-sm text-slate-400">{api.provider}</p>
              </div>
            </div>
            <span className={`text-xs font-medium ${getStatusColor(api.status)}`}>
              {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
            </span>
          </div>
          
          <p className="text-slate-300 text-sm mb-4">{api.description}</p>
          
          <div className="space-y-2 mb-4 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Endpoints:</span>
              <span>{api.endpoints}</span>
            </div>
            <div className="flex justify-between">
              <span>Rate Limit:</span>
              <span>{api.rateLimit}</span>
            </div>
            <div className="flex justify-between">
              <span>Pricing:</span>
              <span>{api.pricing}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">{api.category}</span>
            <div className="flex items-center gap-2">
              {api.status === "connected" ? (
                <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-purple-400/20">
                  <Settings className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" className="backdrop-blur-xl bg-purple-400/20 border-purple-400/50 hover:bg-purple-400/30">
                  <Zap className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              )}
              <Button size="sm" variant="ghost" className="backdrop-blur-xl bg-white/5 hover:bg-purple-400/20">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

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
                Plugin Marketplace
              </h1>
              <p className="text-slate-300 text-lg">
                Extend PlayerLAB with powerful plugins and API integrations
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Plugin
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
          <div className="flex items-center gap-4 mb-6">
            {[
              { value: "plugins", label: "Plugins", icon: Puzzle },
              { value: "integrations", label: "API Integrations", icon: Zap }
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={selectedTab === tab.value ? "default" : "outline"}
                onClick={() => setSelectedTab(tab.value as "plugins" | "integrations")}
                className={`backdrop-blur-xl ${
                  selectedTab === tab.value
                    ? "bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                    : "bg-white/5 border-white/20 hover:bg-cyan-400/20"
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 backdrop-blur-xl bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 backdrop-blur-xl bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Content */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {selectedTab === "plugins" && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredPlugins.map(renderPluginCard)}
            </div>
          )}

          {selectedTab === "integrations" && (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {mockAPIIntegrations.map(renderAPICard)}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  )
} 