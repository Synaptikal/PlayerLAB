import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navigation/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: {
    default: "PlayerLAB - Advanced Fantasy Sports Analytics Platform",
    template: "%s | PlayerLAB"
  },
  description: "The ultimate fantasy sports platform with AI-powered analytics, trade analysis, draft tools, and real-time insights. Dominate your league with PlayerLAB.",
  keywords: [
    "fantasy sports",
    "fantasy football",
    "fantasy basketball",
    "fantasy baseball",
    "trade analyzer",
    "draft kit",
    "analytics",
    "AI",
    "machine learning",
    "sports analytics",
    "player rankings",
    "fantasy tools"
  ],
  authors: [{ name: "PlayerLAB Team" }],
  creator: "PlayerLAB",
  publisher: "PlayerLAB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://playerlab.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://playerlab.net",
    title: "PlayerLAB - Advanced Fantasy Sports Analytics Platform",
    description: "The ultimate fantasy sports platform with AI-powered analytics, trade analysis, draft tools, and real-time insights. Dominate your league with PlayerLAB.",
    siteName: "PlayerLAB",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlayerLAB - Advanced Fantasy Sports Analytics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayerLAB - Advanced Fantasy Sports Analytics Platform",
    description: "The ultimate fantasy sports platform with AI-powered analytics, trade analysis, draft tools, and real-time insights.",
    images: ["/og-image.png"],
    creator: "@playerlab",
    site: "@playerlab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Sports",
  classification: "Fantasy Sports Analytics",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "PlayerLAB",
    "application-name": "PlayerLAB",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#000000",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PlayerLAB",
              "description": "Advanced Fantasy Sports Analytics Platform",
              "url": "https://playerlab.net",
              "applicationCategory": "SportsApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "PlayerLAB"
              },
              "publisher": {
                "@type": "Organization",
                "name": "PlayerLAB"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
