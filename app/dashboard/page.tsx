import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Map,
  Calendar,
  Users,
  BookOpen,
  Clock,
  ArrowRight,
  Plus,
  Bookmark,
  Download,
  Wrench,
} from "lucide-react"

// Sample data
const activeCampaigns = [
  {
    id: 1,
    name: "Curse of the Crimson Throne",
    system: "Pathfinder 2e",
    players: 5,
    nextSession: "Tomorrow, 7:00 PM",
    progress: 35,
  },
  {
    id: 2,
    name: "Waterdeep Dragon Heist",
    system: "D&D 5e",
    players: 4,
    nextSession: "Saturday, 3:00 PM",
    progress: 68,
  },
]

const recentDownloads = [
  { id: 1, title: "Goblin Cave One-Shot", type: "Adventure", date: "2 days ago" },
  { id: 2, title: "NPC Generator Tables", type: "Tool", date: "1 week ago" },
  { id: 3, title: "City District Maps Pack", type: "Maps", date: "2 weeks ago" },
]

const savedContent = [
  { id: 1, title: "The Lost Mine Expanded", type: "Campaign", creator: "DM Guild" },
  { id: 2, title: "100 Plot Hooks", type: "Resource", creator: "Crafty GM" },
  { id: 3, title: "Monster Tactics Guide", type: "Supplement", creator: "Keith A." },
]

export default function DashboardPage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">

      {/* Page header */}
      <div className="mb-10">
        <p className="section-label mb-2">Overview</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="font-serif text-text-secondary">
          Welcome back. Here&apos;s what&apos;s happening with your campaigns.
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { href: "/campaigns", icon: Plus,     label: "New Campaign",  variant: "default"    as const },
          { href: "/library",   icon: BookOpen, label: "Browse Library",variant: "secondary"  as const },
          { href: "/tools",     icon: Wrench,   label: "Open Tools",    variant: "secondary"  as const },
          { href: "/library",   icon: Bookmark, label: "Saved Items",   variant: "secondary"  as const },
        ].map(({ href, icon: Icon, label, variant }) => (
          <Button key={label} asChild variant={variant} className="h-auto py-4 flex-col gap-2 font-sans text-xs">
            <Link href={href}>
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left — campaigns + downloads */}
        <div className="lg:col-span-2 space-y-8">

          {/* Active campaigns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-text-primary">Active Campaigns</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/campaigns">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>

            <div className="space-y-4">
              {activeCampaigns.map((c) => (
                <Card key={c.id} className="group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <h3 className="font-display font-semibold text-text-primary group-hover:text-gold-primary transition-colors truncate">
                            {c.name}
                          </h3>
                          <Badge variant="secondary">{c.system}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 font-sans text-sm text-text-secondary mb-4">
                          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{c.players} players</span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{c.nextSession}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between font-sans text-xs">
                            <span className="text-text-secondary">Progress</span>
                            <span className="text-gold-primary">{c.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold-primary rounded-full transition-all"
                              style={{ width: `${c.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" asChild>
                        <Link href={`/campaigns`}><Map className="w-4 h-4" />Open</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent downloads */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-text-primary">Recent Downloads</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/library">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>
            <Card>
              <CardContent className="p-0 divide-y divide-bg-border">
                {recentDownloads.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-4 hover:bg-bg-elevated transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-bg-elevated flex items-center justify-center">
                        <Download className="w-4 h-4 text-gold-muted" />
                      </div>
                      <div>
                        <p className="font-sans font-medium text-sm text-text-primary">{item.title}</p>
                        <p className="font-sans text-xs text-text-secondary">{item.type}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 font-sans text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />{item.date}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right — saved items + stats */}
        <div className="space-y-6">

          {/* Saved items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-text-primary">Saved for Later</h2>
            </div>
            <div className="space-y-3">
              {savedContent.map((item) => (
                <Card key={item.id} className="group cursor-pointer">
                  <CardContent className="p-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-sans font-medium text-sm text-text-primary group-hover:text-gold-primary transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="font-sans text-xs text-text-secondary">by {item.creator}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">{item.type}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="font-display text-base">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {[
                { label: "Total Downloads",   value: "47" },
                { label: "Saved Items",        value: "12" },
                { label: "Active Campaigns",   value: "2"  },
                { label: "Sessions Logged",    value: "23" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="font-sans text-sm text-text-secondary">{label}</span>
                  <span className="font-display font-semibold text-gold-primary">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="border-gold-muted/30" style={{ background: "var(--gold-glow)" }}>
            <CardContent className="p-5 text-center">
              <BookOpen className="w-7 h-7 text-gold-muted mx-auto mb-3" />
              <h3 className="font-display font-semibold text-text-primary mb-2">Discover Content</h3>
              <p className="font-serif text-xs text-text-secondary mb-4 leading-relaxed">
                Browse our library for adventures, supplements, and resources.
              </p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/library">Explore Library</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
