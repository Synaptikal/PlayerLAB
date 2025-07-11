"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Newspaper, BarChart3, Users, Mail, Menu, X } from "lucide-react"
import { FlaskLogo } from "@/components/ui/flask-logo"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/about", label: "About", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
]

export function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsExpanded(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    setIsExpanded(false)
  }, [pathname])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-0 right-0 z-50 flex justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <nav className="glass-effect rounded-full px-4 py-2 border border-white/20 glow-blue max-w-fit">
            <div className="flex items-center gap-2">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 px-2">
                <FlaskLogo size="sm" animated={false} showBubbles={false} />
                <span className="font-orbitron font-bold text-sm neon-blue hidden sm:block">PlayerLAB</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1 ml-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-blue-500/20 text-blue-400 glow-blue"
                        : "text-slate-300 hover:text-blue-400 hover:bg-white/10 hover:glow-blue",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-orbitron text-xs uppercase tracking-wide">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 hover:glow-blue transition-all ml-2"
              >
                {isExpanded ? <X className="w-5 h-5 neon-blue" /> : <Menu className="w-5 h-5 neon-blue" />}
              </button>
            </div>

            {/* Mobile Expanded Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="md:hidden mt-3 pt-3 border-t border-white/20"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          pathname === item.href
                            ? "bg-blue-500/20 text-blue-400"
                            : "text-slate-300 hover:text-blue-400 hover:bg-white/10",
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-orbitron text-xs uppercase tracking-wide">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
