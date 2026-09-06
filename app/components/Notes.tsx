import {
  getAllPosts,
  getPostBySlug,
  calculateReadTime,
  formatPostDateSlash,
} from '@/lib/posts';

export default async function Notes() {
  const posts = await getAllPosts();

  // Calculate read time for each post
  const postsWithReadTime = await Promise.all(
    posts.map(async post => {
      const fullPost = await getPostBySlug(post.slug);
      const readTime = calculateReadTime(fullPost?.content ?? '');
      
      return { ...post, readTime };
    })
  );

  return (
    <section id="notes" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <h2 className="mb-12 text-4xl font-bold text-ink">Notes</h2>

        {postsWithReadTime.length === 0 ? (
          <p className="text-ink-soft">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {postsWithReadTime.map(post => {
              return (
                <a
                  key={post.slug}
                  href={`/notes/${post.slug}`}
                  className="group flex items-start gap-6 p-6 py-6 transition-all duration-300 hover:border-signal hover:bg-paper-dim hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  {/* Date - Monospace */}
                  <div className="font-mono text-sm text-ink-soft shrink-0 pt-1">
                    {formatPostDateSlash(post.date)}
                  </div>

                  {/* Title + Excerpt + Read Time */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-lg font-bold text-ink transition-colors duration-300 group-hover:text-signal">
                      {post.title}
                    </h3>
                    <p className="text-sm text-ink-soft line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read Time - Monospace */}
                  <div className="font-mono text-xs text-ink-soft shrink-0 pt-1">
                    {post.readTime} min
                  </div>
                </a>
              );
            })}

            {/* See More Section */}
            <div className="pt-6 flex justify-center">
              <a
                href="#notes"
                className="text-sm font-medium text-signal transition-all duration-300 hover:text-ink hover:underline cursor-pointer"
              >
                See more →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
