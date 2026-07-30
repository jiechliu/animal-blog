import { Tooltip } from 'animal-island-ui';
import { posts } from '../data/posts';

const DAY = 86_400_000;

export function ContributionGraph({ compact = false }: { compact?: boolean }) {
  const end = new Date('2026-07-29T00:00:00');
  const counts = posts.reduce<Record<string, number>>((map, post) => {
    map[post.date] = (map[post.date] ?? 0) + 1;
    return map;
  }, {});
  const cells = Array.from({ length: 364 }, (_, index) => {
    const date = new Date(end.getTime() - (363 - index) * DAY);
    const key = date.toISOString().slice(0, 10);
    const count = counts[key] ?? 0;
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
    return { key, count, level };
  });

  return (
    <div className={compact ? 'contribution compact' : 'contribution'}>
      {!compact && <div className="contribution-head"><div><strong>2025–2026 年度贡献</strong><span>{posts.length} 次创作落点</span></div><span className="contribution-note">每一格，都是一次认真记录</span></div>}
      <div className="graph-scroll" tabIndex={0} aria-label="年度文章贡献图，可横向滚动">
        <div className="graph-grid">
          {cells.map((cell) => (
            <Tooltip key={cell.key} title={`${cell.key} · ${cell.count} 篇`} placement="top">
              <span className={`graph-cell level-${cell.level}`} aria-hidden="true" />
            </Tooltip>
          ))}
        </div>
      </div>
      {!compact && <div className="graph-legend"><span>少</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`graph-cell level-${level}`} />)}<span>多</span></div>}
    </div>
  );
}
