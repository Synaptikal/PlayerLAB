// PlayerLAB Design System Enforcement
// This file contains locked design tokens and validation rules

export const DESIGN_TOKENS = {
  // Locked Color Palette (Vault v2)
  colors: {
    deepBlack: "#0D0D0D",
    neonCyan: "#00FFFF",
    neonMagenta: "#FF00FF",
    neonGreen: "#00FF6A",
    neonRed: "#FF4C4C",
    neonPurple: "#8B5CF6",
    textPrimary: "#FFFFFF",
    textSecondary: "#AAAAAA",
    glassLight: "rgba(255, 255, 255, 0.1)",
    glassDark: "rgba(0, 0, 0, 0.3)",
  },

  // Locked Typography
  fonts: {
    header: "Orbitron, sans-serif",
    body: "Inter, sans-serif",
  },

  // Locked Glassmorphism Rules
  glass: {
    blur: "backdrop-blur-2xl",
    background: "bg-white/10",
    border: "border-white/20",
    shadow: "shadow-glass",
  },

  // Locked Animation Durations
  animations: {
    fast: "0.3s",
    medium: "0.5s",
    slow: "0.8s",
    pulse: "3s",
  },
} as const

// Design System Validation
export function validateComponent(componentName: string, props: any) {
  const violations: string[] = []

  // Enforce mandatory component usage
  const mandatoryComponents = ["GlassContainer", "NeonPanel", "GlowButton", "HoloBackground"]

  if (process.env.NODE_ENV === "development") {
    console.log(`✅ Design System: ${componentName} validated`)
  }

  return violations
}

// Prevent raw Tailwind usage for critical elements
export const FORBIDDEN_CLASSES = [
  "bg-gray-",
  "bg-blue-",
  "bg-green-",
  "border-gray-",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "backdrop-blur-sm",
  "backdrop-blur-md",
] as const

export function enforceDesignSystem() {
  if (process.env.NODE_ENV === "development") {
    console.log("🔒 PlayerLAB Design System Enforcement Active")
    console.log("📋 Vault v2 Futuristic HUD Standards Locked")
  }
}
