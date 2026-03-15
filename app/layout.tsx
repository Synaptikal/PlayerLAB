import type { Metadata, Viewport } from "next"
import { Cinzel, Lora, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/navigation/sidebar"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PlayerLAB — TTRPG Content Platform",
  description:
    "A curated platform for tabletop RPG creators and game masters. Discover adventures, tools, and content crafted by the TTRPG community.",
  keywords: ["TTRPG", "tabletop RPG", "D&D", "Pathfinder", "adventures", "campaigns", "dungeon master", "game master"],
  authors: [{ name: "PlayerLAB" }],
  openGraph: {
    title: "PlayerLAB — TTRPG Content Platform",
    description: "Discover adventures, tools, and content crafted by the TTRPG community.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0E0F1A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${lora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="app-shell">
            <Sidebar />
            <main className="app-main" id="main-content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
