import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  Sparkles
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="font-body text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your campaigns.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Button asChild className="h-auto py-4 flex-col gap-2">
          <Link href="/campaigns/new">
            <Plus className="w-5 h-5" />
            <span className="font-ui text-xs">New Campaign</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-auto py-4 flex-col gap-2">
          <Link href="/library">
            <BookOpen className="w-5 h-5" />
            <span className="font-ui text-xs">Browse Library</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-auto py-4 flex-col gap-2">
          <Link href="/tools">
            <Sparkles className="w-5 h-5" />
            <span className="font-ui text-xs">Quick Generate</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" className="h-auto py-4 flex-col gap-2">
          <Link href="/vault">
            <Bookmark className="w-5 h-5" />
            <span className="font-ui text-xs">My Vault</span>
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Campaigns - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Active Campaigns
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/campaigns">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {activeCampaigns.length > 0 ? (
            <div className="space-y-4">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id} className="group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {campaign.name}
                          </h3>
                          <Badge variant="secondary">{campaign.system}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{campaign.players} players</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{campaign.nextSession}</span>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-ui text-muted-foreground">Campaign Progress</span>
                            <span className="font-ui text-primary">{campaign.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${campaign.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <Button asChild size="sm" variant="outline">
                        <Link href={`/campaigns/${campaign.id}`}>
                          <Map className="w-4 h-4 mr-1" />
                          Open
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Map className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Active Campaigns
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Start your first campaign to track sessions and manage your party.
                </p>
                <Button asChild>
                  <Link href="/campaigns/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recent Downloads */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">
                Recent Downloads
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/vault?tab=downloads">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {recentDownloads.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-ui font-medium text-foreground">{item.title}</p>
                        <p className="font-ui text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar - Saved Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              Saved for Later
            </h2>
            <Button asChild variant="ghost" size="sm">
              <Link href="/vault">
                <Bookmark className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {savedContent.map((item) => (
              <Card key={item.id} className="group cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-ui font-medium text-foreground group-hover:text-primary transition-colors text-sm truncate">
                        {item.title}
                      </h3>
                      <p className="font-ui text-xs text-muted-foreground">
                        by {item.creator}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {item.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <Card className="bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-ui text-sm text-muted-foreground">Total Downloads</span>
                <span className="font-display font-semibold text-primary">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-ui text-sm text-muted-foreground">Saved Items</span>
                <span className="font-display font-semibold text-primary">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-ui text-sm text-muted-foreground">Active Campaigns</span>
                <span className="font-display font-semibold text-primary">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-ui text-sm text-muted-foreground">Sessions Logged</span>
                <span className="font-display font-semibold text-primary">23</span>
              </div>
            </CardContent>
          </Card>

          {/* Explore More */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-5 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                Discover New Content
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                Browse our library for adventures, tools, and resources.
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/library">
                  Explore Library
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
