import { useMemo, useState } from 'react';
import { Button, Drawer, Modal, Notification, TabItem, Tabs, Tag } from 'animal-island-ui';
import { CalendarDays, Clock3, List, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { GiscusComments } from '../components/GiscusComments';
import { PostList } from '../components/PostList';
import { ReadingProgress } from '../components/ReadingProgress';
import { Seo } from '../components/Seo';
import { Toc } from '../components/Toc';
import { extractToc } from '../components/toc-utils';
import { formatDate, getCategory, getPost, posts } from '../data/posts';
import { NotFound } from './NotFound';

export function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPost(slug);
  const [tocOpen, setTocOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const toc = useMemo(() => post ? extractToc(post.content) : [], [post]);
  if (!post) return <NotFound />;
  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = posts[index + 1];
  const next = posts[index - 1];
  const related = posts.filter((item) => item.slug !== post.slug && (item.category === post.category || item.tags.some((tag) => post.tags.includes(tag)))).slice(0, 3);
  const category = getCategory(post.category);
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); Notification.success({ message: '链接已复制', description: '可以分享给朋友了。' }); }
    catch { Notification.warning({ message: '未能自动复制', description: '请从浏览器地址栏复制链接。' }); }
  };
  const tabItems: TabItem[] = [
    { key: 'related', label: '相关文章', children: related.length ? <PostList posts={related} compact /> : <p>暂时没有相关文章。</p> },
    { key: 'comments', label: '评论', children: <GiscusComments /> },
  ];

  return <>
    <Seo title={post.title} description={post.description} image={post.cover} />
    <ReadingProgress />
    <main className="article-page page-shell">
      <div className="article-main">
        <Link className="article-back" to="/posts">返回全部文章</Link>
        <header className="article-header">
          <Tag color={category?.color ?? 'default'}>{post.category}</Tag>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="article-meta"><span><CalendarDays size={17} />{formatDate(post.date)}</span><span><Clock3 size={17} />阅读约 {post.readingMinutes} 分钟</span></div>
          <div className="article-tags">{post.tags.map((tag) => <Tag key={tag} size="small" variant="outlined" color="brown" onClick={() => navigate(`/tags/${encodeURIComponent(tag)}`)}>#{tag}</Tag>)}</div>
          <div className="article-mobile-actions"><Button icon={<List size={18} />} onClick={() => setTocOpen(true)}>目录</Button><Button icon={<Share2 size={18} />} onClick={share}>分享</Button></div>
        </header>
        <button type="button" className="cover-button" onClick={() => setPreview(post.cover)} aria-label="放大查看文章封面"><img src={post.cover} alt={`${post.title}的文章封面`} /></button>
        <article className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]} components={{
            img: ({ src = '', alt = '' }) => <img src={src} alt={alt} loading="lazy" role="button" tabIndex={0} onClick={() => setPreview(src)} onKeyDown={(e) => { if (e.key === 'Enter') setPreview(src); }} />,
            a: ({ href = '', children }) => href.startsWith('http') ? <a href={href} target="_blank" rel="noreferrer">{children}</a> : <Link to={href}>{children}</Link>,
          }}>{post.content}</ReactMarkdown>
        </article>
        <div className="article-share"><p>读到这里，谢谢你。</p><Button type="primary" icon={<Share2 size={18} />} onClick={share}>分享这篇文章</Button></div>
        <nav className="post-neighbors" aria-label="上一篇和下一篇">
          {previous ? <Link to={`/posts/${previous.slug}`}><span>上一篇</span><strong>{previous.title}</strong></Link> : <span />}
          {next ? <Link to={`/posts/${next.slug}`}><span>下一篇</span><strong>{next.title}</strong></Link> : <span />}
        </nav>
        <section className="article-tabs"><Tabs items={tabItems} defaultActiveKey="related" /></section>
      </div>
      <aside className="article-toc-card"><strong>这篇文章</strong><Toc items={toc} /><Button type="text" icon={<Share2 size={17} />} onClick={share}>复制链接</Button></aside>
    </main>
    <Drawer open={tocOpen} title="文章目录" placement="bottom" height="min(72vh, 520px)" onClose={() => setTocOpen(false)} pushBackground={false}><Toc items={toc} onNavigate={() => setTocOpen(false)} /></Drawer>
    <Modal open={Boolean(preview)} title="图片预览" footer={null} typewriter={false} width="min(92vw, 1000px)" onClose={() => setPreview(null)}>{preview && <img className="image-preview" src={preview} alt="文章图片大图预览" />}</Modal>
  </>;
}
