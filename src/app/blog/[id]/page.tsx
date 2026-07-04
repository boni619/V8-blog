import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts, getPostById } from '@/lib/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return {};

  const cleanTitle = post.title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      '',
    )
    .trim();

  return {
    title: cleanTitle || post.title,
    description: `V8 Blog post about ${post.tag || 'V8 engine'} — ${post.date}`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  const cleanTitle = post.title
    .replace(
      /internals|memory|release|javascript|webassembly|ecmascript|regexp|benchmarks|cppgc|tooling|parsing|presentations|nodejs|security|systemanalyzer|tools|understanding-ecmascript|intl/g,
      '',
    )
    .trim();

  return (
    <article className="mx-auto max-w-[700px] px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors group"
      >
        <ArrowLeft size={14} strokeWidth={1.75} className="group-hover:-translate-x-0.5 transition-transform" />
        Back
      </Link>

      {/* <span className="text-sm text-text-secondary dark:text-dark-text block mb-3">
        {post.date}
        {post.tag && (
          <>
            {' '}
            &middot; <span className="text-primary dark:text-primary font-medium">{post.tag}</span>
          </>
        )}
      </span> */}

      {/* <h1 className="text-2xl font-semibold tracking-tight text-balance mb-8 leading-tight">
        {cleanTitle || post.title}
      </h1> */}

      <MarkdownRenderer content={post.content} />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-border/40 dark:border-dark-border/40">
          <div className="flex flex-wrap gap-2 text-sm text-text-secondary dark:text-dark-text">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="hover:text-primary dark:hover:text-primary transition-colors underline underline-offset-2 decoration-border/60"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary dark:text-dark-text hover:text-text dark:hover:text-dark-text transition-colors group"
        >
          <ArrowLeft size={14} strokeWidth={1.75} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
      </div>
    </article>
  );
}
