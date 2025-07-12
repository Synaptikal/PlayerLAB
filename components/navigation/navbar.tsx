"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FlaskLogo } from "@/components/ui/flask-logo"
import { Menu, X, Home, User, BarChart3, Settings, Target, LayoutDashboard, FlaskConical, Puzzle, Trophy, TrendingUp, Activity, Zap, Brain, Users } from 'lucide-react'
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home, color: "cyan" },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, color: "blue" },
  { href: "/vault", label: "Vault", icon: User, color: "purple" },
  { href: "/news", label: "News", icon: TrendingUp, color: "green" },
  { href: "/trends", label: "Trends", icon: Activity, color: "emerald" },
  { href: "/hype", label: "Hype", icon: Zap, color: "pink" },
  { href: "/analysis", label: "Analysis", icon: Brain, color: "indigo" },
  { href: "/tools/draft-kit", label: "Draft Kit", icon: Target, color: "orange" },
  { href: "/tools/trade-analyzer", label: "Trade Analyzer", icon: Target, color: "red" },
  { href: "/tools/smart-tester", label: "Smart Tester", icon: FlaskConical, color: "violet" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, color: "teal" },
  { href: "/plugins", label: "Plugins", icon: Puzzle, color: "amber" },
  { href: "/achievements", label: "Achievements", icon: Trophy, color: "yellow" },
  { href: "/leagues", label: "Leagues", icon: Users, color: "lime" },
  { href: "/teams", label: "Teams", icon: Users, color: "sky" },
  { href: "/players", label: "Players", icon: User, color: "rose" },
  { href: "/matchups", label: "Matchups", icon: Target, color: "fuchsia" },
  { href: "/settings", label: "Settings", icon: Settings, color: "slate" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      if (currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsOpen(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      cyan: isActive ? "text-cyan-400" : "text-slate-300",
      blue: isActive ? "text-blue-400" : "text-slate-300",
      purple: isActive ? "text-purple-400" : "text-slate-300",
      green: isActive ? "text-green-400" : "text-slate-300",
      emerald: isActive ? "text-emerald-400" : "text-slate-300",
      pink: isActive ? "text-pink-400" : "text-slate-300",
      indigo: isActive ? "text-indigo-400" : "text-slate-300",
      orange: isActive ? "text-orange-400" : "text-slate-300",
      red: isActive ? "text-red-400" : "text-slate-300",
      violet: isActive ? "text-violet-400" : "text-slate-300",
      teal: isActive ? "text-teal-400" : "text-slate-300",
      amber: isActive ? "text-amber-400" : "text-slate-300",
      yellow: isActive ? "text-yellow-400" : "text-slate-300",
      lime: isActive ? "text-lime-400" : "text-slate-300",
      sky: isActive ? "text-sky-400" : "text-slate-300",
      rose: isActive ? "text-rose-400" : "text-slate-300",
      fuchsia: isActive ? "text-fuchsia-400" : "text-slate-300",
      slate: isActive ? "text-slate-400" : "text-slate-300",
    }
    return colors[color as keyof typeof colors] || colors.cyan
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modern Glass Background */}
          <div className="relative">
            <div
              className={cn(
                "absolute inset-0 backdrop-blur-xl transition-all duration-300",
                isScrolled 
                  ? "bg-slate-900/95 border-b border-cyan-400/20" 
                  : "bg-slate-900/80 border-b border-cyan-400/10"
              )}
              style={{
                background: isScrolled 
                  ? "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(6, 182, 212, 0.1) 100%)"
                  : "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(6, 182, 212, 0.05) 100%)"
              }}
            />
            
            {/* Animated Border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            
            {/* Navigation Content */}
            <div className="relative container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FlaskLogo size="sm" animated={true} />
                  </motion.div>
                  <motion.span 
                    className="font-orbitron font-bold text-xl text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    PlayerLAB
                  </motion.span>
                </Link>

                {/* Desktop Navigation - Simplified */}
                <div className="hidden lg:flex items-center space-x-2">
                  {navItems.slice(0, 8).map((item, index) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="relative group"
                      >
                        <motion.div
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden",
                            isActive
                              ? "text-white bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/50"
                              : "text-slate-300 hover:text-white hover:bg-white/5"
                          )}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Icon */}
                          <Icon className={cn(
                            "w-4 h-4 relative z-10",
                            getColorClasses(item.color, isActive)
                          )} />
                          
                          {/* Label */}
                          <span className="relative z-10">
                            {item.label}
                          </span>
                        </motion.div>
                      </Link>
                    )
                  })}
                  
                  {/* More dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300">
                      <span>More</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="p-2 grid grid-cols-2 gap-1">
                        {navItems.slice(8).map((item) => {
                          const isActive = pathname === item.href
                          const Icon = item.icon
                          
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-300",
                                isActive
                                  ? "text-white bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                                  : "text-slate-300 hover:text-white hover:bg-white/5"
                              )}
                            >
                              <Icon className={cn(
                                "w-4 h-4",
                                getColorClasses(item.color, isActive)
                              )} />
                              <span>{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </button>
              </div>

              {/* Mobile Navigation */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="lg:hidden border-t border-cyan-400/20"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="py-4 space-y-2">
                      {navItems.map((item, index) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block"
                          >
                            <motion.div
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                                isActive
                                  ? "text-white bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/50"
                                  : "text-slate-300 hover:text-white hover:bg-white/5"
                              )}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                              <Icon className={cn(
                                "w-5 h-5",
                                getColorClasses(item.color, isActive)
                              )} />
                              <span className="font-medium">{item.label}</span>
                            </motion.div>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
