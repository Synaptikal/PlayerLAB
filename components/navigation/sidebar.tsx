"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/ui/logo"
import {
  LayoutDashboard,
  BookOpen,
  Swords,
  Wrench,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard, section: null },
  { href: "/library",    label: "Library",     icon: BookOpen,        section: "Explore" },
  { href: "/campaigns",  label: "Campaigns",   icon: Swords,          section: "Explore" },
  { href: "/creators",   label: "Creators",    icon: Users,           section: "Explore" },
  { href: "/tools",      label: "Tools",       icon: Wrench,          section: "Create" },
  { href: "/community",  label: "Community",   icon: MessageSquare,   section: "Create" },
  { href: "/settings",   label: "Settings",    icon: Settings,        section: null },
]

const sections = ["Explore", "Create"]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const NavContent = () => (
    <>
      <div className="px-6 py-6 border-b border-bg-border flex-shrink-0">
        <Logo size="sm" />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navItems
          .filter((item) => item.section === null && item.href !== "/settings")
          .map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}

        {sections.map((section) => {
          const items = navItems.filter((item) => item.section === section)
          return (
            <div key={section} className="mt-6">
              <p className="section-label px-3 mb-2">{section}</p>
              {items.map((item) => (
                <NavItem key={item.href} item={item} pathname={pathname} />
              ))}
            </div>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-bg-border flex-shrink-0 space-y-1">
        <NavItem
          item={navItems.find((i) => i.href === "/settings")!}
          pathname={pathname}
        />
        <div className="px-3 pt-3">
          <Button variant="secondary" size="sm" className="w-full" asChild>
            <Link href="/library">Browse Content</Link>
          </Button>
        </div>
        <p className="text-center font-mono text-[0.6rem] text-text-muted pt-2 tracking-widest uppercase">
          v1.0.0
        </p>
      </div>
    </>
  )

  return (
    <>
      <aside
        className="app-sidebar hidden lg:flex flex-col"
        aria-label="Site navigation"
      >
        <NavContent />
      </aside>

      <button
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-md bg-bg-surface border border-bg-border text-text-secondary hover:text-gold-primary hover:border-gold-muted transition-colors duration-[150ms]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-bg-base/80 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-[280px] z-50 flex flex-col",
          "bg-bg-surface border-r border-bg-border",
          "transition-transform duration-[300ms] ease-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <NavContent />
      </aside>
    </>
  )
}

interface NavItemProps {
  item: { href: string; label: string; icon: React.ElementType }
  pathname: string
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive =
    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-md font-sans text-sm font-medium",
        "transition-all duration-[150ms] ease-out",
        isActive
          ? "bg-bg-elevated text-gold-primary border border-gold-muted/40"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-transparent"
      )}
    >
      <Icon
        className={cn(
          "w-[18px] h-[18px] flex-shrink-0 transition-colors duration-[150ms]",
          isActive
            ? "text-gold-primary"
            : "text-text-muted group-hover:text-text-secondary"
        )}
        aria-hidden="true"
      />
      <span className="flex-1 truncate">{item.label}</span>
      {isActive && (
        <ChevronRight
          className="w-3.5 h-3.5 text-gold-muted flex-shrink-0"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}
