"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  Zap,
  Crown,
  Medal,
  Badge,
  CheckCircle,
  Clock,
  Calendar,
  Activity,
  BarChart3,
  Target as TargetIcon,
  Flame,
  Sparkles,
  Heart,
  Gift,
  Lock,
  Unlock,
  Eye,
  Share2,
  Download,
  Settings,
  Plus,
  Filter,
  Search,
  RefreshCw,
  Play,
  Pause,
  Square,
  Code,
  Database,
  Globe,
  Shield,
  TrendingDown,
  ActivitySquare,
  MousePointer,
  MousePointerClick,
  Scroll,
  Monitor,
  Smartphone,
  Globe as GlobeIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Upload,
  Share2 as Share2Icon,
  Heart as HeartIcon,
  MessageSquare,
  GitBranch,
  Package,
  ExternalLink,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Crown as CrownIcon,
  Sparkles as SparklesIcon,
  Target as TargetIcon2,
  BarChart3 as BarChart3Icon,
  FlaskConical,
  Palette,
  Bot,
  Lightbulb,
  Bell,
  CloudRain,
  Puzzle
} from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Achievement {
  id: string
  name: string
  description: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  progress: number
  maxProgress: number
  completed: boolean
  completedAt?: string
  icon: any
  color: string
  points: number
  rewards: string[]
  requirements: string[]
}

interface Badge {
  id: string
  name: string
  description: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
  unlockedAt?: string
  icon: any
  color: string
  progress: number
  maxProgress: number
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Victory",
    description: "Win your first fantasy football matchup",
    category: "Wins",
    rarity: "common",
    progress: 1,
    maxProgress: 1,
    completed: true,
    completedAt: "2024-01-10",
    icon: Trophy,
    color: "yellow",
    points: 100,
    rewards: ["Profile Badge", "100 Points"],
    requirements: ["Win 1 matchup"]
  },
  {
    id: "2",
    name: "Trade Master",
    description: "Complete 10 successful trades",
    category: "Trading",
    rarity: "rare",
    progress: 7,
    maxProgress: 10,
    completed: false,
    icon: TrendingUp,
    color: "green",
    points: 500,
    rewards: ["Trade Expert Badge", "500 Points", "Custom Trade Analyzer"],
    requirements: ["Complete 10 trades", "Maintain 70% success rate"]
  },
  {
    id: "3",
    name: "Draft Champion",
    description: "Draft a team that finishes in the top 3",
    category: "Drafting",
    rarity: "epic",
    progress: 0,
    maxProgress: 1,
    completed: false,
    icon: Crown,
    color: "purple",
    points: 1000,
    rewards: ["Draft Champion Badge", "1000 Points", "Advanced Draft Tools"],
    requirements: ["Finish in top 3", "Complete full season"]
  },
  {
    id: "4",
    name: "Analytics Guru",
    description: "Use analytics features for 30 consecutive days",
    category: "Analytics",
    rarity: "legendary",
    progress: 15,
    maxProgress: 30,
    completed: false,
    icon: BarChart3,
    color: "cyan",
    points: 2000,
    rewards: ["Analytics Guru Badge", "2000 Points", "Premium Analytics"],
    requirements: ["Use analytics daily", "30 consecutive days"]
  },
  {
    id: "5",
    name: "Plugin Pioneer",
    description: "Install and use 5 different plugins",
    category: "Plugins",
    rarity: "rare",
    progress: 3,
    maxProgress: 5,
    completed: false,
    icon: Puzzle,
    color: "blue",
    points: 750,
    rewards: ["Plugin Pioneer Badge", "750 Points", "Early Access to New Plugins"],
    requirements: ["Install 5 plugins", "Use each for 7 days"]
  },
  {
    id: "6",
    name: "Community Leader",
    description: "Help 50 other users in the community",
    category: "Community",
    rarity: "epic",
    progress: 23,
    maxProgress: 50,
    completed: false,
    icon: Users,
    color: "pink",
    points: 1500,
    rewards: ["Community Leader Badge", "1500 Points", "Moderator Access"],
    requirements: ["Help 50 users", "Maintain positive rating"]
  }
]

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Rookie",
    description: "Complete your first week",
    category: "Progression",
    rarity: "common",
    unlocked: true,
    unlockedAt: "2024-01-01",
    icon: Star,
    color: "yellow",
    progress: 1,
    maxProgress: 1
  },
  {
    id: "2",
    name: "Trade Expert",
    description: "Master the art of trading",
    category: "Trading",
    rarity: "rare",
    unlocked: false,
    icon: TrendingUp,
    color: "green",
    progress: 7,
    maxProgress: 10
  },
  {
    id: "3",
    name: "Analytics Master",
    description: "Become an analytics expert",
    category: "Analytics",
    rarity: "epic",
    unlocked: false,
    icon: BarChart3,
    color: "cyan",
    progress: 15,
    maxProgress: 30
  },
  {
    id: "4",
    name: "Legend",
    description: "Reach legendary status",
    category: "Prestige",
    rarity: "legendary",
    unlocked: false,
    icon: Crown,
    color: "purple",
    progress: 0,
    maxProgress: 100
  }
]

const categories = [
  "All",
  "Wins",
  "Trading",
  "Drafting",
  "Analytics",
  "Plugins",
  "Community"
]

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTab, setSelectedTab] = useState<"achievements" | "badges" | "leaderboard">("achievements")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAchievements = mockAchievements.filter(achievement => {
    const matchesCategory = selectedCategory === "All" || achievement.category === selectedCategory
    const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-slate-400"
      case "rare": return "text-blue-400"
      case "epic": return "text-purple-400"
      case "legendary": return "text-yellow-400"
      default: return "text-slate-400"
    }
  }

  const getRarityBgColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-slate-400/20"
      case "rare": return "bg-blue-400/20"
      case "epic": return "bg-purple-400/20"
      case "legendary": return "bg-yellow-400/20"
      default: return "bg-slate-400/20"
    }
  }

  const renderAchievementCard = (achievement: Achievement) => {
    const Icon = achievement.icon
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100
    
    return (
      <motion.div
        key={achievement.id}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`backdrop-blur-xl bg-white/5 border rounded-2xl p-6 h-full transition-all duration-300 ${
          achievement.completed 
            ? "border-green-400/60 hover:border-green-400/80 hover:shadow-glow-green" 
            : "border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan"
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${achievement.completed ? "bg-green-400/20" : `bg-${achievement.color}-400/20`}`}>
                <Icon className={`w-6 h-6 ${achievement.completed ? "text-green-400" : `text-${achievement.color}-400`}`} />
              </div>
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white">{achievement.name}</h3>
                <p className="text-sm text-slate-400">{achievement.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${getRarityBgColor(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity.toUpperCase()}
              </span>
              {achievement.completed && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </div>
          </div>
          
          <p className="text-slate-300 text-sm mb-4">{achievement.description}</p>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white">{achievement.points} points</span>
            </div>
            <div className="text-xs text-slate-400">
              <strong>Rewards:</strong> {achievement.rewards.join(", ")}
            </div>
          </div>
          
          {achievement.completed && achievement.completedAt && (
            <div className="text-xs text-green-400">
              Completed on {new Date(achievement.completedAt).toLocaleDateString()}
            </div>
          )}
        </Card>
      </motion.div>
    )
  }

  const renderBadgeCard = (badge: Badge) => {
    const Icon = badge.icon
    const progressPercentage = (badge.progress / badge.maxProgress) * 100
    
    return (
      <motion.div
        key={badge.id}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`backdrop-blur-xl bg-white/5 border rounded-2xl p-6 h-full transition-all duration-300 ${
          badge.unlocked 
            ? "border-green-400/60 hover:border-green-400/80 hover:shadow-glow-green" 
            : "border-slate-400/30 hover:border-slate-400/60"
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${badge.unlocked ? "bg-green-400/20" : "bg-slate-400/20"}`}>
                <Icon className={`w-6 h-6 ${badge.unlocked ? "text-green-400" : "text-slate-400"}`} />
              </div>
              <div>
                <h3 className="text-lg font-orbitron font-semibold text-white">{badge.name}</h3>
                <p className="text-sm text-slate-400">{badge.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${getRarityBgColor(badge.rarity)} ${getRarityColor(badge.rarity)}`}>
                {badge.rarity.toUpperCase()}
              </span>
              {badge.unlocked ? (
                <Unlock className="w-4 h-4 text-green-400" />
              ) : (
                <Lock className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>
          
          <p className="text-slate-300 text-sm mb-4">{badge.description}</p>
          
          {!badge.unlocked && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">{badge.progress}/{badge.maxProgress}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
          
          {badge.unlocked && badge.unlockedAt && (
            <div className="text-xs text-green-400">
              Unlocked on {new Date(badge.unlockedAt).toLocaleDateString()}
            </div>
          )}
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
                Achievements
              </h1>
              <p className="text-slate-300 text-lg">
                Track your progress, unlock badges, and climb the leaderboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-yellow-400">2,450</div>
                <div className="text-sm text-slate-400">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-purple-400">12</div>
                <div className="text-sm text-slate-400">Badges</div>
              </div>
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
              { value: "achievements", label: "Achievements", icon: Trophy },
              { value: "badges", label: "Badges", icon: Badge },
              { value: "leaderboard", label: "Leaderboard", icon: Crown }
            ].map((tab) => (
              <Button
                key={tab.value}
                variant={selectedTab === tab.value ? "default" : "outline"}
                onClick={() => setSelectedTab(tab.value as "achievements" | "badges" | "leaderboard")}
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
                placeholder="Search achievements..."
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
          </div>
        </motion.section>

        {/* Content */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {selectedTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map(renderAchievementCard)}
            </div>
          )}

          {selectedTab === "badges" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBadges.map(renderBadgeCard)}
            </div>
          )}

          {selectedTab === "leaderboard" && (
            <Card className="backdrop-blur-xl bg-white/5 border border-cyan-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-orbitron font-semibold text-white mb-6">Global Leaderboard</h3>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "FantasyMaster", points: 15420, badge: "Legend" },
                  { rank: 2, name: "TradeKing", points: 12850, badge: "Epic" },
                  { rank: 3, name: "DraftPro", points: 11230, badge: "Rare" },
                  { rank: 4, name: "AnalyticsGuru", points: 9870, badge: "Rare" },
                  { rank: 5, name: "CommunityHero", points: 8540, badge: "Common" }
                ].map((player, index) => (
                  <motion.div
                    key={player.rank}
                    className="flex items-center justify-between p-4 rounded-lg backdrop-blur-xl bg-white/5 border border-slate-400/20"
                    whileHover={{ scale: 1.01, x: 5 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-yellow-400/20 text-yellow-400" :
                        index === 1 ? "bg-slate-400/20 text-slate-400" :
                        index === 2 ? "bg-orange-400/20 text-orange-400" :
                        "bg-slate-400/20 text-slate-400"
                      }`}>
                        {player.rank}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{player.name}</div>
                        <div className="text-sm text-slate-400">{player.badge}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">{player.points.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}
        </motion.section>
      </div>
    </div>
  )
} 