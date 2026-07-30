import { readFile, readdir, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';

const contentDir = new URL('../content/posts/', import.meta.url);
const publicDir = new URL('../public/', import.meta.url);
const siteUrl = (process.env.SITE_URL ?? 'https://example.com').replace(/\/$/, '');

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

const files = (await readdir(contentDir)).filter((file) => file.endsWith('.md'));
const posts = [];

for (const file of files) {
  const raw = await readFile(new URL(file, contentDir), 'utf8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) throw new Error(`${file} 缺少有效的 frontmatter`);
  const meta = parse(match[1]);
  if (!meta.draft) posts.push(meta);
}

posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

const rssItems = posts.map((post) => {
  const url = `${siteUrl}/posts/${post.slug}`;
  return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(post.description)}</description></item>`;
}).join('');

const rss = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0"><channel><title>岛屿手记</title><link>${siteUrl}/</link><description>关于前端、设计与持续创造的中文技术博客。</description><language>zh-CN</language>${rssItems}</channel></rss>\n`;

const staticPaths = ['', 'posts', 'categories', 'tags', 'archive', 'about'];
const urls = [...staticPaths.map((path) => `${siteUrl}/${path}`), ...posts.map((post) => `${siteUrl}/posts/${post.slug}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join('')}</urlset>\n`;

await Promise.all([
  writeFile(new URL('rss.xml', publicDir), rss, 'utf8'),
  writeFile(new URL('sitemap.xml', publicDir), sitemap, 'utf8'),
]);

console.log(`Generated RSS and sitemap for ${posts.length} posts using ${siteUrl}`);
