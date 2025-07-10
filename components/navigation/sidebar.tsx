"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import { NFLButton } from "@/components/ui/nfl-button"
import { Home, Newspaper, BarChart3, Users, Mail, Menu, X, Trophy, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/news", label: "NFL News", icon: Newspaper },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const shouldExpand = isExpanded || isHovered

  // Handle clicks outside sidebar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded])

  // Auto-collapse on route change
  useEffect(() => {
    setIsExpanded(false)
    setIsHovered(false)
  }, [pathname])

  // Prevent body scroll when sidebar is expanded on mobile
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isExpanded])

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        ref={sidebarRef}
        data-sidebar
        className={cn(
          "fixed left-0 top-0 h-full z-50 flex flex-col",
          "nfl-glass border-r-2 border-blue-500/30",
          "transition-all duration-500 ease-out",
        )}
        style={{
          width: shouldExpand ? "280px" : "60px",
          background: `linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(14, 165, 233, 0.08) 50%,
            rgba(15, 23, 42, 0.98) 100%
          )`,
          backdropFilter: "blur(32px) saturate(200%)",
          boxShadow: shouldExpand
            ? "4px 0 32px rgba(14, 165, 233, 0.2), 0 0 0 1px rgba(14, 165, 233, 0.1)"
            : "4px 0 16px rgba(0, 0, 0, 0.3)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header Section */}
        <div className="p-4 border-b border-blue-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center min-w-0">
              <AnimatePresence mode="wait">
                {shouldExpand ? (
                  <motion.div
                    key="expanded-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="truncate"
                  >
                    <Logo variant="nfl" size="sm" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 nfl-glass rounded-lg flex items-center justify-center nfl-glow-blue flex-shrink-0"
                  >
                    <span className="font-orbitron font-bold neon-blue text-sm">PL</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle Button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "p-2 rounded-lg nfl-glass hover:nfl-glow-blue transition-all duration-300 flex-shrink-0",
                shouldExpand ? "ml-2" : "ml-0",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isExpanded ? <X className="w-5 h-5 neon-blue" /> : <Menu className="w-5 h-5 neon-blue" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
                    "text-slate-300 hover:text-blue-400 hover:bg-blue-500/10",
                    "border border-transparent hover:border-blue-500/30",
                    pathname === item.href && "text-blue-400 bg-blue-500/15 border-blue-500/40",
                  )}
                  title={!shouldExpand ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />

                  {/* Label with proper overflow handling */}
                  <AnimatePresence>
                    {shouldExpand && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="font-orbitron font-medium text-sm uppercase tracking-wide whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for collapsed state */}
                  {!shouldExpand && (
                    <div
                      className={cn(
                        "absolute left-full ml-3 px-3 py-2 bg-slate-900/90 text-white text-sm rounded-lg",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        "pointer-events-none whitespace-nowrap z-50 border border-blue-500/30",
                      )}
                    >
                      {item.label}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-blue-500/20 flex-shrink-0">
          <AnimatePresence mode="wait">
            {shouldExpand ? (
              <motion.div
                key="expanded-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <NFLButton size="sm" className="w-full">
                  <Trophy className="w-4 h-4 mr-2" />
                  Get Started
                </NFLButton>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Fantasy Edge</p>
                  <p className="text-xs neon-cyan font-mono">v2.0.1</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-footer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <div className="w-8 h-8 nfl-glass rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 neon-blue" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <div
        className="transition-all duration-500 ease-out"
        style={{
          marginLeft: shouldExpand ? "280px" : "60px",
        }}
      >
        {/* This div will be used by the layout to push content */}
      </div>
    </>
  )
}
