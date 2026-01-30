import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terminal Portfolio | Your Name",
  description: "Interactive terminal-style portfolio showcasing my work, skills, and experience as a software developer. Built with Next.js, React, and TypeScript.",
  keywords: ["portfolio", "developer", "software engineer", "terminal", "cli", "interactive", "web development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  metadataBase: new URL('https://yourwebsite.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Terminal Portfolio | Your Name",
    description: "Interactive terminal-style portfolio - Experience my work through a unique command-line interface",
    siteName: "Terminal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal Portfolio | Your Name",
    description: "Interactive terminal-style portfolio",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${firaCode.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
