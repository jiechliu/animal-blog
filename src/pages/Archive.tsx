import { Title } from 'animal-island-ui';
import { Link } from 'react-router-dom';
import { ContributionGraph } from '../components/ContributionGraph';
import { Seo } from '../components/Seo';
import { formatDate, posts } from '../data/posts';

export function Archive() {
  const years = Array.from(new Set(posts.map((post) => post.date.slice(0, 4))));
  return <main className="page-shell inner-page"><Seo title="文章归档" description="按时间查看岛屿手记的全部记录。" /><div className="page-intro"><Title size="large" color="brown">文章归档</Title><p>时间把零散的记录串成一条路。</p></div><div className="archive-layout"><div className="archive-timeline">{years.map((year) => <section key={year}><h2>{year}</h2>{posts.filter((post) => post.date.startsWith(year)).map((post) => <Link key={post.slug} to={`/posts/${post.slug}`}><time>{formatDate(post.date).replace(`${year}年`, '')}</time><strong>{post.title}</strong><span>{post.category}</span></Link>)}</section>)}</div><aside className="archive-aside"><strong>这一年的创作</strong><ContributionGraph compact /></aside></div></main>;
}
