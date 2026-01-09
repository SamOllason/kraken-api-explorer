export const theme = {
  colors: {
    // Octopus Energy inspired colors
    primary: '#00DC82', // Octopus green
    primaryDark: '#00B86B',
    primaryLight: '#33E39B',
    
    // Background colors (dark mode)
    background: '#0D1117',
    surface: '#161B22',
    surfaceHover: '#1C2128',
    surfaceBorder: '#30363D',
    
    // Text colors
    textPrimary: '#F0F6FC',
    textSecondary: '#8B949E',
    textMuted: '#6E7681',
    
    // Accent colors
    accentPink: '#FF69B4',
    accentPurple: '#A855F7',
    accentBlue: '#58A6FF',
    accentOrange: '#F97316',
    accentYellow: '#FCD34D',
    
    // Semantic colors
    success: '#3FB950',
    warning: '#D29922',
    error: '#F85149',
    info: '#58A6FF',
    
    // Energy specific
    electricity: '#FCD34D',
    gas: '#F97316',
  },
  
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
    glow: '0 0 20px rgba(0, 220, 130, 0.3)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '400ms ease',
  },
} as const;

export type Theme = typeof theme;
