import { CommandResult, OutputLine, Project, Experience, Skill } from '@/types/terminal';
import { portfolioData } from './portfolioData';

export class CommandHandler {
  private commands: Map<string, () => CommandResult>;
  private aliases: Map<string, string>;

  constructor() {
    this.commands = new Map();
    this.aliases = new Map();
    this.initializeCommands();
  }

  private initializeCommands() {
    // Help command
    this.commands.set('help', () => this.helpCommand());
    this.aliases.set('?', 'help');
    this.aliases.set('ls', 'help');

    // About command
    this.commands.set('about', () => this.aboutCommand());
    this.aliases.set('info', 'about');

    // Experience command
    this.commands.set('experience', () => this.experienceCommand());
    this.aliases.set('work', 'experience');
    this.aliases.set('exp', 'experience');

    // Projects command
    this.commands.set('projects', () => this.projectsCommand());
    this.aliases.set('portfolio', 'projects');

    // Skills command
    this.commands.set('skills', () => this.skillsCommand());
    this.aliases.set('tech', 'skills');

    // Education command
    this.commands.set('education', () => this.educationCommand());
    this.aliases.set('edu', 'education');

    // Contact command
    this.commands.set('contact', () => this.contactCommand());
    this.aliases.set('social', 'contact');

    // Resume command
    this.commands.set('resume', () => this.resumeCommand());
    this.aliases.set('cv', 'resume');

    // Website command
    this.commands.set('website', () => this.websiteCommand());
    this.aliases.set('gui', 'website');

    // Clear command
    this.commands.set('clear', () => this.clearCommand());
    this.aliases.set('cls', 'clear');

    // Theme command
    this.commands.set('theme', () => this.themeCommand());

    // Banner command
    this.commands.set('banner', () => this.bannerCommand());
    this.aliases.set('logo', 'banner');

    // Whoami command
    this.commands.set('whoami', () => this.whoamiCommand());

    // Secret/Easter egg command
    this.commands.set('secret', () => this.secretCommand());
    this.aliases.set('easter-egg', 'secret');
    this.aliases.set('hack', 'secret');

    // History command
    this.commands.set('history', () => this.historyCommand());

    // Echo command
    this.commands.set('echo', () => this.echoCommand());

    // Date command
    this.commands.set('date', () => this.dateCommand());

    // Sudo command (easter egg)
    this.commands.set('sudo', () => this.sudoCommand());

    // Matrix command (easter egg)
    this.commands.set('matrix', () => this.matrixCommand());

    // Quote command
    this.commands.set('quote', () => this.quoteCommand());

    // Settings commands
    this.commands.set('settings', () => this.settingsCommand());
    this.aliases.set('config', 'settings');

    // Sound command
    this.commands.set('sound', () => this.soundCommand());

    // CRT command
    this.commands.set('crt', () => this.crtCommand());

    // Scanlines command
    this.commands.set('scanlines', () => this.scanlinesCommand());
  }

  execute(input: string): CommandResult {
    const [command, ...args] = input.toLowerCase().trim().split(' ');

    // Check if command exists or has an alias
    const actualCommand = this.aliases.get(command) || command;
    const commandFn = this.commands.get(actualCommand);

    if (!commandFn) {
      return this.errorCommand(command);
    }

    return commandFn();
  }

  getAllCommands(): string[] {
    const commands = Array.from(this.commands.keys());
    const aliasCommands = Array.from(this.aliases.keys());
    return [...commands, ...aliasCommands].sort();
  }

  getASCIIArt(): string {
    return `
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║     ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ║
║     ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ║
║        ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ║
║        ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ║
║        ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗║
║        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝║
║                                                              ║
║                  🚀  INTERACTIVE PORTFOLIO  💻              ║
║                     Type 'help' to begin                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`;
  }

  private helpCommand(): CommandResult {
    return {
      type: 'help',
      output: [
        { type: 'header', content: '╔════════════════════ AVAILABLE COMMANDS ════════════════════╗' },
        { type: 'system', content: '' },
        { type: 'success', content: '  GENERAL' },
        { type: 'output', content: '    help, ?           - Display this help message' },
        { type: 'output', content: '    about, info       - Learn about me' },
        { type: 'output', content: '    whoami            - Quick introduction' },
        { type: 'output', content: '    banner, logo      - Display ASCII banner' },
        { type: 'output', content: '    quote             - Get a random tech quote' },
        { type: 'system', content: '' },
        { type: 'success', content: '  PROFESSIONAL' },
        { type: 'output', content: '    experience, work  - View work history' },
        { type: 'output', content: '    projects          - Browse my projects' },
        { type: 'output', content: '    skills, tech      - See technical skills' },
        { type: 'output', content: '    education, edu    - Educational background' },
        { type: 'output', content: '    resume, cv        - Download my resume' },
        { type: 'system', content: '' },
        { type: 'success', content: '  CONTACT & SOCIAL' },
        { type: 'output', content: '    contact, social   - Get in touch' },
        { type: 'output', content: '    website, gui      - Visit GUI portfolio' },
        { type: 'system', content: '' },
        { type: 'success', content: '  TERMINAL CONTROLS' },
        { type: 'output', content: '    clear, cls        - Clear terminal screen' },
        { type: 'output', content: '    theme             - Toggle color theme' },
        { type: 'output', content: '    settings          - Open settings panel' },
        { type: 'output', content: '    sound             - Toggle sound effects' },
        { type: 'output', content: '    crt               - Toggle CRT effect' },
        { type: 'output', content: '    scanlines         - Toggle scanlines' },
        { type: 'output', content: '    history           - Show command history' },
        { type: 'output', content: '    date              - Display current date/time' },
        { type: 'system', content: '' },
        { type: 'success', content: '  FUN STUFF' },
        { type: 'output', content: '    secret            - Discover hidden features' },
        { type: 'output', content: '    matrix            - Enter the Matrix' },
        { type: 'system', content: '' },
        { type: 'hint', content: '  💡 Use Tab for autocomplete | ↑↓ for history | Ctrl+L to clear' },
        { type: 'header', content: '╚═══════════════════════════════════════════════════════════╝' },
      ],
    };
  }

  private aboutCommand(): CommandResult {
    return {
      type: 'about',
      output: [
        { type: 'header', content: '═══════════════════ ABOUT ME ═══════════════════' },
        { type: 'system', content: '' },
        { type: 'success', content: `👨‍💻 ${portfolioData.name}` },
        { type: 'info', content: `    ${portfolioData.title}` },
        { type: 'system', content: '' },
        { type: 'output', content: portfolioData.bio },
        { type: 'system', content: '' },
        { type: 'success', content: '📍 Location:' },
        { type: 'output', content: `    ${portfolioData.location}` },
        { type: 'system', content: '' },
        { type: 'success', content: '🎯 Specializations:' },
        ...portfolioData.specializations.map(spec => ({
          type: 'output' as const,
          content: `    • ${spec}`,
        })),
        { type: 'system', content: '' },
        { type: 'success', content: '💼 Years of Experience:' },
        { type: 'output', content: `    ${portfolioData.yearsOfExperience}+ years` },
        { type: 'system', content: '' },
        { type: 'hint', content: '💡 Type "experience" to see my work history' },
        { type: 'divider', content: '─'.repeat(60) },
      ],
    };
  }

  private experienceCommand(): CommandResult {
    const output: OutputLine[] = [
      { type: 'header', content: '═══════════════════ WORK EXPERIENCE ═══════════════════' },
      { type: 'system', content: '' },
    ];

    portfolioData.experience.forEach((exp, index) => {
      output.push(
        { type: 'success', content: `${index + 1}. ${exp.title}` },
        { type: 'info', content: `   ${exp.company} | ${exp.period}` },
        { type: 'system', content: '' }
      );

      exp.description.forEach(desc => {
        output.push({ type: 'output', content: `   • ${desc}` });
      });

      output.push(
        { type: 'system', content: '' },
        { type: 'warning', content: `   Technologies: ${exp.technologies.join(', ')}` },
        { type: 'system', content: '' },
        { type: 'divider', content: '   ' + '─'.repeat(55) },
        { type: 'system', content: '' }
      );
    });

    return { type: 'experience', output };
  }

  private projectsCommand(): CommandResult {
    const output: OutputLine[] = [
      { type: 'header', content: '═══════════════════ FEATURED PROJECTS ═══════════════════' },
      { type: 'system', content: '' },
    ];

    portfolioData.projects.forEach((project, index) => {
      output.push(
        { type: 'success', content: `${index + 1}. ${project.name}` },
        { type: 'output', content: `   ${project.description}` },
        { type: 'system', content: '' },
        { type: 'info', content: `   Tech Stack: ${project.technologies.join(', ')}` },
        { type: 'system', content: '' }
      );

      if (project.link) {
        output.push({
          type: 'link',
          content: `   🔗 Live Demo: ${project.link}`,
          url: project.link,
        });
      }

      if (project.github) {
        output.push({
          type: 'link',
          content: `   💻 GitHub: ${project.github}`,
          url: project.github,
        });
      }

      output.push(
        { type: 'system', content: '' },
        { type: 'divider', content: '   ' + '─'.repeat(55) },
        { type: 'system', content: '' }
      );
    });

    return { type: 'projects', output };
  }

  private skillsCommand(): CommandResult {
    const output: OutputLine[] = [
      { type: 'header', content: '═══════════════════ TECHNICAL SKILLS ═══════════════════' },
      { type: 'system', content: '' },
    ];

    portfolioData.skills.forEach(skillGroup => {
      output.push(
        { type: 'success', content: `▸ ${skillGroup.category}` },
        { type: 'system', content: '' }
      );

      // Create a formatted list with visual indicators
      const items = skillGroup.items;
      items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const prefix = isLast ? '   └─' : '   ├─';
        output.push({
          type: 'output',
          content: `${prefix} ${item}`,
        });
      });

      output.push({ type: 'system', content: '' });
    });

    output.push({ type: 'divider', content: '─'.repeat(60) });

    return { type: 'skills', output };
  }

  private educationCommand(): CommandResult {
    const output: OutputLine[] = [
      { type: 'header', content: '═══════════════════ EDUCATION ═══════════════════' },
      { type: 'system', content: '' },
    ];

    portfolioData.education.forEach(edu => {
      output.push(
        { type: 'success', content: `🎓 ${edu.degree}` },
        { type: 'info', content: `   ${edu.institution}` },
        { type: 'output', content: `   ${edu.period}` },
        { type: 'system', content: '' }
      );

      if (edu.highlights) {
        edu.highlights.forEach(h => {
          output.push({ type: 'output', content: `   • ${h}` });
        });
      }

      output.push(
        { type: 'system', content: '' },
        { type: 'divider', content: '   ' + '─'.repeat(50) },
        { type: 'system', content: '' }
      );
    });

    return {
      type: 'education',
      output,
    };
  }

  private contactCommand(): CommandResult {
    return {
      type: 'contact',
      output: [
        { type: 'header', content: '═══════════════════ LET\'S CONNECT ═══════════════════' },
        { type: 'system', content: '' },
        { type: 'success', content: '📧 Email:' },
        {
          type: 'link',
          content: `    ${portfolioData.contact.email}`,
          url: `mailto:${portfolioData.contact.email}`,
        },
        { type: 'system', content: '' },
        { type: 'success', content: '💼 LinkedIn:' },
        {
          type: 'link',
          content: `    ${portfolioData.contact.linkedin}`,
          url: portfolioData.contact.linkedin,
        },
        { type: 'system', content: '' },
        { type: 'success', content: '💻 GitHub:' },
        {
          type: 'link',
          content: `    ${portfolioData.contact.github}`,
          url: portfolioData.contact.github,
        },
        { type: 'system', content: '' },
        { type: 'success', content: '🐦 Twitter/X:' },
        {
          type: 'link',
          content: `    ${portfolioData.contact.twitter}`,
          url: portfolioData.contact.twitter,
        },
        { type: 'system', content: '' },
        { type: 'success', content: '📱 Phone:' },
        { type: 'output', content: `    ${portfolioData.contact.phone}` },
        { type: 'system', content: '' },
        { type: 'hint', content: '💡 Click any link to open in a new tab' },
        { type: 'divider', content: '─'.repeat(60) },
      ],
    };
  }

  private resumeCommand(): CommandResult {
    // Trigger resume download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = portfolioData.resumeUrl;
      link.download = 'resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);

    return {
      type: 'resume',
      output: [
        { type: 'success', content: '📄 Opening resume...' },
        { type: 'info', content: '   Download should start automatically' },
        { type: 'system', content: '' },
        {
          type: 'link',
          content: '   Click here if download doesn\'t start',
          url: portfolioData.resumeUrl,
        },
      ],
    };
  }

  private websiteCommand(): CommandResult {
    setTimeout(() => {
      window.open(portfolioData.websiteUrl, '_blank');
    }, 500);

    return {
      type: 'website',
      output: [
        { type: 'info', content: '🌐 Opening GUI portfolio in new tab...' },
        { type: 'system', content: '' },
        {
          type: 'link',
          content: '   Click here if it doesn\'t open automatically',
          url: portfolioData.websiteUrl,
        },
      ],
    };
  }

  private clearCommand(): CommandResult {
    return {
      type: 'clear',
      output: [],
    };
  }

  private themeCommand(): CommandResult {
    return {
      type: 'theme',
      output: [
        { type: 'success', content: '🎨 Theme changed!' },
        { type: 'system', content: '' },
        { type: 'output', content: '   Available themes:' },
        { type: 'info', content: '   • Modern Purple (default)' },
        { type: 'info', content: '   • Sunset Glow' },
        { type: 'info', content: '   • Ocean Breeze' },
        { type: 'info', content: '   • Forest Night' },
        { type: 'info', content: '   • Dracula' },
        { type: 'info', content: '   • Rose Gold' },
        { type: 'system', content: '' },
        { type: 'hint', content: '   💡 Click theme name in footer or open settings to change' },
      ],
    };
  }

  private bannerCommand(): CommandResult {
    return {
      type: 'banner',
      output: [
        { type: 'ascii', content: this.getASCIIArt() },
        { type: 'system', content: '' },
        { type: 'success', content: `           Welcome to ${portfolioData.name}'s Terminal` },
        { type: 'info', content: '           Type "help" to see available commands' },
        { type: 'system', content: '' },
      ],
    };
  }

  private whoamiCommand(): CommandResult {
    return {
      type: 'whoami',
      output: [
        { type: 'success', content: `${portfolioData.name}` },
        { type: 'output', content: portfolioData.tagline },
        { type: 'hint', content: '💡 Type "about" for more details' },
      ],
    };
  }

  private secretCommand(): CommandResult {
    const secrets = [
      'Congratulations! You found the secret command! 🎉',
      'Try typing "matrix" for a cool effect...',
      'Did you know? This entire portfolio was built with React and TypeScript!',
      'Easter egg unlocked! You\'re a true terminal explorer! 🏆',
    ];

    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)];

    return {
      type: 'secret',
      output: [
        { type: 'success', content: '🔓 SECRET UNLOCKED!' },
        { type: 'system', content: '' },
        { type: 'output', content: randomSecret },
        { type: 'system', content: '' },
        { type: 'hint', content: '   Try: sudo, matrix, or keep exploring!' },
      ],
    };
  }

  private historyCommand(): CommandResult {
    return {
      type: 'history',
      output: [
        { type: 'info', content: 'Command history is stored locally' },
        { type: 'hint', content: 'Use ↑↓ arrow keys to navigate through previous commands' },
      ],
    };
  }

  private echoCommand(): CommandResult {
    return {
      type: 'echo',
      output: [{ type: 'output', content: 'Echo: Hello from the terminal!' }],
    };
  }

  private dateCommand(): CommandResult {
    const now = new Date();
    return {
      type: 'date',
      output: [
        { type: 'output', content: now.toLocaleString() },
        { type: 'info', content: `Unix timestamp: ${Math.floor(now.getTime() / 1000)}` },
      ],
    };
  }

  private sudoCommand(): CommandResult {
    return {
      type: 'sudo',
      output: [
        { type: 'error', content: '[sudo] password for visitor: ' },
        { type: 'error', content: 'Sorry, try again.' },
        { type: 'error', content: '[sudo] password for visitor: ' },
        { type: 'error', content: 'Sorry, try again.' },
        { type: 'error', content: '[sudo] password for visitor: ' },
        { type: 'error', content: 'sudo: 3 incorrect password attempts' },
        { type: 'hint', content: '😄 Nice try! But you don\'t need sudo here.' },
      ],
    };
  }

  private matrixCommand(): CommandResult {
    return {
      type: 'matrix',
      output: [
        { type: 'success', content: 'Wake up, Neo...' },
        { type: 'success', content: 'The Matrix has you...' },
        { type: 'success', content: 'Follow the white rabbit.' },
        { type: 'system', content: '' },
        { type: 'ascii', content: '     🐰' },
        { type: 'system', content: '' },
        { type: 'hint', content: 'Knock, knock, Neo.' },
      ],
    };
  }

  private quoteCommand(): CommandResult {
    const quotes = [
      { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
      { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
      { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
      { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
      { text: 'Clean code always looks like it was written by someone who cares.', author: 'Robert C. Martin' },
      { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' },
    ];

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return {
      type: 'quote',
      output: [
        { type: 'success', content: '💭 Random Tech Quote:' },
        { type: 'system', content: '' },
        { type: 'output', content: `"${quote.text}"` },
        { type: 'info', content: `   - ${quote.author}` },
      ],
    };
  }

  private settingsCommand(): CommandResult {
    return {
      type: 'settings',
      output: [
        { type: 'success', content: '⚙️  Opening settings panel...' },
        { type: 'hint', content: '   Or use these commands:' },
        { type: 'info', content: '   • sound - Toggle sound effects' },
        { type: 'info', content: '   • crt - Toggle CRT effect' },
        { type: 'info', content: '   • scanlines - Toggle scanlines' },
        { type: 'info', content: '   • theme - Change color theme' },
      ],
    };
  }

  private soundCommand(): CommandResult {
    return {
      type: 'sound',
      output: [
        { type: 'success', content: '🔊 Sound effects toggled!' },
        { type: 'hint', content: '   Check the footer to see current status' },
      ],
    };
  }

  private crtCommand(): CommandResult {
    return {
      type: 'crt',
      output: [
        { type: 'success', content: '📺 CRT effect toggled!' },
        { type: 'hint', content: '   Vintage monitor simulation' },
      ],
    };
  }

  private scanlinesCommand(): CommandResult {
    return {
      type: 'scanlines',
      output: [
        { type: 'success', content: '📼 Scanlines toggled!' },
        { type: 'hint', content: '   Retro TV scanline effect' },
      ],
    };
  }

  private errorCommand(command: string): CommandResult {
    return {
      type: 'error',
      output: [
        {
          type: 'error',
          content: `Command not found: ${command}`,
        },
        {
          type: 'hint',
          content: 'Type "help" to see available commands',
        },
      ],
    };
  }
}
