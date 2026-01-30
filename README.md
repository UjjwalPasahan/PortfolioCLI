# 💻 Interactive Terminal Portfolio

A stunning, feature-rich terminal-style portfolio website built with Next.js, React, and TypeScript. Experience the nostalgia of a command-line interface with modern web technologies.

![Terminal Portfolio](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎯 Core Functionality
- **Realistic Terminal Interface** - Authentic command-line experience with Unix/Linux aesthetics
- **Command History** - Navigate through previous commands with ↑↓ arrow keys
- **Tab Completion** - Smart autocomplete suggestions as you type
- **Command Aliases** - Multiple ways to execute commands (e.g., `ls` = `help`)
- **Local Storage** - Saves preferences, history, and theme settings

### 🎨 Visual Effects
- **Multiple Themes** - 6 beautiful color schemes (Matrix, Amber, Ocean Blue, Dracula, Monokai, Cyberpunk)
- **CRT Effect** - Optional vintage monitor effect with authentic scanlines
- **Glowing Text** - Neon-style text with customizable glow effects
- **Smooth Animations** - Typing effects, cursor blinking, and smooth transitions
- **ASCII Art** - Beautiful banner and decorative elements
- **Custom Scrollbar** - Styled to match the terminal aesthetic

### 🛠️ Commands Available

#### General
- `help`, `?` - Display all available commands
- `about`, `info` - Learn about you
- `whoami` - Quick introduction
- `banner`, `logo` - Display ASCII banner
- `quote` - Get random tech quotes

#### Professional
- `experience`, `work` - View work history
- `projects` - Browse portfolio projects
- `skills`, `tech` - See technical skills
- `education`, `edu` - Educational background
- `resume`, `cv` - Download resume PDF

#### Contact & Social
- `contact`, `social` - Get contact information
- `website`, `gui` - Visit GUI portfolio version

#### Terminal Controls
- `clear`, `cls` - Clear terminal screen
- `theme` - Toggle color themes
- `history` - Show command history
- `date` - Display current date/time

#### Fun Stuff
- `secret` - Discover hidden features
- `matrix` - Enter the Matrix
- `sudo` - Try it and see! 😄

### ⌨️ Keyboard Shortcuts
- `Tab` - Autocomplete command
- `↑` `↓` - Navigate command history
- `Ctrl+L` - Clear screen
- `Ctrl+C` - Cancel current input
- `ESC` - Close autocomplete menu

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Customize your content** (See [Customization](#-customization) below)

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Update Personal Information

Edit `lib/portfolioData.ts` to add your information:

```typescript
export const portfolioData = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your bio...',
  // ... more fields
};
```

### Key Sections to Customize:

1. **Personal Info** - Name, title, bio, location
2. **Experience** - Add your work history
3. **Projects** - Showcase your projects with links
4. **Skills** - List your technical skills by category
5. **Education** - Add your educational background
6. **Contact** - Update all contact links and email
7. **Resume URL** - Link to your resume PDF

### Add Your Resume

Place your resume PDF in the `public` folder:
```
public/
  └── resume.pdf
```

Update the `resumeUrl` in `portfolioData.ts`:
```typescript
resumeUrl: '/resume.pdf',
```

### Change Themes

Themes are defined in `hooks/useTheme.ts`. You can:
- Modify existing themes
- Add new themes
- Change the default theme

### Customize Commands

To add or modify commands, edit `lib/commandHandler.ts`

## 📁 Project Structure

```
my-portfolio/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Terminal.tsx         # Main terminal component
│   ├── TerminalHeader.tsx   # Terminal header
│   ├── TerminalOutput.tsx   # Output display
│   ├── TerminalInput.tsx    # Input handling
│   ├── TerminalFooter.tsx   # Terminal footer
│   └── LoadingScreen.tsx    # Loading animation
├── hooks/
│   ├── useTerminalHistory.ts # Command history hook
│   ├── useTheme.ts          # Theme management
│   ├── useSound.ts          # Sound effects
│   └── useLocalStorage.ts   # Local storage utility
├── lib/
│   ├── commandHandler.ts    # Command logic
│   └── portfolioData.ts     # Your personal data
├── types/
│   └── terminal.ts          # TypeScript types
├── styles/
│   └── terminal.css         # Main terminal styles
└── public/
    └── resume.pdf           # Your resume
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Theme Colors

### Matrix (Default)
- Primary: `#00ff00` | Background: `#000000`

### Amber
- Primary: `#ffb000` | Background: `#1a0f00`

### Ocean Blue
- Primary: `#00d4ff` | Background: `#001220`

### Dracula
- Primary: `#bd93f9` | Background: `#282a36`

### Monokai
- Primary: `#f92672` | Background: `#272822`

### Cyberpunk
- Primary: `#ff00ff` | Background: `#0a0a0a`

## 💡 Tips

1. **Test All Commands** - Make sure all your links and information are correct
2. **Update Resume** - Keep your resume PDF up to date
3. **SEO** - Update meta tags in `app/layout.tsx`
4. **Customize ASCII Art** - Make it unique to you!

## 🐛 Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Styling Issues
- Clear browser cache
- Verify CSS import in `globals.css`

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

**Made with ❤️ and TypeScript**

Enjoy your new terminal portfolio! 🚀
