// PlayerLAB Design System Tokens
// This file contains all design tokens used throughout the application

export const colors = {
  // Primary Colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // FIGMA SPEC NEON COLORS
  neon: {
    cyan: '#00FFFF',
    blue: '#3B82F6',
    green: '#00FF6A',
    red: '#FF4C4C',
    purple: '#8B5CF6',
    magenta: '#FF00FF',
    yellow: '#FFFF00',
    orange: '#FF8C00',
  },
  
  // Glassmorphism Colors
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(255, 255, 255, 0.15)',
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#AAAAAA',
    muted: '#666666',
  },
  
  // Accent Colors
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  yellow: {
    50: '#fefce8',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Neutral Colors
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Semantic Colors
  success: {
    light: '#22c55e',
    main: '#16a34a',
    dark: '#15803d',
  },
  
  warning: {
    light: '#f59e0b',
    main: '#d97706',
    dark: '#b45309',
  },
  
  error: {
    light: '#ef4444',
    main: '#dc2626',
    dark: '#b91c1c',
  },
  
  info: {
    light: '#3b82f6',
    main: '#2563eb',
    dark: '#1d4ed8',
  },
}

export const typography = {
  // Font Families - FIGMA SPEC
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    orbitron: ['Orbitron', 'system-ui', 'sans-serif'],
    audiowide: ['Audiowide', 'system-ui', 'sans-serif'], // FIGMA SPEC ADDITION
  },
  
  // Font Sizes - FIGMA SPEC
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px - FIGMA H1 MIN
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px - FIGMA H1 MAX
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },
  
  // FIGMA SPEC Typography Classes
  figmaTypography: {
    h1: 'text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold', // 48-72px
    h2: 'text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold', // 32-48px
    h3: 'text-3xl md:text-4xl lg:text-5xl font-orbitron font-semibold', // 24-32px
    body: 'text-base font-inter leading-relaxed', // 16px
    caption: 'text-xs font-audiowide leading-tight', // 12px Audiowide
    micro: 'text-[10px] font-audiowide leading-tight', // 10px Audiowide
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

export const spacing = {
  // Base spacing scale
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
}

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
}

export const shadows = {
  // Box shadows
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Glow effects
  glow: {
    cyan: '0 0 20px rgba(6, 182, 212, 0.3)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
    green: '0 0 20px rgba(16, 185, 129, 0.3)',
    yellow: '0 0 20px rgba(245, 158, 11, 0.3)',
    pink: '0 0 20px rgba(236, 72, 153, 0.3)',
    orange: '0 0 20px rgba(249, 115, 22, 0.3)',
    teal: '0 0 20px rgba(20, 184, 166, 0.3)',
    indigo: '0 0 20px rgba(99, 102, 241, 0.3)',
    amber: '0 0 20px rgba(245, 158, 11, 0.3)',
  },
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
}

export const transitions = {
  // Duration
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
}

// Component-specific tokens
export const components = {
  // Button variants
  button: {
    size: {
      sm: {
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
      },
      md: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '0.5rem',
      },
      lg: {
        padding: '1rem 2rem',
        fontSize: '1.125rem',
        borderRadius: '0.75rem',
      },
    },
    variant: {
      primary: {
        backgroundColor: colors.cyan[600],
        color: 'white',
        hover: {
          backgroundColor: colors.cyan[700],
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.slate[300],
        border: `1px solid ${colors.slate[400]}`,
        hover: {
          backgroundColor: colors.cyan[400],
          borderColor: colors.cyan[400],
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colors.slate[300],
        hover: {
          backgroundColor: colors.slate[800],
        },
      },
    },
  },
  
  // Card variants
  card: {
    padding: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
    },
    borderRadius: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px) saturate(180%)',
  },
  
  // Input variants
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: `1px solid ${colors.slate[600]}`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: colors.slate[100],
    placeholder: {
      color: colors.slate[400],
    },
    focus: {
      borderColor: colors.cyan[400],
      boxShadow: `0 0 0 3px ${colors.cyan[400]}20`,
    },
  },
}

// Animation tokens
export const animations = {
  // Framer Motion variants
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 },
  },
  
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 },
  },
  
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3 },
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.3 },
  },
  
  // Hover animations
  hover: {
    lift: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 },
    },
    glow: {
      boxShadow: shadows.glow.cyan,
      transition: { duration: 0.3 },
    },
  },
}

// Export all tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  components,
  animations,
}

export default designTokens 