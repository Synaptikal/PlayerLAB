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
  GripVertical
} from "lucide-react"
import { useState } from "react"
import { useDashboardStore, DashboardWidget } from "@/lib/store"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import {
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Sortable Widget Component
function SortableWidget({ widget }: { widget: DashboardWidget }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: "border-cyan-400/30 hover:border-cyan-400/60 hover:shadow-glow-cyan",
      green: "border-green-400/30 hover:border-green-400/60 hover:shadow-glow-green",
      purple: "border-purple-400/30 hover:border-purple-400/60 hover:shadow-glow-purple",
      yellow: "border-yellow-400/30 hover:border-yellow-400/60 hover:shadow-glow-yellow",
    }
    return colors[color as keyof typeof colors] || colors.cyan
  }

  const renderWidget = (widget: DashboardWidget) => {
    switch (widget.type) {
      case "stats":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-white">{widget.data.wins}-{widget.data.losses}</div>
                <div className="text-sm text-slate-400">Record</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-cyan-400">{widget.data.rank}</div>
                <div className="text-sm text-slate-400">Rank</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Points For</span>
                <span className="text-sm font-semibold text-white">{widget.data.pointsFor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-400">Points Against</span>
                <span className="text-sm font-semibold text-white">{widget.data.pointsAgainst}</span>
              </div>
            </div>
          </div>
        )

      case "players":
        return (
          <div className="space-y-3">
            {widget.data.map((player: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">{player.name}</div>
                  <div className="text-xs text-slate-400">{player.points} pts</div>
                </div>
                <div className={`flex items-center gap-1 ${
                  player.trend === "up" ? "text-green-400" : "text-red-400"
                }`}>
                  {player.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )

      case "schedule":
        return (
          <div className="space-y-3">
            {widget.data.map((matchup: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">vs {matchup.opponent}</div>
                  <div className="text-xs text-slate-400">Week {matchup.week}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded ${
                  matchup.difficulty === "Easy" ? "bg-green-400/20 text-green-400" :
                  matchup.difficulty === "Medium" ? "bg-yellow-400/20 text-yellow-400" :
                  "bg-red-400/20 text-red-400"
                }`}>
                  {matchup.difficulty}
                </div>
              </div>
            ))}
          </div>
        )

      case "alerts":
        return (
          <div className="space-y-3">
            {widget.data.map((alert: any, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === "trade" ? "bg-cyan-400" :
                  alert.type === "waiver" ? "bg-green-400" :
                  "bg-red-400"
                }`} />
                <div className="flex-1">
                  <div className="text-sm text-white">{alert.message}</div>
                  <div className="text-xs text-slate-400">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return <div>Widget not found</div>
    }
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      whileHover={{ scale: isDragging ? 1.05 : 1.02, y: isDragging ? 0 : -5 }}
      transition={{ duration: 0.3 }}
      className="group cursor-move"
    >
      <Card className={`backdrop-blur-xl bg-white/5 border transition-all duration-300 ${getColorClasses(widget.color)} ${isDragging ? 'opacity-50' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-orbitron font-semibold text-white">
            {widget.title}
          </h3>
          <div className="flex items-center gap-2">
            <div
              {...attributes}
              {...listeners}
              className="p-1 hover:bg-white/10 rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <GripVertical className="w-4 h-4 text-slate-400" />
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Settings className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-6 h-6 p-0 backdrop-blur-xl bg-white/5 hover:bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-3 h-3" />
            </Button>
          </div>
        </div>
        {renderWidget(widget)}
      </Card>
    </motion.div>
  )
}

const quickActions = [
  { icon: Plus, label: "Add Player", action: "add-player" },
  { icon: Share2, label: "Share Team", action: "share-team" },
  { icon: Download, label: "Export Data", action: "export" },
  { icon: Settings, label: "Settings", action: "settings" }
]

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const { widgets, setWidgets, moveWidget, resetWidgets } = useDashboardStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = widgets.findIndex((widget) => widget.id === active.id)
      const newIndex = widgets.findIndex((widget) => widget.id === over?.id)

      moveWidget(oldIndex, newIndex)
    }
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
                Dashboard
              </h1>
              <p className="text-slate-300 text-lg">
                Your fantasy command center with real-time insights and analytics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32 backdrop-blur-xl bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-slate-900 border-cyan-400/30">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="season">This Season</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="backdrop-blur-xl bg-cyan-400/20 border-cyan-400/50 hover:bg-cyan-400/30"
                onClick={() => resetWidgets()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Layout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.section
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.action}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="backdrop-blur-xl bg-white/5 border-white/20 hover:bg-cyan-400/20"
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dashboard Grid with Drag and Drop */}
        <motion.section
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {widgets.map((widget, index) => (
                  <SortableWidget key={widget.id} widget={widget} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </motion.section>

        {/* Live Status Bar */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="backdrop-blur-xl bg-slate-900/80 rounded-2xl border border-cyan-400/30 p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-orbitron text-green-400 uppercase tracking-wide">Live</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-mono text-slate-400">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-300">2nd Place</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 