import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, calculateReadTime, formatPostDateLong } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} — Notes`,
    description: post.excerpt,
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = calculateReadTime(post.content);

  return (
    <article className="border-b border-line bg-paper">
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Metadata */}
        <div className="mb-8 space-y-4">
          <h1 className="text-5xl font-bold text-ink">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-ink-soft font-mono">
            <span>{formatPostDateLong(post.date)}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-ink-soft">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="mb-4 mt-10 text-3xl font-bold text-ink">{children}</h2>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 mt-10 text-2xl font-bold text-ink">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-3 mt-8 text-xl font-bold text-ink">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 text-base leading-relaxed text-ink-soft">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 list-disc space-y-2 pl-6 text-ink-soft">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 list-decimal space-y-2 pl-6 text-ink-soft">{children}</ol>
              ),
              blockquote: ({ children }) => (
                <blockquote className="mb-6 border-l-2 border-signal pl-4 italic text-ink-soft">
                  {children}
                </blockquote>
              ),
              pre: ({ children }) => (
                <pre className="mb-6 overflow-x-auto rounded-md bg-ink p-5 font-mono text-sm leading-relaxed text-paper">
                  {children}
                </pre>
              ),
              code: ({ children, className }) => (
                <code className={className ?? 'rounded bg-paper-dim px-1 py-0.5 text-sm text-ink'}>
                  {children}
                </code>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-signal underline transition-colors hover:text-ink"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="mb-8 w-full overflow-x-auto rounded-md border border-line">
                  <table className="w-full min-w-120 border-collapse text-left text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-paper-dim text-ink">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border-b border-line px-4 py-3 font-mono text-xs font-bold uppercase tracking-wide">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-line px-4 py-3 text-ink-soft last:border-b-0">
                  {children}
                </td>
              ),
              hr: () => <hr className="my-10 border-line" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Back link */}
        <div className="mt-16 border-t border-line pt-8">
          <a
            href="/#notes"
            className="inline-flex text-sm font-medium text-signal transition-colors hover:text-signal/80"
          >
            ← Back to notes
          </a>
        </div>
      </div>
    </article>
  );
}
