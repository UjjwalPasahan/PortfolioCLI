'use client';

import React from 'react';

interface TerminalHeaderProps {
  currentTime: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMinimized: boolean;
  isMaximized: boolean;
}

const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  currentTime,
  onClose,
  onMinimize,
  onMaximize,
  isMinimized,
  isMaximized,
}) => {
  return (
    <div className="terminal-header">
      <div className="terminal-controls">
        <button
          className="control-btn close"
          onClick={onClose}
          title="Close Terminal"
          aria-label="Close"
        >
          <span className="control-icon">×</span>
        </button>
        <button
          className="control-btn minimize"
          onClick={onMinimize}
          title="Minimize Terminal"
          aria-label="Minimize"
        >
          <span className="control-icon">−</span>
        </button>
        <button
          className="control-btn maximize"
          onClick={onMaximize}
          title={isMaximized ? "Restore Terminal" : "Maximize Terminal"}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          <span className="control-icon">{isMaximized ? '⊡' : '□'}</span>
        </button>
      </div>

      <div className="terminal-title">
        <span className="title-icon">▸</span>
        <span className="title-text">visitor@portfolio:~$</span>
      </div>

      <div className="terminal-info">
        <span className="time-display" title="Current Time">
          {currentTime}
        </span>
        <span className="connection-status" title="Connected">
          <span className="status-dot"></span>
          <span className="status-text">Online</span>
        </span>
      </div>
    </div>
  );
};

export default TerminalHeader;
