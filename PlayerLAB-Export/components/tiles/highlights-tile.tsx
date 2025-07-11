"use client"

import { motion } from "framer-motion"
import { Play, Video, Eye } from "lucide-react"
import Image from "next/image"

interface HighlightsTileProps {
  delay?: number
}

const mockHighlights = [
  {
    id: "1",
    title: "Josh Allen 45-yard TD Pass",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Highlight+1",
    duration: "0:32",
    views: "2.1M",
  },
  {
    id: "2",
    title: "McCaffrey 80-yard Breakaway",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Highlight+2",
    duration: "0:28",
    views: "1.8M",
  },
  {
    id: "3",
    title: "Kelce Game-Winning Catch",
    thumbnail: "/placeholder.svg?height=120&width=200&text=Highlight+3",
    duration: "0:41",
    views: "3.2M",
  },
]

export function HighlightsTile({ delay = 0 }: HighlightsTileProps) {
  return (
    <motion.div
      className="fantasy-panel h-96 group cursor-pointer"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="glass-tile p-3 rounded-lg glow-purple">
          <Video className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white">Game Highlights</h3>
          <p className="text-sm text-slate-400">Top plays and moments</p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="space-y-4">
        {mockHighlights.map((highlight, index) => (
          <motion.div
            key={highlight.id}
            className="glass-tile p-3 hover:bg-white/15 transition-all duration-300 group/item cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={highlight.thumbnail || "/placeholder.svg"}
                  alt={highlight.title}
                  width={80}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center group-hover/item:bg-black/20 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {highlight.duration}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-orbitron font-semibold text-sm text-white group-hover/item:text-purple-400 transition-colors line-clamp-2">
                  {highlight.title}
                </h4>
                <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
                  <Eye className="w-3 h-3" />
                  {highlight.views} views
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
