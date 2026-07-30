import { CalendarDays, Clock3 } from 'lucide-react';
import { Card, Tag } from 'animal-island-ui';
import { Link } from 'react-router-dom';
import { formatDate, getCategory, type Post } from '../data/posts';

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const category = getCategory(post.category);
  return (
    <Link className={`post-card-link ${compact ? 'is-compact' : ''}`} to={`/posts/${post.slug}`}>
      <Card hoverable className="post-card">
        {!compact && <img className="post-card-cover" src={post.cover} alt={`${post.title}的文章封面`} loading="lazy" />}
        <div className="post-card-body">
          <Tag size="small" color={category?.color ?? 'default'}>{post.category}</Tag>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <div className="post-meta">
            <span><CalendarDays size={15} aria-hidden="true" />{formatDate(post.date)}</span>
            <span><Clock3 size={15} aria-hidden="true" />{post.readingMinutes} 分钟</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
