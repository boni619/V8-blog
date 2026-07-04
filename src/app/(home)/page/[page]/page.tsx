import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

interface Props {
  params: Promise<{ page: string }>;
}

const PER_PAGE = 10;

function cleanTitle(title: string): string {
  return title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      '',
    )
    .trim();
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE);
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `V8 Blog — Page ${page}`,
  };
}

export default async function PaginatedPage({ params }: Props) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam, 10);

  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / PER_PAGE);

  if (isNaN(page) || page < 2 || page > totalPages) notFound();

  const pagePosts = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

          <nav className="flex items-center gap-2 mt-10" aria-label="Pagination">
            <Link
              href={`/page/${page - 1}`}
              className="text-sm px-3 py-1 rounded text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface transition-colors"
            >
              &larr; Prev
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={p === 1 ? '/' : `/page/${p}`}
                className={`text-sm px-3 py-1 rounded transition-colors ${
                  p === page
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium'
                    : 'text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface'
                }`}
              >
                {p}
              </Link>
            ))}
            {page < totalPages && (
              <Link
                href={`/page/${page + 1}`}
                className="text-sm px-3 py-1 rounded text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface transition-colors ml-1"
              >
                Next &rarr;
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
