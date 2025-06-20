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
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Function to apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('light', 'dark');
    
    // Add the new theme class
    root.classList.add(newTheme);
    
    // Set data attribute
    root.setAttribute('data-theme', newTheme);
    
    // Set color-scheme
    root.style.colorScheme = newTheme;
    
    // For debugging - log what we're applying
    console.log('Applied theme:', newTheme);
    console.log('HTML classes:', root.className);
    console.log('Data theme:', root.getAttribute('data-theme'));
  };

  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    console.log('Initial theme setup:', { savedTheme, systemTheme, initialTheme });
    
    // Apply theme immediately
    applyTheme(initialTheme);
    
    setTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Apply theme and save to localStorage
      applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  const handleSetTheme = (newTheme: Theme) => {
    console.log('Setting theme to', newTheme);
    setTheme(newTheme);
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