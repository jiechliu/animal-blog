import { Card, Title } from 'animal-island-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, posts } from '../data/posts';
import { PostList } from '../components/PostList';
import { Seo } from '../components/Seo';
import { NotFound } from './NotFound';

export function Categories() {
  const navigate = useNavigate();
  return <main className="page-shell inner-page"><Seo title="文章分类" description="按主题探索岛屿手记。" /><div className="page-intro"><Title size="large" color="app-pink">文章分类</Title><p>每个方向都是一条持续生长的小径。</p></div><div className="category-grid category-page-grid">{categories.map((category, index) => <Card key={category.slug} color={category.color} hoverable role="link" tabIndex={0} onClick={() => navigate(`/categories/${category.slug}`)} onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/categories/${category.slug}`); }}><span>{String(index + 1).padStart(2, '0')}</span><h2>{category.name}</h2><p>{category.description}</p><small>{posts.filter((post) => post.category === category.name).length} 篇文章</small></Card>)}</div></main>;
}

export function CategoryDetail() {
  const { slug } = useParams();
  const category = categories.find((item) => item.slug === slug);
  if (!category) return <NotFound />;
  const items = posts.filter((post) => post.category === category.name);
  return <main className="page-shell inner-page"><Seo title={category.name} description={category.description} /><div className="page-intro"><Title size="large" color={category.color}>{category.name}</Title><p>{category.description}，共 {items.length} 篇。</p></div><PostList posts={items} /></main>;
}
