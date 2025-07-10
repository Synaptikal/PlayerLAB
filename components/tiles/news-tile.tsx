"use client"

import { motion } from "framer-motion"
import { Newspaper, ExternalLink, Clock } from "lucide-react"
import Link from "next/link"

interface NewsTileProps {
  delay?: number
}

const mockNews = [
  {
    id: "1",
    headline: "Week 8 Waiver Wire: Hidden Gems to Target",
    source: "ESPN Fantasy",
    date: "2 hours ago",
    url: "/news/waiver-wire-week-8",
  },
  {
    id: "2",
    headline: "Injury Report: Key Players to Monitor",
    source: "NFL Network",
    date: "4 hours ago",
    url: "/news/injury-report",
  },
  {
    id: "3",
    headline: "Trade Deadline Impact on Fantasy",
    source: "FantasyPros",
    date: "6 hours ago",
    url: "/news/trade-deadline",
  },
]

export function NewsTile({ delay = 0 }: NewsTileProps) {
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
        <div className="glass-tile p-3 rounded-lg glow-cyan">
          <Newspaper className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-lg text-white">Latest News</h3>
          <p className="text-sm text-slate-400">Breaking fantasy football updates</p>
        </div>
      </div>

      {/* News Items */}
      <div className="space-y-4">
        {mockNews.map((article, index) => (
          <Link key={article.id} href={article.url}>
            <motion.div
              className="glass-tile p-4 hover:bg-white/15 transition-all duration-300 group/item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + index * 0.1 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-orbitron font-semibold text-sm text-white group-hover/item:text-cyan-400 transition-colors line-clamp-2">
                    {article.headline}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <span>{article.source}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.date}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover/item:text-cyan-400 transition-colors flex-shrink-0" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link href="/news" className="text-cyan-400 hover:text-cyan-300 font-orbitron text-sm font-medium">
          View All News →
        </Link>
      </div>
    </motion.div>
  )
}
