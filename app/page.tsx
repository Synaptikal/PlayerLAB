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
  Crown,
  Scroll,
  Dice6,
  Sword,
  Shield,
  Star,
} from "lucide-react"

const featuredContent = [
  {
    id: 1,
    title: "The Shattered Crown",
    creator: "Morgan Blackwood",
    type: "Adventure",
    price: "Free",
    rating: 4.8,
    description:
      "A level 5–7 urban intrigue adventure set in the crumbling city of Thornhaven, where noble houses compete for a fractured throne.",
  },
  {
    id: 2,
    title: "Wilderness Survival Compendium",
    creator: "Ranger's Guild",
    type: "Supplement",
    price: "Free",
    rating: 4.5,
    description:
      "Comprehensive rules for wilderness exploration, foraging, and survival in hostile environments. System-agnostic.",
  },
  {
    id: 3,
    title: "The Iron Kingdom",
    creator: "Campaign Crafters",
    type: "Campaign",
    price: "Premium",
    rating: 4.9,
    description:
      "A full campaign setting with political intrigue, ancient mysteries, and world-shaking conflicts across twelve sessions.",
  },
  {
    id: 4,
    title: "100 Memorable NPCs",
    creator: "Character Collective",
    type: "Resource",
    price: "Free",
    rating: 4.6,
    description:
      "A collection of memorable NPCs with detailed backgrounds, motivations, and plot hooks. Printable reference cards included.",
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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
        {/* Vignette layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            <p className="section-label mb-4">TTRPG Content Platform</p>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-text-primary leading-[1.15] tracking-wide text-balance mb-6">
              A Digital Home for{" "}
              <span className="text-gold-gradient">Every Campaign</span>
            </h1>

            <p className="font-serif text-lg text-text-secondary leading-[1.75] max-w-xl mx-auto mb-10">
              Discover adventures, supplements, and tools crafted by the TTRPG
              community. Everything a game master needs — in one well-worn tome.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/library">
                  <BookOpen className="w-4 h-4" />
                  Browse the Library
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/dashboard">
                  Open Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto text-center">
            {[
              { value: "1,200+", label: "Adventures" },
              { value: "500+",   label: "Creators" },
              { value: "50k+",   label: "Downloads" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-gold-primary">{stat.value}</p>
                <p className="font-sans text-xs text-text-secondary uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gold-divider container" />

      {/* ── Featured Content ─────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="section-label mb-2">Hand-Picked</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary leading-tight">
                Featured Content
              </h2>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex flex-shrink-0">
              <Link href="/library">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredContent.map((item) => (
              <Link key={item.id} href={`/library`} className="group block">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge variant="default">{item.type}</Badge>
                      <Badge variant={item.price === "Premium" ? "premium" : "free"}>
                        {item.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-snug group-hover:text-gold-primary transition-colors duration-[150ms] line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription>by {item.creator}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex-1 flex flex-col justify-between gap-4">
                    <p className="font-serif text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 font-sans text-xs text-gold-muted">
                      <Star className="w-3.5 h-3.5 fill-gold-muted text-gold-muted" />
                      <span className="font-semibold text-gold-primary">{item.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button variant="secondary" asChild>
              <Link href="/library">View All Content <ArrowRight className="w-3.5 h-3.5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────── */}
      <section className="px-6 py-16" style={{ backgroundColor: "var(--bg-surface)" }}>
        <div className="container">
          <div className="text-center mb-10">
            <p className="section-label mb-2">Browse</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
              Find What You Need
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/library?category=${cat.name.toLowerCase()}`}
                className="group block"
              >
                <Card className="h-full text-center p-5 flex flex-col items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-bg-elevated flex items-center justify-center group-hover:bg-gold-glow transition-colors duration-[250ms]">
                    <cat.icon className="w-5 h-5 text-gold-muted group-hover:text-gold-primary transition-colors duration-[150ms]" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-text-primary group-hover:text-gold-primary transition-colors duration-[150ms]">
                      {cat.name}
                    </p>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">{cat.count} items</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GM Tools ─────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">For Game Masters</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary leading-tight mb-5">
                Tools That Earn Their Place at the Table
              </h2>
              <p className="font-serif text-text-secondary leading-[1.75] mb-8">
                From encounter builders to NPC generators, our tools help you
                prepare with confidence and improvise with ease. Spend less time
                on prep — more time playing.
              </p>
              <Button asChild>
                <Link href="/tools">
                  Explore All Tools <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Dice6, label: "Random Tables",    desc: "Generate encounters, loot, weather" },
                { icon: Users, label: "NPC Generator",    desc: "Memorable characters in seconds" },
                { icon: Sword, label: "Combat Tracker",   desc: "Initiative, HP, and conditions" },
                { icon: Shield, label: "Encounter Builder", desc: "Balanced by party level" },
              ].map(({ icon: Icon, label, desc }) => (
                <Card key={label} className="p-5">
                  <Icon className="w-6 h-6 text-gold-muted mb-3" />
                  <p className="font-sans font-semibold text-sm text-text-primary mb-1">{label}</p>
                  <p className="font-serif text-xs text-text-secondary leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section
        className="px-6 py-20"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        <div className="container max-w-2xl text-center">
          <Crown className="w-10 h-10 text-gold-muted mx-auto mb-6" aria-hidden="true" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 text-balance">
            Ready to Run Unforgettable Games?
          </h2>
          <p className="font-serif text-text-secondary leading-[1.75] mb-8">
            Join thousands of GMs and players who rely on PlayerLAB to discover
            great content and manage their campaigns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/library">Start Exploring</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/creators">Become a Creator</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
