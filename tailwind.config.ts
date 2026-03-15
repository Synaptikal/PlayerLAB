import type { Config } from "tailwindcss"

// PlayerLAB TTRPG Design System
const PLAYERLAB_DESIGN_TOKENS = {
  colors: {
    // Backgrounds - Midnight navy layered system
    "bg-base": "hsl(232 30% 8%)",
    "bg-surface": "hsl(232 27% 12%)",
    "bg-elevated": "hsl(232 24% 16%)",
    "bg-border": "hsl(232 20% 24%)",

    // Gold Accent - Primary interactive color
    "gold-primary": "hsl(43 55% 54%)",
    "gold-muted": "hsl(40 45% 37%)",

    // Purple Accent - Content type badges
    "purple-accent": "hsl(265 35% 51%)",
    "purple-muted": "hsl(265 30% 34%)",

    // Text - Warm off-white
    "text-primary": "hsl(40 25% 90%)",
    "text-secondary": "hsl(42 15% 54%)",
    "text-muted": "hsl(42 15% 32%)",

    // Status Colors
    "status-success": "hsl(142 35% 42%)",
    "status-warning": "hsl(43 85% 38%)",
    "status-danger": "hsl(0 40% 39%)",
  },
  fonts: {
    display: ["var(--font-cinzel)", "Cinzel", "serif"],
    body: ["var(--font-lora)", "Lora", "serif"],
    ui: ["var(--font-inter)", "Inter", "sans-serif"],
    mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
  },
  shadows: {
    "gold-sm": "0 1px 3px rgba(0,0,0,0.4)",
    "gold-md": "0 4px 12px rgba(0,0,0,0.5)",
    "gold-glow": "0 4px 24px hsla(43, 55%, 54%, 0.10)",
    "gold-glow-lg": "0 8px 40px hsla(43, 55%, 54%, 0.15)",
  },
}

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // TTRPG Design System Classes
    "font-display",
    "font-body",
    "font-ui",
    "font-mono",
    "bg-base",
    "bg-surface",
    "bg-elevated",
    "text-gold",
    "text-gold-muted",
    "border-gold",
    "border-subtle",
    "shadow-gold",
    "shadow-gold-lg",
    "surface-card",
    "elevated-card",
    "gold-divider",
    "badge-adventure",
    "badge-campaign",
    "badge-premium",
    "badge-free",
    "nav-active",
    "status-success",
    "status-warning",
    "status-danger",
    "vignette",
  ],
  theme: {
    extend: {
      colors: {
        ...PLAYERLAB_DESIGN_TOKENS.colors,
        // shadcn/ui compatibility
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: PLAYERLAB_DESIGN_TOKENS.fonts,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: PLAYERLAB_DESIGN_TOKENS.shadows,
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "gold-pulse": "goldPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 4px 24px hsla(43, 55%, 54%, 0.10)" },
          "50%": { boxShadow: "0 4px 32px hsla(43, 55%, 54%, 0.20)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
