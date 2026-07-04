import { renderMarkdown } from "@/lib/markdown";

interface Props {
  content: string;
}

export default async function MarkdownRenderer({ content }: Props) {
  const html = await renderMarkdown(content);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
