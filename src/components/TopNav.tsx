'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export default function TopNav() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-10 border-b border-border/60 dark:border-dark-border/60 bg-background/95 dark:bg-dark-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[700px] px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-semibold text-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors"
        >
          V8 Blog
        </Link>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/boni619/V8-blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-sm text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={14} strokeWidth={1.75} /> : <Sun size={14} strokeWidth={1.75} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
