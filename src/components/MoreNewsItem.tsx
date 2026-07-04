import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function MoreNewsItem({ post }: { post: PostMeta }) {
  const cleanTitle = post.title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      ""
    )
    .trim();

  return (
    <Link href={`/blog/${post.id}`} className="group block py-4 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="text-xs text-text-secondary dark:text-dark-text shrink-0 w-[90px]">{post.date}</span>
        <h4 className="text-sm font-medium leading-snug group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-1">
          {cleanTitle || post.title}
        </h4>
        {post.tag && (
          <span className="text-[11px] text-primary dark:text-primary font-medium shrink-0 ml-auto">{post.tag}</span>
        )}
      </div>
    </Link>
  );
}
