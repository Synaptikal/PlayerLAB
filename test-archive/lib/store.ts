import { create } from "zustand"

interface UIState {
  isNavVisible: boolean
  setNavVisible: (visible: boolean) => void
  currentPage: string
  setCurrentPage: (page: string) => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

interface NewsState {
  articles: Article[]
  filteredArticles: Article[]
  selectedCategory: string
  searchQuery: string
  setArticles: (articles: Article[]) => void
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  filterArticles: () => void
}

interface AnalyticsState {
  overviewData: OverviewData | null
  chartData: ChartData | null
  selectedTimeframe: string
  setOverviewData: (data: OverviewData) => void
  setChartData: (data: ChartData) => void
  setSelectedTimeframe: (timeframe: string) => void
}

export interface Article {
  id: string
  title: string
  summary: string
  imageUrl: string
  category: string
  publishedAt: string
}

export interface OverviewData {
  mostAdded: Player[]
  mostDropped: Player[]
  topPoints: Player[]
  injuryWatch: Player[]
}

export interface Player {
  id: string
  name: string
  team: string
  position: string
  points?: number
  trend?: "up" | "down" | "stable"
}

export interface ChartData {
  labels: string[]
  datasets: any[]
}

export const useUIStore = create<UIState>((set) => ({
  isNavVisible: false,
  setNavVisible: (visible) => set({ isNavVisible: visible }),
  currentPage: "home",
  setCurrentPage: (page) => set({ currentPage: page }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}))

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  filteredArticles: [],
  selectedCategory: "All",
  searchQuery: "",
  setArticles: (articles) => set({ articles, filteredArticles: articles }),
  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
    get().filterArticles()
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().filterArticles()
  },
  filterArticles: () => {
    const { articles, selectedCategory, searchQuery } = get()
    let filtered = articles

    if (selectedCategory !== "All") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    set({ filteredArticles: filtered })
  },
}))

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  overviewData: null,
  chartData: null,
  selectedTimeframe: "Week",
  setOverviewData: (data) => set({ overviewData: data }),
  setChartData: (data) => set({ chartData: data }),
  setSelectedTimeframe: (timeframe) => set({ selectedTimeframe: timeframe }),
}))

// Dashboard Widget State
import { persist } from "zustand/middleware"

export interface DashboardWidget {
  id: string
  type: string
  title: string
  data: any
  color: string
}

interface DashboardState {
  widgets: DashboardWidget[]
  setWidgets: (widgets: DashboardWidget[]) => void
  moveWidget: (from: number, to: number) => void
  resetWidgets: () => void
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: "1",
    type: "stats",
    title: "Team Performance",
    data: {
      wins: 8,
      losses: 3,
      pointsFor: 142.3,
      pointsAgainst: 128.7,
      rank: 2
    },
    color: "cyan"
  },
  {
    id: "2",
    type: "players",
    title: "Top Performers",
    data: [
      { name: "Christian McCaffrey", points: 28.4, trend: "up" },
      { name: "Tyreek Hill", points: 24.2, trend: "up" },
      { name: "Travis Kelce", points: 22.6, trend: "down" }
    ],
    color: "green"
  },
  {
    id: "3",
    type: "schedule",
    title: "Upcoming Matchups",
    data: [
      { opponent: "Team Alpha", week: 8, difficulty: "Easy" },
      { opponent: "Team Beta", week: 9, difficulty: "Medium" },
      { opponent: "Team Gamma", week: 10, difficulty: "Hard" }
    ],
    color: "purple"
  },
  {
    id: "4",
    type: "alerts",
    title: "League Alerts",
    data: [
      { type: "trade", message: "New trade proposed", time: "2h ago" },
      { type: "waiver", message: "Waiver wire updated", time: "4h ago" },
      { type: "injury", message: "Player injury reported", time: "1d ago" }
    ],
    color: "yellow"
  }
]

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: defaultWidgets,
      setWidgets: (widgets) => set({ widgets }),
      moveWidget: (from, to) => {
        const widgets = [...get().widgets]
        const [moved] = widgets.splice(from, 1)
        widgets.splice(to, 0, moved)
        set({ widgets })
      },
      resetWidgets: () => set({ widgets: defaultWidgets }),
    }),
    {
      name: "dashboard-widgets",
    }
  )
)
