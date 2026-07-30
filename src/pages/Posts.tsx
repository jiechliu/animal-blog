import { useMemo, useState } from 'react';
import { Button, Card, Input, Select, Title } from 'animal-island-ui';
import { Search } from 'lucide-react';
import { categories, posts } from '../data/posts';
import { PostList } from '../components/PostList';
import { Seo } from '../components/Seo';

const PAGE_SIZE = 6;

export function Posts() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [year, setYear] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = posts.filter((post) => (!q || [post.title, post.description, ...post.tags].join(' ').toLowerCase().includes(q)) && (category === 'all' || post.category === category) && (year === 'all' || post.date.startsWith(year)));
    return sort === 'oldest' ? [...result].reverse() : result;
  }, [query, category, year, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const updateFilter = (fn: () => void) => { fn(); setPage(1); };

  return <main className="page-shell inner-page">
    <Seo title="全部文章" description="浏览岛屿手记的全部技术与生活文章。" />
    <div className="page-intro"><Title size="large" color="app-blue">全部文章</Title><p>沿着时间往回走，看看最近在思考什么。</p></div>
    <Card className="filter-panel">
      <div className="filter-search"><Input value={query} onChange={(e) => updateFilter(() => setQuery(e.target.value))} prefix={<Search size={18} />} placeholder="搜索文章" allowClear onClear={() => updateFilter(() => setQuery(''))} /></div>
      <div className="filter-select"><label>分类</label><Select value={category} onChange={(value) => updateFilter(() => setCategory(value))} options={[{ key: 'all', label: '全部分类' }, ...categories.map((item) => ({ key: item.name, label: item.name }))]} /></div>
      <div className="filter-select"><label>年份</label><Select value={year} onChange={(value) => updateFilter(() => setYear(value))} options={[{ key: 'all', label: '全部年份' }, { key: '2026', label: '2026' }, { key: '2025', label: '2025' }]} /></div>
      <div className="filter-select"><label>排序</label><Select value={sort} onChange={(value) => updateFilter(() => setSort(value))} options={[{ key: 'newest', label: '最新发布' }, { key: 'oldest', label: '最早发布' }]} /></div>
    </Card>
    <div className="result-summary"><strong>{filtered.length}</strong> 篇记录</div>
    {filtered.length ? <PostList posts={filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)} /> : <Card type="dashed" className="empty-state"><IconEmpty /><h2>这一片还没有脚印</h2><p>换个关键词或筛选条件再找找。</p></Card>}
    {pageCount > 1 && <div className="pagination"><Button disabled={current === 1} onClick={() => setPage((value) => value - 1)}>上一页</Button><span>{current} / {pageCount}</span><Button disabled={current === pageCount} onClick={() => setPage((value) => value + 1)}>下一页</Button></div>}
  </main>;
}

function IconEmpty() { return <span className="empty-mark">···</span>; }
