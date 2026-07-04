import fs from "node:fs";
import path from "node:path";
import rawPosts from "@/data/posts_index.json";

export interface PostMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
  tag: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDir = path.join(process.cwd(), "src/data/posts");

const allPosts: PostMeta[] = (() => {
  const seen = new Set<string>();
  return (rawPosts as PostMeta[]).filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
})();

export function getAllPosts(): PostMeta[] {
  return allPosts;
}

export function getPostById(id: string): Post | null {
  const meta = allPosts.find((p) => p.id === id);
  if (!meta) return null;

  const dir = meta.tag ? path.join(postsDir, meta.tag) : postsDir;
  const filePath = path.join(dir, `${id}.md`);

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return { ...meta, content };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  allPosts.forEach((p) => {
    if (p.tag) tags.add(p.tag);
    p.tags?.forEach((t) => tags.add(t));
  });
  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return allPosts.filter(
    (p) => p.tag === tag || p.tags?.includes(tag)
  );
}
