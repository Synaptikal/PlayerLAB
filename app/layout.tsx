import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HolographicBackground } from "@/components/ui/holographic-background"
import Navbar from "@/components/navigation/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlayerLAB - Advanced Fantasy Sports Analytics",
  description: "Dominate your fantasy league with real-time analytics, player insights, and winning strategies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        {/* Holographic Background */}
        <HolographicBackground />

        {/* Top Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  )
}
