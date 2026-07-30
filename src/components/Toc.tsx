import { useEffect, useState } from 'react';

export interface TocItem { id: string; text: string; level: number }

export function Toc({ items, onNavigate }: { items: TocItem[]; onNavigate?: () => void }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-18% 0px -70% 0px' });
    items.forEach((item) => { const el = document.getElementById(item.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [items]);
  return <nav className="toc" aria-label="文章目录">{items.map((item) => <a key={item.id} className={`${item.level === 3 ? 'toc-sub' : ''} ${active === item.id ? 'active' : ''}`} href={`#${item.id}`} onClick={onNavigate}>{item.text}</a>)}</nav>;
}
