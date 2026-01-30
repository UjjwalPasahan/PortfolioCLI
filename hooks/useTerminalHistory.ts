'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTerminalHistory = () => {
  const [history, setHistory] = useLocalStorage<string[]>('terminal-history', []);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [tempInput, setTempInput] = useState<string>('');

  const addToHistory = (command: string) => {
    if (!command.trim()) return;

    setHistory(prev => {
      // Remove duplicate if exists
      const filtered = prev.filter(cmd => cmd !== command);
      // Add to end and limit to last 100 commands
      const updated = [...filtered, command].slice(-100);
      return updated;
    });
    setHistoryIndex(-1);
  };

  const navigateHistory = (direction: 'up' | 'down'): string | null => {
    if (history.length === 0) return null;

    let newIndex: number;

    if (direction === 'up') {
      if (historyIndex === -1) {
        newIndex = history.length - 1;
      } else if (historyIndex > 0) {
        newIndex = historyIndex - 1;
      } else {
        return history[historyIndex];
      }
    } else {
      if (historyIndex === -1) {
        return null;
      } else if (historyIndex < history.length - 1) {
        newIndex = historyIndex + 1;
      } else {
        setHistoryIndex(-1);
        return null;
      }
    }

    setHistoryIndex(newIndex);
    return history[newIndex];
  };

  const clearHistory = () => {
    setHistory([]);
    setHistoryIndex(-1);
  };

  return {
    history,
    historyIndex,
    setHistoryIndex,
    addToHistory,
    navigateHistory,
    clearHistory,
  };
};
