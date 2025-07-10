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
