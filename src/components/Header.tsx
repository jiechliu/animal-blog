import { useEffect, useState } from 'react';
import { Button, Drawer, Icon, Input } from 'animal-island-ui';
import { Menu, Search } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchModal } from './SearchModal';

const links = [
  ['/', '首页'], ['/posts', '文章'], ['/categories', '分类'], ['/tags', '标签'], ['/archive', '归档'], ['/about', '关于'],
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <button type="button" className="brand" onClick={() => navigate('/')} aria-label="回到首页">
            <span className="brand-mark"><Icon name="icon-diy" size={28} /></span>
            <span><strong>岛屿手记</strong><small>ISLAND NOTES</small></span>
          </button>
          <nav className="desktop-nav" aria-label="主导航">
            {links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
          </nav>
          <div className="nav-tools">
            <div className="nav-search" onClick={() => setSearchOpen(true)}>
              <Input readOnly value="" prefix={<Search size={16} />} placeholder="搜索" suffix={<kbd>⌘ K</kbd>} aria-label="打开搜索" />
            </div>
            <div className="mobile-menu-button"><Button type="text" icon={<Menu size={23} />} aria-label="打开导航菜单" onClick={() => setMenuOpen(true)} /></div>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Drawer open={menuOpen} title="去岛上看看" onClose={() => setMenuOpen(false)} placement="right" width="min(86vw, 360px)">
        <nav className="mobile-nav" aria-label="移动端导航">
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
          <Button type="primary" icon={<Search size={18} />} onClick={() => { setMenuOpen(false); setSearchOpen(true); }}>搜索文章</Button>
        </nav>
      </Drawer>
    </>
  );
}
