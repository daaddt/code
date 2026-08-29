// 全局主题（颜色、间距、字体尺寸）
export const theme = {
  colors: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',
    secondary: '#10b981',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    purple: '#8b5cf6',
    
    text: '#1f2937',
    textLight: '#6b7280',
    textMuted: '#9ca3af',
    
    bg: '#f8fafc',
    card: '#ffffff',
    border: '#e5e7eb',
    input: '#f3f4f6',
    
    cpp: '#00599C',
    java: '#ED8B00',
    python: '#3776AB',
    
    white: '#ffffff',
    black: '#0f172a',
    overlay: 'rgba(15, 23, 42, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  font: {
    regular: 'System',
    bold: 'System',
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export const langColor = (lang) => {
  const map = { cpp: theme.colors.cpp, java: theme.colors.java, python: theme.colors.python };
  return map[lang] || theme.colors.primary;
};
