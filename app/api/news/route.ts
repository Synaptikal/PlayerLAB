import { NextResponse } from "next/server"

export async function GET() {
  const mockArticles = [
    {
      id: "1",
      title: "Week 8 Waiver Wire Targets: Hidden Gems to Add Now",
      summary: "Discover the under-the-radar players that could be league winners this week.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Waivers",
      publishedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      title: "Injury Report: Key Players to Monitor This Week",
      summary: "Latest updates on injured stars and their fantasy impact.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Injuries",
      publishedAt: "2024-01-15T08:30:00Z",
    },
    {
      id: "3",
      title: "Trade Deadline Moves That Could Shake Up Fantasy",
      summary: "Analyzing recent trades and their fantasy football implications.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Trades",
      publishedAt: "2024-01-14T16:45:00Z",
    },
    {
      id: "4",
      title: "2024 Draft Sleepers: Players Flying Under the Radar",
      summary: "Late-round picks that could provide massive value this season.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Draft",
      publishedAt: "2024-01-14T12:00:00Z",
    },
    {
      id: "5",
      title: "Rookie Watch: First-Year Players Making an Impact",
      summary: "Which rookies are exceeding expectations and worth adding.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Waivers",
      publishedAt: "2024-01-13T14:20:00Z",
    },
    {
      id: "6",
      title: "Championship Week Strategy: How to Secure Your Title",
      summary: "Expert tips for navigating the fantasy playoffs successfully.",
      imageUrl: "/placeholder.svg?height=200&width=300",
      category: "Draft",
      publishedAt: "2024-01-13T09:15:00Z",
    },
  ]

  return NextResponse.json(mockArticles)
}
