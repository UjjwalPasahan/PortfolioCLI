'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { CommandHandler } from '@/lib/commandHandler';
import { useTerminalHistory } from '@/hooks/useTerminalHistory';

interface TerminalInputProps {
  onCommand: (command: string) => void;
  commandHandler: CommandHandler;
  playSound: (sound: string) => void;
  soundEnabled: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  onCommand,
  commandHandler,
  playSound,
  soundEnabled,
}) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const { history, historyIndex, setHistoryIndex, navigateHistory } = useTerminalHistory();

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();

    const handleClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (soundEnabled) {
      playSound('typing');
    }

    // Generate autocomplete suggestion
    if (value.length > 0) {
      const commands = commandHandler.getAllCommands();
      const matches = commands.filter(cmd =>
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );

      if (matches.length > 0) {
        setSuggestion(matches[0]);
        setAutocompleteSuggestions(matches);
      } else {
        setSuggestion('');
        setAutocompleteSuggestions([]);
      }
    } else {
      setSuggestion('');
      setAutocompleteSuggestions([]);
    }

    setSelectedSuggestionIndex(-1);
  };

  // Handle key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (input.trim()) {
          onCommand(input);
          setInput('');
          setSuggestion('');
          setAutocompleteSuggestions([]);
          setHistoryIndex(-1);
        }
        break;

      case 'Tab':
        e.preventDefault();
        if (suggestion && autocompleteSuggestions.length > 0) {
          if (selectedSuggestionIndex === -1) {
            setInput(autocompleteSuggestions[0]);
            if (autocompleteSuggestions.length > 1) {
              setSelectedSuggestionIndex(0);
            } else {
              setSuggestion('');
              setAutocompleteSuggestions([]);
            }
          } else {
            const nextIndex = (selectedSuggestionIndex + 1) % autocompleteSuggestions.length;
            setInput(autocompleteSuggestions[nextIndex]);
            setSelectedSuggestionIndex(nextIndex);
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        const prevCommand = navigateHistory('up');
        if (prevCommand !== null) {
          setInput(prevCommand);
          setSuggestion('');
          setAutocompleteSuggestions([]);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        const nextCommand = navigateHistory('down');
        if (nextCommand !== null) {
          setInput(nextCommand);
        } else {
          setInput('');
        }
        setSuggestion('');
        setAutocompleteSuggestions([]);
        break;

      case 'Escape':
        e.preventDefault();
        setInput('');
        setSuggestion('');
        setAutocompleteSuggestions([]);
        setSelectedSuggestionIndex(-1);
        break;

      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          onCommand('clear');
          setInput('');
        }
        break;

      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          setInput('');
          setSuggestion('');
          setAutocompleteSuggestions([]);
        }
        break;
    }
  };

  return (
    <>
      <div className="terminal-input-line">
        <span className="terminal-prompt">visitor@portfolio:~$</span>
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
          {suggestion && input && suggestion.toLowerCase().startsWith(input.toLowerCase()) && (
            <span className="autocomplete-suggestion">
              <span className="suggestion-ghost">{input}</span>
              <span className="suggestion-hint">
                {suggestion.slice(input.length)}
              </span>
            </span>
          )}
          <span className="cursor-blink"></span>
        </div>
      </div>

      {/* Autocomplete menu */}
      {autocompleteSuggestions.length > 1 && (
        <div className="autocomplete-menu">
          {autocompleteSuggestions.map((cmd, index) => (
            <div
              key={cmd}
              className={`autocomplete-item ${index === selectedSuggestionIndex ? 'selected' : ''
                }`}
              onClick={() => {
                setInput(cmd);
                setSuggestion('');
                setAutocompleteSuggestions([]);
                inputRef.current?.focus();
              }}
            >
              {cmd}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TerminalInput;
