'use client';

import React from 'react';

interface TerminalFooterProps {
  theme: string;
  soundEnabled: boolean;
  crtEffect: boolean;
  onThemeClick: () => void;
  onSoundClick: () => void;
  onCrtClick: () => void;
}

const TerminalFooter: React.FC<TerminalFooterProps> = ({
  theme,
  soundEnabled,
  crtEffect,
  onThemeClick,
  onSoundClick,
  onCrtClick,
}) => {
  return (
    <div className="terminal-footer">
      <div className="footer-left">
        <button
          className="footer-item clickable"
          onClick={onThemeClick}
          title="Click to cycle through themes"
        >
          <span className="footer-label">Theme:</span>
          <span className="footer-value">{theme}</span>
        </button>
        <button
          className="footer-item clickable"
          onClick={onSoundClick}
          title="Click to toggle sound effects"
        >
          <span className="footer-label">Sound:</span>
          <span className="footer-value">{soundEnabled ? 'ON' : 'OFF'}</span>
        </button>
        <button
          className="footer-item clickable"
          onClick={onCrtClick}
          title="Click to toggle CRT effect"
        >
          <span className="footer-label">CRT:</span>
          <span className="footer-value">{crtEffect ? 'ON' : 'OFF'}</span>
        </button>
      </div>
      <div className="footer-right">
        <span className="footer-hint">
          <kbd>Tab</kbd> autocomplete • <kbd>↑↓</kbd> history • <kbd>Ctrl+L</kbd> clear
        </span>
      </div>
    </div>
  );
};

export default TerminalFooter;
