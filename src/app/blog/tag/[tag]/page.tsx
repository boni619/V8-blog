import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/posts";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} articles`,
    description: `V8 Blog articles about ${tag}`,
  };
}

function cleanTitle(title: string): string {
  return title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      ""
    )
    .trim();
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-[700px] px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors mb-10 group"
      >
        <ArrowLeft size={14} strokeWidth={1.75} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight text-balance mb-2 capitalize">
        {tag}
      </h1>
      <p className="text-sm text-text-secondary dark:text-dark-text mb-10">
        {posts.length} {posts.length === 1 ? "article" : "articles"}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-10">
        <Link
          href="/"
          className="text-sm px-3 py-1 rounded text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface transition-colors"
        >
          All
        </Link>
        {getAllTags().map((t) => (
          <Link
            key={t}
            href={`/blog/tag/${t}`}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              t === tag
                ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium"
                : "text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text hover:bg-background dark:hover:bg-dark-surface"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Link>
        ))}
      </div>

      {posts.map((post) => {
        const clean = cleanTitle(post.title) || post.title;
        return (
          <article key={post.id} className="mb-8 last:mb-0">
            <span className="text-sm text-text-secondary dark:text-dark-text block mb-1">
              {post.date}
            </span>
            <h2 className="text-lg font-semibold leading-snug">
              <Link
                href={`/blog/${post.id}`}
                className="text-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-colors"
              >
                {clean}
              </Link>
            </h2>
            <hr className="mt-6 border-border/40 dark:border-dark-border/40" />
          </article>
        );
      })}
    </div>
  );
}
