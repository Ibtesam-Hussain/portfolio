import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const matter = require('gray-matter');

const postsDir = path.join(process.cwd(), 'content', 'posts');

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export function formatPostDate(date: string): string {
  const parts = date.split('-');

  if (parts.length === 3 && parts[0].length === 2) {
    return date;
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return [
    String(parsedDate.getUTCDate()).padStart(2, '0'),
    String(parsedDate.getUTCMonth() + 1).padStart(2, '0'),
    parsedDate.getUTCFullYear(),
  ].join('-');
}

export function formatPostDateSlash(date: string): string {
  return formatPostDate(date).replaceAll('-', '/');
}

export function formatPostDateLong(date: string): string {
  const [day, month, year] = formatPostDate(date).split('-').map(Number);
  if (!day || !month || !year) return date;

  const suffix = day % 10 === 1 && day !== 11
    ? 'st'
    : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';
  const monthName = new Date(Date.UTC(year, month - 1, 1)).toLocaleString('en-US', {
    month: 'long',
    timeZone: 'UTC',
  });

  return `${monthName} ${day}${suffix} ${year}`;
}

/**
 * Get all posts sorted by date (newest first)
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
      };
    });

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDir, `${slug}.mdx`);
  const alternativePath = path.join(postsDir, `${slug}.md`);

  let filePath = fullPath;
  if (!fs.existsSync(fullPath) && fs.existsSync(alternativePath)) {
    filePath = alternativePath;
  } else if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content,
  };
}

/**
 * Calculate read time in minutes (rough estimate: 200 words per minute)
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const body = content.replace(/^---\s*[\s\S]*?\s*---\s*/, '');
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
