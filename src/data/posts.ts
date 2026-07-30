import { parse } from 'yaml';
import categoriesData from './categories.json';

export type CategoryColor =
  | 'app-blue' | 'app-teal' | 'app-pink' | 'app-yellow'
  | 'app-green' | 'app-orange' | 'purple' | 'brown';

export interface Category {
  slug: string;
  name: string;
  description: string;
  color: CategoryColor;
}

export interface Post {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  cover: string;
  category: string;
  tags: string[];
  description: string;
  draft: boolean;
  content: string;
  readingMinutes: number;
  words: number;
}

const rawModules = import.meta.glob('/content/posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parsePost(raw: string): Post {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error('文章缺少有效的 frontmatter');
  const meta = parse(match[1]) as Omit<Post, 'content' | 'readingMinutes' | 'words'>;
  const content = match[2].trim();
  const words = content.replace(/[\s#>*`|-]/g, '').length;
  return { ...meta, date: String(meta.date), updated: meta.updated ? String(meta.updated) : undefined, content, words, readingMinutes: Math.max(1, Math.ceil(words / 500)) };
}

export const posts = Object.values(rawModules)
  .map(parsePost)
  .filter((post) => !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const categories = categoriesData as Category[];

export const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))
  .map((name) => ({ name, count: posts.filter((post) => post.tags.includes(name)).length }))
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export const getCategory = (name: string) => categories.find((category) => category.name === name);
export const getPost = (slug?: string) => posts.find((post) => post.slug === slug);
export const formatDate = (date: string) => new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`));
