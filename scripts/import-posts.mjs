import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { parse, stringify } from 'yaml';

const sourceDir = new URL('../posts/', import.meta.url);
const targetDir = new URL('../content/posts/', import.meta.url);

const categoryMap = {
  技术: '前端手札',
  前端开发: '前端手札',
  后端开发: '前端手札',
  开发工具: '工程拾贝',
  部署运维: '工程拾贝',
  测试: '工程拾贝',
  平台介绍: '岛上生活',
};

const covers = {
  'code-highlight-test': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85',
  'css-grid-flexbox': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
  'impeccable-ai-design-tool': 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
  'nextjs-blog-tutorial': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
  'nvm-installation-guide': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1400&q=85',
  'openspace-self-evolving-agent': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85',
  'react-hooks-infinite-scroll': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=85',
  'react-hooks-guide': 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=1400&q=85',
  'superpowers-ai-workflow': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
  'table-test': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',
  'typescript-best-practices': 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1400&q=85',
  'vercel-deployment-guide': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85',
  'welcome-to-blogspace': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
};

const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.md')).sort();

for (const file of files) {
  const raw = await readFile(new URL(file, sourceDir), 'utf8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error(`${file} 缺少有效的 frontmatter`);

  const sourceMeta = parse(match[1]);
  const slug = basename(file, '.md').toLowerCase();
  const meta = {
    title: sourceMeta.title,
    slug,
    date: String(sourceMeta.date),
    cover: covers[slug],
    category: categoryMap[sourceMeta.category] ?? '工程拾贝',
    tags: sourceMeta.tags ?? [],
    description: sourceMeta.excerpt ?? sourceMeta.description ?? sourceMeta.title,
    draft: false,
  };

  let content = match[2].trim();
  if (slug === 'welcome-to-blogspace') {
    meta.title = '欢迎来到岛屿手记，开启你的技术分享之旅';
    meta.description = '认识岛屿手记的内容结构、阅读功能和写作方式，一起维护这座持续生长的技术小岛。';
    meta.tags = ['岛屿手记', '技术博客', 'React', 'Vite'];
    content = content
      .replaceAll('JieCheng.Dev', '岛屿手记')
      .replaceAll('Next.js 14', 'React 18 + Vite 5')
      .replaceAll('React 18 + Vite 5** - 最新的 React 全栈框架', 'React 18 + Vite 5** - 轻量快速的应用基础')
      .replaceAll('Next.js 和 TypeScript', 'React、Vite 和 TypeScript')
      .replaceAll('src/app/', 'src/pages/')
      .replaceAll('Next.js App Router', 'React Router')
      .replaceAll('静态生成', '静态构建')
      .replaceAll('在 `posts` 目录', '在 `content/posts` 目录');
  }

  const output = `---\n${stringify(meta).trim()}\n---\n\n${content}\n`;
  await writeFile(new URL(file.toLowerCase(), targetDir), output, 'utf8');
}

console.log(`Imported ${files.length} posts from ${sourceDir.pathname} to ${targetDir.pathname}`);
