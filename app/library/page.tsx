import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { 
  Search, 
  Filter,
  Sparkles,
  BookOpen,
  Map,
  Users,
  Wrench,
  Crown,
  Scroll
} from "lucide-react"

// Sample content data
const contentItems = [
  {
    id: 1,
    title: "The Crimson Depths",
    creator: "Dungeon Master Dave",
    type: "Adventure",
    system: "D&D 5e",
    price: "Premium",
    rating: 4.8,
    downloads: 1234,
    description: "A 5th-level adventure through ancient underwater ruins filled with forgotten magic and lurking dangers.",
    levels: "5-7",
  },
  {
    id: 2,
    title: "Wilderness Survival Guide",
    creator: "Ranger's Guild",
    type: "Supplement",
    system: "System Agnostic",
    price: "Free",
    rating: 4.5,
    downloads: 3456,
    description: "Comprehensive rules for wilderness exploration, foraging, and survival in hostile environments.",
    levels: "Any",
  },
  {
    id: 3,
    title: "The Iron Kingdom",
    creator: "Campaign Crafters",
    type: "Campaign",
    system: "Pathfinder 2e",
    price: "Premium",
    rating: 4.9,
    downloads: 892,
    description: "A full campaign setting with political intrigue, ancient mysteries, and world-shaking conflicts.",
    levels: "1-20",
  },
  {
    id: 4,
    title: "100 Unique NPCs",
    creator: "Character Collective",
    type: "Resource",
    system: "System Agnostic",
    price: "Free",
    rating: 4.6,
    downloads: 5678,
    description: "A collection of memorable NPCs with detailed backgrounds, motivations, and plot hooks.",
    levels: "Any",
  },
  {
    id: 5,
    title: "Dungeon of the Mad Mage Expanded",
    creator: "DM Guild Premium",
    type: "Adventure",
    system: "D&D 5e",
    price: "Premium",
    rating: 4.7,
    downloads: 2341,
    description: "Additional content and expansions for the classic dungeon crawl adventure.",
    levels: "5-20",
  },
  {
    id: 6,
    title: "Tavern Menu Generator",
    creator: "Crafty Tools",
    type: "Tool",
    system: "System Agnostic",
    price: "Free",
    rating: 4.4,
    downloads: 8901,
    description: "Generate unique tavern menus with regional dishes, exotic drinks, and mysterious specials.",
    levels: "Any",
  },
  {
    id: 7,
    title: "Secrets of the Shadowfell",
    creator: "Dark Realms Publishing",
    type: "Campaign",
    system: "D&D 5e",
    price: "Premium",
    rating: 4.8,
    downloads: 1567,
    description: "A dark campaign through the Shadowfell, featuring new monsters, magic items, and locations.",
    levels: "8-15",
  },
  {
    id: 8,
    title: "City District Maps Pack",
    creator: "Cartographer's Guild",
    type: "Maps",
    system: "System Agnostic",
    price: "Premium",
    rating: 4.9,
    downloads: 3210,
    description: "20 detailed city district maps perfect for urban campaigns and adventures.",
    levels: "Any",
  },
]

const categories = [
  { name: "All", icon: BookOpen, count: 1200 },
  { name: "Adventures", icon: Map, count: 234 },
  { name: "Campaigns", icon: Crown, count: 89 },
  { name: "Supplements", icon: Scroll, count: 156 },
  { name: "Tools", icon: Wrench, count: 67 },
  { name: "Characters", icon: Users, count: 312 },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Adventure": return Map
    case "Campaign": return Crown
    case "Supplement": return Scroll
    case "Resource": return BookOpen
    case "Tool": return Wrench
    case "Maps": return Map
    default: return BookOpen
  }
}

export default function LibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Content Library
        </h1>
        <p className="font-body text-muted-foreground">
          Discover adventures, tools, and resources for your campaigns
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search adventures, tools, creators..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((category, index) => (
          <Button
            key={category.name}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className="shrink-0"
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.name}
            <Badge variant="secondary" className="ml-2 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contentItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type)
          return (
            <Link key={item.id} href={`/library/${item.id}`}>
              <Card className="h-full group cursor-pointer hover:shadow-gold transition-all">
                {/* Placeholder for cover image */}
                <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TypeIcon className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <Badge variant={item.type === "Adventure" ? "adventure" : item.type === "Campaign" ? "campaign" : "secondary"}>
                      {item.type}
                    </Badge>
                    <Badge variant={item.price === "Premium" ? "premium" : "free"}>
                      {item.price}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-1">
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
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-primary">
                      <Sparkles className="w-3 h-3" />
                      <span className="font-ui font-medium">{item.rating}</span>
                    </div>
                    <span className="font-ui text-muted-foreground">
                      {item.system}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                    <span>Levels: {item.levels}</span>
                    <span>{item.downloads.toLocaleString()} downloads</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Load More */}
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Load More Content
        </Button>
      </div>
    </div>
  )
}
