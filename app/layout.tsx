import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navigation/navbar"
import MainWrapper from "@/components/layout/main-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlayerLAB - Ultimate Fantasy Football Platform",
  description: "The ultimate fantasy football platform with real-time data integration, AI-powered analysis, and comprehensive insights for NFL fantasy leagues.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-slate-900">
            <Navbar />
            <MainWrapper>
              {children}
            </MainWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
