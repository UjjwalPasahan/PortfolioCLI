'use client';

import React, { useEffect, useRef } from 'react';
import { OutputLine } from '@/types/terminal';

interface TerminalOutputProps {
  output: OutputLine[];
  outputRef: React.RefObject<HTMLDivElement>;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output, outputRef }) => {
  const renderLine = (line: OutputLine, index: number) => {
    // Handle undefined or null lines
    if (!line || typeof line !== 'object') {
      return null;
    }

    const { type, content, prompt } = line;

    switch (type) {
      case 'command':
        return (
          <div key={index} className="output-line command-line">
            <span className="prompt">{prompt || 'visitor@portfolio:~$'}</span>
            <span className="command-text">{content}</span>
          </div>
        );

      case 'error':
        return (
          <div key={index} className="output-line error-line">
            <span className="error-icon">✗</span>
            <span className="error-text">{content}</span>
          </div>
        );

      case 'success':
        return (
          <div key={index} className="output-line success-line">
            {content}
          </div>
        );

      case 'info':
        return (
          <div key={index} className="output-line info-line">
            {content}
          </div>
        );

      case 'warning':
        return (
          <div key={index} className="output-line warning-line">
            <span className="warning-icon">⚠</span>
            <span className="warning-text">{content}</span>
          </div>
        );

      case 'hint':
        return (
          <div key={index} className="output-line hint-line">
            {content}
          </div>
        );

      case 'ascii':
        return (
          <pre key={index} className="output-line ascii-art">
            {content}
          </pre>
        );

      case 'link':
        return (
          <div key={index} className="output-line link-line">
            <a
              href={line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="terminal-link"
            >
              {content}
              <span className="link-icon">↗</span>
            </a>
          </div>
        );

      case 'header':
        return (
          <div key={index} className="output-line header-line">
            {content}
          </div>
        );

      case 'divider':
        return (
          <div key={index} className="output-line divider-line">
            {content || '─'.repeat(70)}
          </div>
        );

      case 'system':
        return (
          <div key={index} className="output-line system-line">
            {content}
          </div>
        );

      default:
        return (
          <div key={index} className="output-line">
            {content}
          </div>
        );
    }
  };

  return (
    <div ref={outputRef} className="terminal-output">
      {output
        .filter((line) => line !== undefined && line !== null)
        .map((line, index) => renderLine(line, index))}
    </div>
  );
};

export default TerminalOutput;
