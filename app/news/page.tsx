"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Clock, ArrowRight } from "lucide-react"
import { useNewsStore } from "@/lib/store"
import Image from "next/image"

const categories = ["All", "Injuries", "Waivers", "Draft", "Trades"]

export default function NewsPage() {
  const { filteredArticles, selectedCategory, searchQuery, setArticles, setSelectedCategory, setSearchQuery } =
    useNewsStore()

  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 9

  useEffect(() => {
    const fetchNews = async () => {
      const mockArticles = [
        {
          id: "1",
          title: "Week 8 Waiver Wire Targets: Hidden Gems to Add Now",
          summary: "Discover the under-the-radar players that could be league winners this week.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Waivers",
          publishedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          title: "Injury Report: Key Players to Monitor This Week",
          summary: "Latest updates on injured stars and their fantasy impact.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Injuries",
          publishedAt: "2024-01-15T08:30:00Z",
        },
        {
          id: "3",
          title: "Trade Deadline Moves That Could Shake Up Fantasy",
          summary: "Analyzing recent trades and their fantasy football implications.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Trades",
          publishedAt: "2024-01-14T16:45:00Z",
        },
        {
          id: "4",
          title: "2024 Draft Sleepers: Players Flying Under the Radar",
          summary: "Late-round picks that could provide massive value this season.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Draft",
          publishedAt: "2024-01-14T12:00:00Z",
        },
        {
          id: "5",
          title: "Rookie Watch: First-Year Players Making an Impact",
          summary: "Which rookies are exceeding expectations and worth adding.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Waivers",
          publishedAt: "2024-01-13T14:20:00Z",
        },
        {
          id: "6",
          title: "Championship Week Strategy: How to Secure Your Title",
          summary: "Expert tips for navigating the fantasy playoffs successfully.",
          imageUrl: "/placeholder.svg?height=200&width=300",
          category: "Draft",
          publishedAt: "2024-01-13T09:15:00Z",
        },
      ]
      setArticles(mockArticles)
    }

    fetchNews()
  }, [setArticles])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getCardSize = (index: number) => {
    const pattern = index % 6
    if (pattern === 0) return "news-card-large col-span-2 row-span-2"
    if (pattern === 1 || pattern === 2) return "news-card-medium"
    return "news-card-small"
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="title-lg font-orbitron font-bold mb-3 neon-blue">NFL NEWS & INSIGHTS</h1>
            <p className="text-compact text-dark-grey">Stay ahead with the latest fantasy sports analysis</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="fantasy-panel p-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 neon-cyan" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`btn-compact text-micro ${selectedCategory === category ? "glow-blue" : ""}`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-medium-grey" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-tile pl-10 pr-4 py-2 w-64 text-compact bg-transparent border-0 focus:glow-blue text-primary-dark placeholder-medium-grey"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className={getCardSize(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-full group cursor-pointer">
                  <div className="relative mb-3 overflow-hidden rounded-lg">
                    <Image
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      width={400}
                      height={250}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="glass-tile text-micro px-2 py-1 neon-cyan">{article.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-medium-grey text-micro">
                    <Clock className="w-3 h-3" />
                    {formatDate(article.publishedAt)}
                  </div>

                  <h3 className="title-sm font-orbitron font-semibold mb-2 text-primary-dark group-hover:neon-cyan transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-compact text-dark-grey mb-3 line-clamp-2">{article.summary}</p>

                  <div className="flex items-center gap-2 text-cyan-400 text-compact font-medium group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
