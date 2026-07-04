import Link from 'next/link';
import { getAllPosts, getAllTags } from '@/lib/posts';

function cleanTitle(title: string): string {
  return title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      '',
    )
    .trim();
}

export default function Sidebar() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const latestPosts = posts.slice(0, 5);

  return (
    <aside className="hidden md:block sticky top-24 self-start w-52">
      <div>
        <h4 className="text-xs font-semibold text-text-secondary dark:text-dark-text uppercase tracking-wider mb-3">Latest posts</h4>
        <div className="space-y-3">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block text-sm leading-snug text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors"
            >
              {cleanTitle(post.title) || post.title}
            </Link>
          ))}
        </div>
        <hr className="border-border/40 dark:border-dark-border/40 mb-8" />
        <h4 className="text-xs font-semibold text-text-secondary dark:text-dark-text uppercase tracking-wider mb-3">Tags</h4>
        <div className="space-y-0.5 mb-8">
          {tags.map((tag) => {
            const count = posts.filter((p) => p.tag === tag || p.tags?.includes(tag)).length;
            return (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="flex items-center justify-between text-sm py-1 text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors"
              >
                <span>{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
                <span className="text-xs text-text-secondary/60 dark:text-dark-text/60">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
