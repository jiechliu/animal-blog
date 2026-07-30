import { PostCard } from './PostCard';
import type { Post } from '../data/posts';

export function PostList({ posts, compact = false }: { posts: Post[]; compact?: boolean }) {
  return <div className={compact ? 'post-list compact' : 'post-list'}>{posts.map((post) => <PostCard key={post.slug} post={post} compact={compact} />)}</div>;
}
