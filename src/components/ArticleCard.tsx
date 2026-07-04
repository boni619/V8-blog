import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const colors = [
  "bg-blue-50 dark:bg-blue-950/30",
  "bg-pink-50 dark:bg-pink-950/30",
  "bg-cyan-50 dark:bg-cyan-950/30",
  "bg-emerald-50 dark:bg-emerald-950/30",
  "bg-orange-50 dark:bg-orange-950/30",
  "bg-violet-50 dark:bg-violet-950/30",
  "bg-amber-50 dark:bg-amber-950/30",
  "bg-rose-50 dark:bg-rose-950/30",
  "bg-teal-50 dark:bg-teal-950/30",
  "bg-indigo-50 dark:bg-indigo-950/30",
];

export default function ArticleCard({ post, index }: { post: PostMeta; index: number }) {
  const cleanTitle = post.title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      ""
    )
    .trim();

  return (
    <Link href={`/blog/${post.id}`} className="group block">
      <article className="rounded-xl border border-border/60 dark:border-dark-border/60 bg-surface dark:bg-dark-surface overflow-hidden transition-all duration-200 hover:border-border dark:hover:border-dark-border">
        <div className={`aspect-video ${colors[index % colors.length]} flex items-end`}>
          <div className="w-full h-1 bg-primary/20 dark:bg-primary/40" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2.5 mb-2.5 text-xs text-text-secondary dark:text-dark-text">
            {post.tag && (
              <span className="text-primary dark:text-primary font-medium">{post.tag}</span>
            )}
            {post.tag && <span className="w-0.5 h-0.5 rounded-full bg-border dark:bg-dark-border" />}
            <span>{post.date}</span>
          </div>
          <h3 className="text-[15px] font-semibold leading-snug group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2">
            {cleanTitle || post.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
