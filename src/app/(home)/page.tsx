import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'V8 Blog',
};

const PER_PAGE = 10;

function cleanTitle(title: string): string {
  return title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      '',
    )
    .trim();
}

export default function HomePage() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  const pagePosts = posts.slice(0, PER_PAGE);

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-12">
      <div className="grid grid-cols-[208px_1fr] gap-14">
        <Sidebar />

        <div className="min-w-0">
          {pagePosts.map((post) => {
            const clean = cleanTitle(post.title) || post.title;
            return (
              <article key={post.id} className="mb-8 last:mb-0">
                <span className="text-sm text-text-secondary dark:text-dark-text block mb-1">{post.date}</span>
                <h2 className="text-lg font-semibold leading-snug">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {clean}
                  </Link>
                </h2>
                {post.tag && (
                  <p className="text-sm text-text-secondary dark:text-dark-text mt-1 leading-relaxed">
                    {post.tag === 'webassembly' ? 'WebAssembly' : post.tag.charAt(0).toUpperCase() + post.tag.slice(1)} related performance
                    analysis and V8 engine internals.
                  </p>
                )}
                <hr className="mt-6 border-border/40 dark:border-dark-border/40" />
              </article>
            );
          })}

          {totalPages > 1 && (
            <nav className="flex items-center gap-2 mt-10" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={page === 1 ? '/' : `/page/${page}`}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    page === 1
                      ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                      : 'text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface'
                  }`}
                >
                  {page}
                </Link>
              ))}
              {totalPages > 1 && (
                <Link
                  href="/page/2"
                  className="text-sm px-3 py-1 rounded text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface transition-colors ml-1"
                >
                  Next &rarr;
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
