import { useMemo, useState } from 'react';
import { Input, Modal, Tag } from 'animal-island-ui';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { posts } from '../data/posts';

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts.slice(0, 4);
    return posts.filter((post) => [post.title, post.description, post.category, ...post.tags].join(' ').toLowerCase().includes(normalized)).slice(0, 6);
  }, [query]);

  const choose = (slug: string) => { onClose(); setQuery(''); navigate(`/posts/${slug}`); };
  return (
    <Modal open={open} title="搜索岛屿手记" onClose={onClose} footer={null} typewriter={false} width={640} className="search-modal">
      <div className="search-dialog">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} prefix={<Search size={18} />} placeholder="搜索标题、摘要或标签" allowClear onClear={() => setQuery('')} autoFocus />
        <div className="search-results" aria-live="polite">
          {results.map((post) => (
            <button type="button" key={post.slug} className="search-result" onClick={() => choose(post.slug)}>
              <span className="search-result-copy"><strong>{post.title}</strong><small>{post.description}</small></span>
              <Tag className="search-result-tag" size="small" color="app-teal">{post.category}</Tag>
            </button>
          ))}
          {!results.length && <p className="empty-inline">没有找到相关记录，换个关键词试试。</p>}
        </div>
      </div>
    </Modal>
  );
}
