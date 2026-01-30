'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import TerminalFooter from './TerminalFooter';
import LoadingScreen from './LoadingScreen';
import { CommandHandler } from '@/lib/commandHandler';
import { useTerminalHistory } from '@/hooks/useTerminalHistory';
import { useTheme } from '@/hooks/useTheme';
import { useSound } from '@/hooks/useSound';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { OutputLine } from '@/types/terminal';
import '@/styles/terminal.css';

const Terminal: React.FC = () => {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { theme, currentTheme, toggleTheme, availableThemes, setThemeByName } = useTheme();
  const { playSound, soundEnabled, toggleSound } = useSound();
  const { addToHistory } = useTerminalHistory();
  const [crtEffect, setCrtEffect] = useLocalStorage('crt-effect', true);
  const [scanlines, setScanlines] = useLocalStorage('scanlines', true);

  const commandHandler = useRef(new CommandHandler()).current;

  // Initialize terminal with welcome message
  useEffect(() => {
    const initTerminal = async () => {
      setTimeout(() => {
        setIsLoading(false);
        // Add welcome message with typing animation
        addWelcomeMessage();
      }, 2000);
    };

    initTerminal();
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Handle ESC key to close settings
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showSettings) {
        setShowSettings(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showSettings]);

  // Update time display
  const updateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    setCurrentTime(timeString);
  };

  // Add welcome message
  const addWelcomeMessage = () => {
    const welcomeLines: OutputLine[] = [
      { type: 'ascii', content: commandHandler.getASCIIArt() },
      { type: 'system', content: '' },
      { type: 'success', content: '╔══════════════════════════════════════════════════════════════════╗' },
      { type: 'success', content: '║          Welcome to the Interactive Terminal Portfolio          ║' },
      { type: 'success', content: '╚══════════════════════════════════════════════════════════════════╝' },
      { type: 'system', content: '' },
      { type: 'info', content: '> Initializing system...' },
      { type: 'info', content: '> Loading user profile...' },
      { type: 'info', content: '> Establishing connection...' },
      { type: 'success', content: '> System ready!' },
      { type: 'system', content: '' },
      { type: 'output', content: 'Type "help" to see available commands.' },
      { type: 'output', content: 'Type "about" to learn more about me.' },
      { type: 'hint', content: '💡 Tip: Use Tab for autocomplete, ↑↓ arrows for command history' },
      { type: 'system', content: '' },
    ];

    // Add lines with typing effect
    let index = 0;
    const addLine = () => {
      if (index < welcomeLines.length) {
        setOutput(prev => [...prev, welcomeLines[index]]);
        index++;
        setTimeout(addLine, 100);
      }
    };
    addLine();
  };

  // Handle command execution
  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim()) return;

    // Add command to output
    setOutput(prev => [...prev, {
      type: 'command',
      content: command,
      prompt: 'visitor@portfolio:~$'
    }]);

    // Add to history
    addToHistory(command);

    // Play sound
    playSound('enter');

    // Process command
    const result = await commandHandler.execute(command.trim());

    // Handle special commands
    if (result.type === 'clear') {
      setOutput([]);
      return;
    }

    if (result.type === 'theme') {
      toggleTheme();
      setOutput(prev => [...prev, ...result.output]);
      return;
    }

    if (result.type === 'settings') {
      setShowSettings(true);
      setOutput(prev => [...prev, ...result.output]);
      return;
    }

    if (result.type === 'sound') {
      toggleSound();
      setOutput(prev => [...prev, ...result.output]);
      return;
    }

    if (result.type === 'crt') {
      setCrtEffect(!crtEffect);
      setOutput(prev => [...prev, ...result.output]);
      return;
    }

    if (result.type === 'scanlines') {
      setScanlines(!scanlines);
      setOutput(prev => [...prev, ...result.output]);
      return;
    }

    // Add output
    if (result.output && result.output.length > 0) {
      // Filter out any undefined values
      const validOutput = result.output.filter(line => line !== undefined && line !== null);

      // Add lines with slight delay for typing effect
      let lineIndex = 0;
      const addOutputLine = () => {
        if (lineIndex < validOutput.length) {
          setOutput(prev => [...prev, validOutput[lineIndex]]);
          lineIndex++;
          setTimeout(addOutputLine, 30);
        }
      };
      addOutputLine();
    }

    // Play error sound if command failed
    if (result.output && result.output.length > 0 && result.output[0]?.type === 'error') {
      playSound('error');
    }
  }, [commandHandler, addToHistory, playSound, toggleTheme]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Handle window controls
  const handleClose = () => {
    const confirmClose = window.confirm('Are you sure you want to close the terminal?');
    if (confirmClose) {
      setOutput(prev => [...prev, {
        type: 'system',
        content: 'Connection closed. Goodbye! 👋'
      }]);
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 1000);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    playSound('click');
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    playSound('click');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      ref={terminalRef}
      className={`terminal-wrapper ${theme} ${crtEffect ? 'crt-effect' : ''} ${scanlines ? 'scanlines' : ''}`}
      data-minimized={isMinimized}
      data-maximized={isMaximized}
    >
      <div className="terminal-container">
        <div className="terminal-window">
          <TerminalHeader
            currentTime={currentTime}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isMinimized={isMinimized}
            isMaximized={isMaximized}
          />

          <div className="terminal-body">
            <TerminalOutput
              output={output}
              outputRef={outputRef}
            />

            {!isMinimized && (
              <TerminalInput
                onCommand={handleCommand}
                commandHandler={commandHandler}
                playSound={playSound}
                soundEnabled={soundEnabled}
              />
            )}
          </div>

          <TerminalFooter
            theme={currentTheme?.display || theme}
            soundEnabled={soundEnabled}
            crtEffect={crtEffect}
            onThemeClick={toggleTheme}
            onSoundClick={toggleSound}
            onCrtClick={() => setCrtEffect(!crtEffect)}
          />
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div
            className="settings-modal"
            onClick={() => setShowSettings(false)}
          >
            <div
              className="settings-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>⚙️ Terminal Settings</h3>

              <div className="settings-group">
                <label>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={toggleSound}
                  />
                  <span>🔊 Sound Effects {soundEnabled ? '(ON)' : '(OFF)'}</span>
                </label>
                <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px', marginLeft: '28px' }}>
                  Play typing and command sounds
                </p>
              </div>

              <div className="settings-group">
                <label>
                  <input
                    type="checkbox"
                    checked={crtEffect}
                    onChange={() => setCrtEffect(!crtEffect)}
                  />
                  <span>📺 CRT Effect {crtEffect ? '(ON)' : '(OFF)'}</span>
                </label>
                <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px', marginLeft: '28px' }}>
                  Vintage monitor simulation with screen flicker
                </p>
              </div>

              <div className="settings-group">
                <label>
                  <input
                    type="checkbox"
                    checked={scanlines}
                    onChange={() => setScanlines(!scanlines)}
                  />
                  <span>📼 Scanlines {scanlines ? '(ON)' : '(OFF)'}</span>
                </label>
                <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px', marginLeft: '28px' }}>
                  Retro TV horizontal lines overlay
                </p>
              </div>

              <div className="settings-group">
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  🎨 Color Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => {
                    setThemeByName(e.target.value);
                  }}
                  className="theme-select"
                >
                  {availableThemes.map(t => (
                    <option key={t.name} value={t.name}>
                      {t.display}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: 'rgba(167, 139, 250, 0.1)',
                borderRadius: '8px',
                fontSize: '11px',
                opacity: 0.8
              }}>
                💡 <strong>Tip:</strong> You can also use commands: <code>sound</code>, <code>crt</code>, <code>scanlines</code>, <code>theme</code>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="settings-close-btn"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <div id="toast-container" className="toast-container"></div>
    </div>
  );
};

export default Terminal;
