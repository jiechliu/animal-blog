import { Tag, Title } from 'animal-island-ui';
import { useNavigate, useParams } from 'react-router-dom';
import { posts, tags } from '../data/posts';
import { PostList } from '../components/PostList';
import { Seo } from '../components/Seo';

const colors = ['app-teal', 'app-pink', 'app-blue', 'app-yellow', 'app-green', 'app-orange', 'purple'] as const;

export function Tags() {
  const navigate = useNavigate();
  return <main className="page-shell inner-page tag-page"><Seo title="标签地图" description="通过标签发现相关主题。" /><div className="page-intro"><Title size="large" color="app-teal">标签地图</Title><p>把散落在文章里的关键词连成一张地图。</p></div><div className="tag-cloud">{tags.map((tag, index) => <Tag key={tag.name} size={tag.count > 1 ? 'large' : 'medium'} color={colors[index % colors.length]} onClick={() => navigate(`/tags/${encodeURIComponent(tag.name)}`)}>{tag.name} · {tag.count}</Tag>)}</div></main>;
}

export function TagDetail() {
  const { slug } = useParams();
  const name = decodeURIComponent(slug ?? '');
  const items = posts.filter((post) => post.tags.includes(name));
  return <main className="page-shell inner-page"><Seo title={`标签：${name}`} description={`查看所有带有 ${name} 标签的文章。`} /><div className="page-intro"><Title size="large" color="app-teal">#{name}</Title><p>找到 {items.length} 篇相关记录。</p></div><PostList posts={items} /></main>;
}
