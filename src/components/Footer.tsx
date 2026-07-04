import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/60 dark:border-dark-border/60 bg-background dark:bg-dark-background">
      <div className="mx-auto max-w-[700px] px-6 py-12">
        <div className="flex flex-col items-start gap-6 text-sm text-text-secondary dark:text-dark-text">
          <div>
            <p className="font-medium text-text dark:text-dark-text">V8 Blog</p>
            <p className="mt-1">A blog about google v8 javascript engine.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/boni619/V8-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text dark:hover:text-dark-text transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink size={16} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
