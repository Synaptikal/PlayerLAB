"use client"

import type React from "react"

import { useEffect } from "react"
import { enforceDesignSystem } from "@/lib/design-system"

interface DesignSystemGuardProps {
  children: React.ReactNode
}

export function DesignSystemGuard({ children }: DesignSystemGuardProps) {
  useEffect(() => {
    enforceDesignSystem()

    if (process.env.NODE_ENV === "development") {
      // Check for forbidden Tailwind classes in development
      const checkForbiddenClasses = () => {
        const forbiddenClasses = [
          "bg-gray-",
          "bg-blue-",
          "bg-green-",
          "border-gray-",
          "shadow-sm",
          "shadow-md",
          "shadow-lg",
          "backdrop-blur-sm",
          "backdrop-blur-md",
        ]

        const elements = document.querySelectorAll("*")
        elements.forEach((el) => {
          const classList = Array.from(el.classList)
          const violations = classList.filter((cls) => forbiddenClasses.some((forbidden) => cls.includes(forbidden)))

          if (violations.length > 0) {
            console.warn("🚨 Design System Violation:", {
              element: el,
              violations,
              message: "Use PlayerLAB Design System components instead",
            })
          }
        })
      }

      // Run check after component mount
      setTimeout(checkForbiddenClasses, 1000)
    }
  }, [])

  return <>{children}</>
}
