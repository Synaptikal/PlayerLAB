import type { Config } from "tailwindcss"

// PlayerLAB Vault v2 Design System Lock - FIGMA SPEC COMPLIANT
const PLAYERLAB_DESIGN_TOKENS = {
  colors: {
    // FIGMA SPEC NEON COLOR PALETTE
    "deep-black": "#0D0D0D",
    "neon-cyan": "#00FFFF",
    "neon-blue": "#3B82F6",
    "neon-green": "#00FF6A",
    "neon-red": "#FF4C4C",
    "neon-purple": "#8B5CF6",
    "neon-magenta": "#FF00FF",
    "neon-yellow": "#FFFF00",
    "neon-orange": "#FF8C00",
    "text-primary": "#FFFFFF",
    "text-secondary": "#AAAAAA",
    "glass-light": "rgba(255, 255, 255, 0.1)",
    "glass-dark": "rgba(0, 0, 0, 0.3)",
    "glass-medium": "rgba(255, 255, 255, 0.15)",
  },
  fonts: {
    // FIGMA SPEC FONT FAMILIES
    header: ["Orbitron", "sans-serif"],
    body: ["Inter", "sans-serif"],
    orbitron: ["Orbitron", "sans-serif"],
    inter: ["Inter", "sans-serif"],
    audiowide: ["Audiowide", "sans-serif"], // FIGMA SPEC ADDITION
  },
  shadows: {
    // Locked Glow System
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    glow: "0 0 20px rgba(0, 255, 255, 0.5)",
    "glow-intense": "0 0 30px rgba(0, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.6)",
    "glow-blue": "0 0 20px #3b82f6",
    "glow-green": "0 0 20px #10b981",
    "glow-red": "0 0 20px #ef4444",
    "glow-purple": "0 0 20px #8b5cf6",
    "glow-cyan": "0 0 20px #00FFFF",
    "glow-magenta": "0 0 20px #FF00FF",
    "glow-blue-intense": "0 0 30px #3b82f6, 0 0 50px #3b82f6",
    "glow-green-intense": "0 0 30px #10b981, 0 0 50px #10b981",
    "glow-red-intense": "0 0 30px #ef4444, 0 0 50px #ef4444",
    "glow-purple-intense": "0 0 30px #8b5cf6, 0 0 50px #8b5cf6",
    "glow-cyan-intense": "0 0 30px #00FFFF, 0 0 50px #00FFFF",
    "glow-magenta-intense": "0 0 30px #FF00FF, 0 0 50px #FF00FF",
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
  // CRITICAL: Safelist prevents purging of design system classes
  safelist: [
    // 🔒 LOCKED DESIGN SYSTEM CLASSES - DO NOT REMOVE

    // Glassmorphism (Mandatory)
    "backdrop-blur-lg",
    "backdrop-blur-2xl",
    "backdrop-blur-3xl",
    "bg-white/5",
    "bg-white/10",
    "bg-white/15",
    "bg-white/20",
    "border-white/15",
    "border-white/20",
    "border-white/30",

    // Glow Effects (Team Colors)
    "shadow-glow",
    "shadow-glow-intense",
    "shadow-glow-blue",
    "shadow-glow-green",
    "shadow-glow-red",
    "shadow-glow-purple",
    "shadow-glow-cyan",
    "shadow-glow-magenta",
    "shadow-glow-blue-intense",
    "shadow-glow-green-intense",
    "shadow-glow-red-intense",
    "shadow-glow-purple-intense",
    "shadow-glow-cyan-intense",
    "shadow-glow-magenta-intense",

    // Typography (Branding Fonts)
    "font-header",
    "font-body",
    "font-orbitron",
    "font-inter",

    // Animations (Locked)
    "animate-glow-pulse",
    "animate-pulse-glow",
    "animate-border-glow",
    "animate-player-pulse",
    "animate-hover-pulse",
    "animate-holographic",
    "animate-neon-sweep",

    // Component Classes (Mandatory)
    "glass-container",
    "glass-card",
    "glass-panel",
    "glass-tile",
    "neon-panel",
    "glow-button",
    "holo-background",
    "neon-glow",
    "neon-glow-hover",
    "neon-border",
    "neon-text",
    "gradient-text",
    "hud-grid",

    // Team Color Variants
    "team-glow-blue",
    "team-glow-green",
    "team-glow-red",
    "team-glow-purple",
    "team-glow-cyan",
    "team-glow-magenta",

    // Border Colors (Team)
    "border-blue-400/30",
    "border-green-400/30",
    "border-red-400/30",
    "border-purple-400/30",
    "border-cyan-400/30",
    "border-magenta-400/30",
    "border-blue-400/50",
    "border-green-400/50",
    "border-red-400/50",
    "border-purple-400/50",
    "border-cyan-400/50",
    "border-magenta-400/50",
    "border-blue-400/80",
    "border-green-400/80",
    "border-red-400/80",
    "border-purple-400/80",
    "border-cyan-400/80",
    "border-magenta-400/80",
  ],
  theme: {
    extend: {
      colors: {
        ...PLAYERLAB_DESIGN_TOKENS.colors,
        // Shadcn compatibility
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
      backdropBlur: {
        glass: "12px",
        "3xl": "64px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "24px",
        glass: "12px",
      },
      boxShadow: PLAYERLAB_DESIGN_TOKENS.shadows,
      animation: {
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "neon-sweep": "neonSweep 2s ease-in-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "scale-glow": "scaleGlow 0.3s ease-out",
        "hover-pulse": "hoverPulse 0.6s ease-in-out infinite",
        "player-pulse": "playerPulse 3s ease-in-out infinite",
        holographic: "holographic 8s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #00FFFF" },
          "50%": { boxShadow: "0 0 40px #00FFFF, 0 0 60px #00FFFF" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(139, 92, 246, 0.8), 0 0 35px rgba(139, 92, 246, 0.6)" },
        },
        borderGlow: {
          "0%, 100%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
        },
        neonSweep: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleGlow: {
          "0%": { transform: "scale(1)", boxShadow: "0 0 20px #00FFFF" },
          "100%": { transform: "scale(1.05)", boxShadow: "0 0 30px #00FFFF, 0 0 50px #00FFFF" },
        },
        hoverPulse: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" },
          "50%": { boxShadow: "0 0 25px rgba(0, 255, 255, 0.8), 0 0 35px rgba(0, 255, 255, 0.6)" },
        },
        playerPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)" },
        },
        holographic: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
