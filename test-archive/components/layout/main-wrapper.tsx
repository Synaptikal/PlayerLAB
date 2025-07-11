"use client"

import { useState, useEffect } from "react"
import type { ReactNode } from "react"

interface MainWrapperProps {
  children: ReactNode
}

export function MainWrapper({ children }: MainWrapperProps) {
  const [sidebarWidth, setSidebarWidth] = useState(60)

  useEffect(() => {
    // Listen for sidebar width changes
    const handleSidebarChange = () => {
      const sidebar = document.querySelector("[data-sidebar]") as HTMLElement
      if (sidebar) {
        const width = sidebar.offsetWidth
        setSidebarWidth(width)
      }
    }

    // Initial check
    handleSidebarChange()

    // Listen for resize events
    window.addEventListener("resize", handleSidebarChange)

    // Use MutationObserver to watch for sidebar changes
    const observer = new MutationObserver(handleSidebarChange)
    const sidebar = document.querySelector("[data-sidebar]")
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["style", "class"] })
    }

    return () => {
      window.removeEventListener("resize", handleSidebarChange)
      observer.disconnect()
    }
  }, [])

  return (
    <main
      className="min-h-screen transition-all duration-500 ease-out relative"
      style={{
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
      }}
    >
      {children}
    </main>
  )
}
