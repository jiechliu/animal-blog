import { Button, Card, Icon, Tag, Title } from 'animal-island-ui';
import { Github, Mail, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profile from '../data/profile.json';
import { categories, posts } from '../data/posts';
import { ContributionGraph } from '../components/ContributionGraph';
import { PostList } from '../components/PostList';
import { Seo } from '../components/Seo';

export function Home() {
  const navigate = useNavigate();
  const totalWords = posts.reduce((sum, post) => sum + post.words, 0);
  return (
    <>
      <Seo title="岛屿手记" description="关于前端、设计与持续创造的中文技术博客。" />
      <main>
        <section className="hero page-shell">
          <div className="hero-copy">
            <span className="eyebrow"><Icon name="icon-map" size={24} />欢迎登岛</span>
            <h1>岛屿手记</h1>
            <p className="hero-signature">{profile.bio}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions"><Button type="primary" size="large" onClick={() => navigate('/posts')}>开始阅读</Button><Button size="large" onClick={() => navigate('/about')}>认识岛民</Button></div>
            <div className="social-links"><Button type="link" icon={<Github size={17} />} onClick={() => window.open(profile.social.github, '_blank')}>GitHub</Button><Button type="link" icon={<Mail size={17} />} onClick={() => { window.location.href = profile.social.email; }}>写信</Button></div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-backdrop"><img src={profile.avatar} alt={`${profile.name}的头像`} /></div>
            <div className="hero-note"><span>今天也在岛上</span><strong>写一点，再写一点</strong></div>
          </div>
        </section>

        <section className="stats-band"><div className="page-shell stats-list">
          <Tag size="large" color="app-teal"><strong>{posts.length}</strong> 篇文章</Tag>
          <Tag size="large" color="app-blue"><strong>{categories.length}</strong> 个分类</Tag>
          <Tag size="large" color="app-pink"><strong>{(totalWords / 1000).toFixed(1)}k</strong> 字记录</Tag>
          <Tag size="large" color="app-yellow"><strong>234</strong> 天在场</Tag>
        </div></section>

        <section className="page-shell section-block contribution-section"><ContributionGraph /></section>

        <section className="page-shell section-block">
          <div className="section-heading"><Title size="large" color="app-teal">最新文章</Title><Button type="link" icon={<MoveRight size={17} />} onClick={() => navigate('/posts')}>查看全部</Button></div>
          <PostList posts={posts.slice(0, 6)} />
        </section>

        <section className="category-band"><div className="page-shell section-block">
          <div className="section-heading"><Title size="large" color="app-yellow">精选分类</Title></div>
          <div className="category-grid">
            {categories.map((category, index) => <Card key={category.slug} color={category.color} pattern={index % 2 ? 'none' : category.color} hoverable onClick={() => navigate(`/categories/${category.slug}`)} tabIndex={0} role="link" onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/categories/${category.slug}`); }}><span>{String(index + 1).padStart(2, '0')}</span><h3>{category.name}</h3><p>{category.description}</p><small>{posts.filter((post) => post.category === category.name).length} 篇文章</small></Card>)}
          </div>
        </div></section>
      </main>
    </>
  );
}
