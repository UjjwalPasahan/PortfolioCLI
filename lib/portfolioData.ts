import { Project, Experience, Skill } from '@/types/terminal';

interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  specializations: string[];
  yearsOfExperience: number;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  education: {
    degree: string;
    institution: string;
    period: string;
    highlights?: string[];
  }[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    phone: string;
  };
  resumeUrl: string;
  websiteUrl: string;
}

export const portfolioData: PortfolioData = {
  name: 'Your Name',
  title: 'Full Stack Developer & Software Engineer',
  tagline: 'Building elegant solutions to complex problems 🚀',
  bio: 'Passionate software engineer with expertise in full-stack development, cloud architecture, and modern web technologies. I love creating efficient, scalable applications and contributing to open-source projects.',
  location: 'San Francisco, CA',
  specializations: [
    'Full Stack Development',
    'Cloud Architecture (AWS, Azure)',
    'DevOps & CI/CD',
    'Microservices Architecture',
    'API Design & Development',
  ],
  yearsOfExperience: 5,

  experience: [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp Inc.',
      period: '2022 - Present',
      description: [
        'Led development of microservices architecture serving 1M+ users',
        'Reduced API response time by 60% through optimization',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines reducing deployment time by 80%',
      ],
      technologies: [
        'React',
        'Node.js',
        'TypeScript',
        'AWS',
        'Docker',
        'Kubernetes',
        'PostgreSQL',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      period: '2020 - 2022',
      description: [
        'Developed and maintained 10+ client web applications',
        'Built RESTful APIs and integrated third-party services',
        'Collaborated with designers to implement pixel-perfect UIs',
        'Improved application performance by 45%',
      ],
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'MongoDB',
        'GraphQL',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      period: '2019 - 2020',
      description: [
        'Contributed to the development of the company\'s main product',
        'Fixed bugs and implemented new features',
        'Participated in agile development processes',
        'Learned modern development practices and tools',
      ],
      technologies: ['JavaScript', 'React', 'Express.js', 'MySQL'],
    },
  ],

  projects: [
    {
      name: 'E-Commerce Platform',
      description:
        'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Handles 10k+ daily transactions.',
      technologies: [
        'Next.js',
        'TypeScript',
        'Stripe',
        'Prisma',
        'PostgreSQL',
        'Tailwind CSS',
      ],
      link: 'https://demo-ecommerce.com',
      github: 'https://github.com/yourusername/ecommerce-platform',
    },
    {
      name: 'Real-Time Chat Application',
      description:
        'WebSocket-based chat app with features like typing indicators, read receipts, file sharing, and end-to-end encryption.',
      technologies: [
        'React',
        'Socket.io',
        'Node.js',
        'Redis',
        'MongoDB',
        'WebRTC',
      ],
      link: 'https://demo-chat.com',
      github: 'https://github.com/yourusername/chat-app',
    },
    {
      name: 'Project Management Tool',
      description:
        'Collaborative project management tool with Kanban boards, time tracking, team collaboration, and reporting features.',
      technologies: [
        'Vue.js',
        'Django',
        'PostgreSQL',
        'Celery',
        'Redis',
        'Docker',
      ],
      github: 'https://github.com/yourusername/project-manager',
    },
    {
      name: 'AI Content Generator',
      description:
        'SaaS application that uses AI to generate marketing content, blog posts, and social media content. Integrated with OpenAI GPT.',
      technologies: [
        'React',
        'FastAPI',
        'OpenAI API',
        'Supabase',
        'Stripe',
        'Vercel',
      ],
      link: 'https://demo-ai-content.com',
      github: 'https://github.com/yourusername/ai-content-gen',
    },
  ],

  skills: [
    {
      category: 'Programming Languages',
      items: [
        'JavaScript/TypeScript',
        'Python',
        'Java',
        'Go',
        'SQL',
        'HTML/CSS',
      ],
    },
    {
      category: 'Frontend Development',
      items: [
        'React.js',
        'Next.js',
        'Vue.js',
        'Tailwind CSS',
        'Material-UI',
        'Redux',
        'React Query',
        'Webpack',
      ],
    },
    {
      category: 'Backend Development',
      items: [
        'Node.js',
        'Express.js',
        'Django',
        'FastAPI',
        'NestJS',
        'GraphQL',
        'REST APIs',
        'WebSockets',
      ],
    },
    {
      category: 'Databases',
      items: [
        'PostgreSQL',
        'MongoDB',
        'MySQL',
        'Redis',
        'Supabase',
        'Firebase',
      ],
    },
    {
      category: 'Cloud & DevOps',
      items: [
        'AWS (EC2, S3, Lambda, RDS)',
        'Docker',
        'Kubernetes',
        'CI/CD (GitHub Actions, Jenkins)',
        'Terraform',
        'Nginx',
        'Vercel',
      ],
    },
    {
      category: 'Tools & Others',
      items: [
        'Git',
        'VS Code',
        'Postman',
        'Figma',
        'Jira',
        'Agile/Scrum',
        'Linux',
        'Bash',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      period: '2015 - 2019',
      highlights: [
        'GPA: 3.8/4.0',
        'Dean\'s List all semesters',
        'President of Computer Science Club',
        'Capstone Project: Machine Learning based Recommendation System',
      ],
    },
    {
      degree: 'Full Stack Web Development Bootcamp',
      institution: 'Tech Academy',
      period: '2019',
      highlights: [
        'Intensive 12-week program',
        'Built 20+ projects',
        'Learned modern web development stack',
      ],
    },
  ],

  contact: {
    email: 'your.email@example.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourhandle',
    phone: '+1 (555) 123-4567',
  },

  resumeUrl: '/resume.pdf', // Place your resume.pdf in the public folder
  websiteUrl: 'https://yourwebsite.com', // Your GUI portfolio website
};
