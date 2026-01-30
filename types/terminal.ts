export interface OutputLine {
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'warning' | 'hint' | 'ascii' | 'link' | 'header' | 'divider' | 'system';
  content: string;
  prompt?: string;
  url?: string;
}

export interface CommandResult {
  type: string;
  output: OutputLine[];
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  execute: () => CommandResult;
}

export interface Theme {
  name: string;
  display: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}
