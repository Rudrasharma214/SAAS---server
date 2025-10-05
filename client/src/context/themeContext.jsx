import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    // Dark theme colors
    dark: {
      background: 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800',
      sidebarBg: 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950',
      contentBg: 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950',
      text: 'text-zinc-200',
      textPrimary: 'text-zinc-100',
      textSecondary: 'text-zinc-400',
      border: 'border-zinc-800',
      hoverBg: 'hover:bg-zinc-900/60',
      activeBg: 'bg-gradient-to-tr from-zinc-900 to-zinc-800',
      glowEffects: `
        before:absolute before:inset-0 before:-z-10 before:opacity-40
        before:bg-[radial-gradient(120%_80%_at_10%_0%,rgba(244,244,245,0.06),transparent_60%)]
        after:absolute after:inset-0 after:-z-10 after:opacity-40
        after:bg-[conic-gradient(from_210deg_at_60%_15%,rgba(99,102,241,0.18),rgba(236,72,153,0.14),transparent_70%)]
      `
    },
    // Light theme colors
    light: {
      background: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
      sidebarBg: 'bg-gradient-to-r from-white via-gray-50 to-gray-100',
      contentBg: 'bg-gradient-to-r from-white via-gray-50 to-gray-100',
      text: 'text-gray-800',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      hoverBg: 'hover:bg-gray-100/80',
      activeBg: 'bg-gradient-to-tr from-blue-50 to-indigo-50',
      glowEffects: `
        before:absolute before:inset-0 before:-z-10 before:opacity-30
        before:bg-[radial-gradient(120%_80%_at_10%_0%,rgba(59,130,246,0.05),transparent_60%)]
        after:absolute after:inset-0 after:-z-10 after:opacity-30
        after:bg-[conic-gradient(from_210deg_at_60%_15%,rgba(99,102,241,0.08),rgba(236,72,153,0.06),transparent_70%)]
      `
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ ...theme, current: currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};