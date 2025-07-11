// PlayerLAB V2 Ultra Design Tokens
// Single source of truth for all design values

export const colors = {
  // Primary Palette
  deepBlack: "#0D0D0D",
  neonCyan: "#00FFFF",
  neonBlue: "#3B82F6",
  neonGreen: "#00FF6A",
  neonRed: "#FF4C4C",
  neonPurple: "#8B5CF6",
  neonMagenta: "#FF00FF",
  
  // Glassmorphism
  glassLight: "rgba(255, 255, 255, 0.1)",
  glassDark: "rgba(0, 0, 0, 0.3)",
  
  // Text Colors
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  
  // Semantic Colors
  success: "#00FF6A",
  error: "#FF4C4C",
  warning: "#FFB800",
  info: "#00FFFF",
};

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
};

export const typography = {
  fontFamily: {
    orbitron: ["Orbitron", "sans-serif"],
    inter: ["Inter", "sans-serif"],
    audiowide: ["Audiowide", "cursive"],
  },
  fontSize: {
    h1: "48px", // 48-72px range
    h2: "32px", // 32-48px range
    h3: "24px", // 24-32px range
    body: "16px",
    caption: "12px",
    micro: "10px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.2",
    normal: "1.5",
    relaxed: "1.75",
  },
};

export const radii = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  full: "9999px",
};

export const shadows = {
  // Glow Effects
  glowPrimary: "0 0 20px rgba(0, 255, 255, 0.5)",
  glowIntense: "0 0 30px rgba(0, 255, 255, 0.8)",
  glowBlue: "0 0 20px #3b82f6",
  glowGreen: "0 0 20px #00FF6A",
  glowRed: "0 0 20px #FF4C4C",
  glowPurple: "0 0 20px #8B5CF6",
  
  // Glassmorphism
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  
  // Standard Shadows
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
};

export const breakpoints = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1024px",
  "ultra-wide": "1440px",
};

export const animations = {
  duration: {
    fast: "200ms",
    normal: "300ms",
    slow: "600ms",
    "very-slow": "800ms",
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  },
};

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: "32px",
      md: "40px",
      lg: "48px",
    },
    padding: {
      sm: "8px 16px",
      md: "12px 24px",
      lg: "16px 32px",
    },
  },
  input: {
    height: "40px",
    padding: "12px 16px",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
  },
};

// Export all tokens as a single object for easy access
export const designTokens = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
  breakpoints,
  animations,
  components,
}; 