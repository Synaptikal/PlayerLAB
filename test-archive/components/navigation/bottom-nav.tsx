"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Wrench, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home, color: "cyan" },
  { href: "/vault", label: "Vault", icon: User, color: "purple" },
  { href: "/tools/draft-kit", label: "Draft", icon: Wrench, color: "green" },
  { href: "/analytics", label: "Analytics", icon: BarChart3, color: "pink" },
  { href: "/settings", label: "Settings", icon: Settings, color: "cyan" },
]

export function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === pathname)
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [pathname])

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      cyan: isActive ? "text-cyan-400" : "text-slate-400",
      purple: isActive ? "text-purple-400" : "text-slate-400",
      pink: isActive ? "text-pink-400" : "text-slate-400",
      green: isActive ? "text-green-400" : "text-slate-400",
    }
    return colors[color as keyof typeof colors] || colors.cyan
  }

  const getGlowClass = (color: string) => {
    const glows = {
      cyan: "glow-cyan",
      purple: "glow-purple",
      pink: "glow-pink",
      green: "glow-green",
    }
    return glows[color as keyof typeof glows] || glows.cyan
  }

  return (
    <>
      {/* Bottom padding for content */}
      <div className="h-20" />

      {/* Bottom Navigation - Always Visible */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Holographic Background */}
        <div className="relative">
          <div
            className="absolute inset-0 backdrop-blur-2xl"
            style={{
              background: `linear-gradient(
                135deg,
                rgba(10, 10, 15, 0.95) 0%,
                rgba(6, 182, 212, 0.08) 25%,
                rgba(139, 92, 246, 0.08) 50%,
                rgba(236, 72, 153, 0.08) 75%,
                rgba(10, 10, 15, 0.95) 100%
              )`,
            }}
          />

          {/* Neon Top Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Navigation Content */}
          <div className="relative px-4 py-2">
            <div className="flex items-center justify-around max-w-md mx-auto">
              {navItems.map((item, index) => {
                const isActive = index === activeIndex
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href} className="relative">
                    <motion.div
                      className={cn(
                        "relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
                        "min-w-[60px] min-h-[60px]",
                        isActive && "scale-110",
                      )}
                      whileTap={{ scale: 0.95 }}
                      onTap={() => setActiveIndex(index)}
                    >
                      {/* Active Background Glow */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className={cn("absolute inset-0 rounded-2xl opacity-20", getGlowClass(item.color))}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.3 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring" }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Holographic Ring for Active Item */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute -inset-2 border-2 border-cyan-400/40 rounded-full"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring" }}
                          >
                            <motion.div
                              className="absolute inset-0 border border-purple-400/30 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Icon */}
                      <motion.div
                        className="relative z-10 mb-1"
                        animate={isActive ? { y: -2 } : { y: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <Icon
                          className={cn(
                            "w-6 h-6 transition-all duration-300",
                            getColorClasses(item.color, isActive),
                            isActive && "drop-shadow-glow",
                          )}
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 8px ${
                                  item.color === "cyan"
                                    ? "#06b6d4"
                                    : item.color === "purple"
                                      ? "#8b5cf6"
                                      : item.color === "pink"
                                        ? "#ec4899"
                                        : "#10b981"
                                })`
                              : "none",
                          }}
                        />
                      </motion.div>

                      {/* Label */}
                      <motion.span
                        className={cn(
                          "text-xs font-orbitron font-medium transition-all duration-300 relative z-10",
                          getColorClasses(item.color, isActive),
                          isActive && "font-bold",
                        )}
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          textShadow: isActive
                            ? `0 0 8px ${
                                item.color === "cyan"
                                  ? "#06b6d4"
                                  : item.color === "purple"
                                    ? "#8b5cf6"
                                    : item.color === "pink"
                                      ? "#ec4899"
                                      : "#10b981"
                              }`
                            : "none",
                        }}
                      >
                        {item.label}
                      </motion.span>

                      {/* Active Indicator Dot */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className={cn(
                              "absolute -top-1 w-2 h-2 rounded-full",
                              item.color === "cyan"
                                ? "bg-cyan-400"
                                : item.color === "purple"
                                  ? "bg-purple-400"
                                  : item.color === "pink"
                                    ? "bg-pink-400"
                                    : "bg-green-400",
                            )}
                            initial={{ scale: 0, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0, y: 10 }}
                            transition={{ duration: 0.3, type: "spring" }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Floating Particles for Active Item */}
                      <AnimatePresence>
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={cn(
                                  "absolute w-1 h-1 rounded-full",
                                  item.color === "cyan"
                                    ? "bg-cyan-400/60"
                                    : item.color === "purple"
                                      ? "bg-purple-400/60"
                                      : item.color === "pink"
                                        ? "bg-pink-400/60"
                                        : "bg-green-400/60",
                                )}
                                style={{
                                  left: `${20 + i * 20}%`,
                                  top: `${30 + i * 10}%`,
                                }}
                                animate={{
                                  y: [-8, 8, -8],
                                  opacity: [0.3, 1, 0.3],
                                  scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2 + i * 0.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  ease: "easeInOut",
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Center Action Button (Optional) */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}
