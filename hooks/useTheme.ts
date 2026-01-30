'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Theme } from '@/types/terminal';

const themes: Theme[] = [
  {
    name: 'modern',
    display: 'Modern Purple',
    colors: {
      primary: '#a78bfa',
      secondary: '#c4b5fd',
      background: '#0f0f1e',
      text: '#e5e7eb',
      accent: '#f59e0b',
    },
  },
  {
    name: 'sunset',
    display: 'Sunset Glow',
    colors: {
      primary: '#f472b6',
      secondary: '#fb923c',
      background: '#1a0f1e',
      text: '#fce7f3',
      accent: '#fbbf24',
    },
  },
  {
    name: 'ocean',
    display: 'Ocean Breeze',
    colors: {
      primary: '#06b6d4',
      secondary: '#67e8f9',
      background: '#0c1721',
      text: '#e0f2fe',
      accent: '#34d399',
    },
  },
  {
    name: 'forest',
    display: 'Forest Night',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      background: '#0a1410',
      text: '#d1fae5',
      accent: '#fbbf24',
    },
  },
  {
    name: 'dracula',
    display: 'Dracula',
    colors: {
      primary: '#bd93f9',
      secondary: '#ff79c6',
      background: '#282a36',
      text: '#f8f8f2',
      accent: '#50fa7b',
    },
  },
  {
    name: 'rose',
    display: 'Rose Gold',
    colors: {
      primary: '#fb7185',
      secondary: '#fda4af',
      background: '#1f1117',
      text: '#ffe4e6',
      accent: '#fbbf24',
    },
  },
];

export const useTheme = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useLocalStorage('terminal-theme', 0);
  const [theme, setTheme] = useState(themes[0]?.name || 'modern');

  useEffect(() => {
    // Validate theme index
    const validIndex = currentThemeIndex >= 0 && currentThemeIndex < themes.length ? currentThemeIndex : 0;
    const themeData = themes[validIndex];

    if (themeData) {
      setTheme(themeData.name);

      // Apply CSS variables
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', themeData.colors.primary);
        root.style.setProperty('--color-secondary', themeData.colors.secondary);
        root.style.setProperty('--color-background', themeData.colors.background);
        root.style.setProperty('--color-text', themeData.colors.text);
        root.style.setProperty('--color-accent', themeData.colors.accent);
      }
    }
  }, [currentThemeIndex]);

  const toggleTheme = () => {
    setCurrentThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const setThemeByName = (name: string) => {
    const index = themes.findIndex(t => t.name === name);
    if (index !== -1) {
      setCurrentThemeIndex(index);
    }
  };

  return {
    theme,
    currentTheme: themes[currentThemeIndex],
    availableThemes: themes,
    toggleTheme,
    setThemeByName,
  };
};
