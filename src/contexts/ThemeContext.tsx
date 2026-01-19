"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Function to apply theme to document (always dark)
  const applyDarkTheme = () => {
    const root = document.documentElement;

    root.classList.remove('light');
    root.classList.add('dark');

    root.setAttribute('data-theme', 'dark');
    root.style.colorScheme = 'dark';
  };

  useEffect(() => {
    // Initial theme setup: always dark
    applyDarkTheme();
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // No-op: theme is locked to dark
  };

  const handleSetTheme = (newTheme: Theme) => {
    void newTheme; // No-op: theme is locked to dark
  };

  const value = {
    theme,
    toggleTheme,
    setTheme: handleSetTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};