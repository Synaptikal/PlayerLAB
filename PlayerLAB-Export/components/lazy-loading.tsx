"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Loading component for lazy-loaded components
export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-cyan-400`} />
    </div>
  )
}

// Lazy load pages
export const LazyAnalytics = dynamic(() => import("@/app/analytics/page"), {
  loading: () => <LoadingSpinner size="lg" />,
  ssr: false
})

export const LazyPlugins = dynamic(() => import("@/app/plugins/page"), {
  loading: () => <LoadingSpinner size="lg" />,
  ssr: false
})

export const LazyAchievements = dynamic(() => import("@/app/achievements/page"), {
  loading: () => <LoadingSpinner size="lg" />,
  ssr: false
})

export const LazyDashboard = dynamic(() => import("@/app/dashboard/page"), {
  loading: () => <LoadingSpinner size="lg" />,
  ssr: false
})

export const LazySmartTester = dynamic(() => import("@/app/tools/smart-tester/page"), {
  loading: () => <LoadingSpinner size="lg" />,
  ssr: false
})

// Wrapper component for lazy loading with error boundary
export function LazyWrapper({ 
  children, 
  fallback = <LoadingSpinner /> 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Preload critical components
export function preloadCriticalComponents() {
  // Preload components that are likely to be used
  const preloadComponents = () => {
    // Preload heavy pages
    import("@/app/analytics/page")
    import("@/app/plugins/page")
    import("@/app/achievements/page")
  }

  // Preload on user interaction
  if (typeof window !== "undefined") {
    const preloadOnInteraction = () => {
      preloadComponents()
      document.removeEventListener("mousemove", preloadOnInteraction)
      document.removeEventListener("touchstart", preloadOnInteraction)
    }

    document.addEventListener("mousemove", preloadOnInteraction, { once: true })
    document.addEventListener("touchstart", preloadOnInteraction, { once: true })
  }
} 