import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  ArrowRight,
  Users,
  Map,
  Wrench,
  Compass,
  Sparkles,
  Crown,
  Scroll,
  Dice6,
  Sword,
  Shield
} from "lucide-react"

// Sample featured content data
const featuredContent = [
  {
    id: 1,
    title: "The Crimson Depths",
    creator: "Dungeon Master Dave",
    type: "Adventure",
    price: "Premium",
    rating: 4.8,
    description: "A 5th-level adventure through ancient underwater ruins filled with forgotten magic and lurking dangers.",
  },
  {
    id: 2,
    title: "Wilderness Survival Guide",
    creator: "Ranger's Guild",
    type: "Supplement",
    price: "Free",
    rating: 4.5,
    description: "Comprehensive rules for wilderness exploration, foraging, and survival in hostile environments.",
  },
  {
    id: 3,
    title: "The Iron Kingdom",
    creator: "Campaign Crafters",
    type: "Campaign",
    price: "Premium",
    rating: 4.9,
    description: "A full campaign setting with political intrigue, ancient mysteries, and world-shaking conflicts.",
  },
  {
    id: 4,
    title: "100 Unique NPCs",
    creator: "Character Collective",
    type: "Resource",
    price: "Free",
    rating: 4.6,
    description: "A collection of memorable NPCs with detailed backgrounds, motivations, and plot hooks.",
  },
]

const categories = [
  { name: "Adventures", icon: Map, count: 234 },
  { name: "Campaigns", icon: Crown, count: 89 },
  { name: "Supplements", icon: Scroll, count: 156 },
  { name: "Tools", icon: Wrench, count: 67 },
  { name: "Characters", icon: Users, count: 312 },
  { name: "Maps", icon: Compass, count: 178 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              TTRPG Content Platform
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Campaign
              <span className="block text-primary">Headquarters</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover adventures, tools, and content crafted by the TTRPG community. 
              Everything you need to run unforgettable games.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/library">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Library
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">
                  <Dice6 className="w-5 h-5 mr-2" />
                  Start Campaign
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">1,200+</div>
              <div className="font-ui text-sm text-muted-foreground">Adventures</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">500+</div>
              <div className="font-ui text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-primary">50k+</div>
              <div className="font-ui text-sm text-muted-foreground">Downloads</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-divider mx-auto max-w-xl" />

      {/* Featured Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Featured Content
              </h2>
              <p className="font-body text-muted-foreground">
                Hand-picked adventures and resources from our community
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex">
              <Link href="/library">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredContent.map((item) => (
              <Card key={item.id} className="group cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant={item.type === "Adventure" ? "adventure" : item.type === "Campaign" ? "campaign" : "secondary"}>
                      {item.type}
                    </Badge>
                    <Badge variant={item.price === "Premium" ? "premium" : "free"}>
                      {item.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    by {item.creator}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <Sparkles className="w-3 h-3" />
                    <span className="font-ui font-medium">{item.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button asChild variant="outline">
              <Link href="/library">
                View All Content
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="font-body text-muted-foreground">
              Find exactly what you need for your next session
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/library?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="h-full text-center hover:border-primary/40 hover:shadow-gold transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-ui font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="font-ui text-sm text-muted-foreground">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="accent" className="mb-4">
                <Wrench className="w-3 h-3 mr-1" />
                GM Tools
              </Badge>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Everything You Need to Run Great Games
              </h2>
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                From name generators to encounter builders, our tools help you prepare 
                and improvise with confidence. Spend less time on prep and more time playing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/tools">
                    Explore Tools
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <Dice6 className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-ui font-semibold text-foreground mb-1">Random Tables</h3>
                <p className="font-body text-sm text-muted-foreground">Generate encounters, loot, and more</p>
              </Card>
              <Card className="p-4">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-ui font-semibold text-foreground mb-1">NPC Generator</h3>
                <p className="font-body text-sm text-muted-foreground">Create memorable characters instantly</p>
              </Card>
              <Card className="p-4">
                <Sword className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-ui font-semibold text-foreground mb-1">Combat Tracker</h3>
                <p className="font-body text-sm text-muted-foreground">Manage initiative and HP</p>
              </Card>
              <Card className="p-4">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-ui font-semibold text-foreground mb-1">Encounter Builder</h3>
                <p className="font-body text-sm text-muted-foreground">Balance encounters by party level</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto max-w-3xl text-center">
          <Crown className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Level Up Your Games?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of GMs and players who use PlayerLAB to discover 
            content and run unforgettable campaigns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/library">
                Start Exploring
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/creators">
                Become a Creator
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
