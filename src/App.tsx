import { BackTop, Cursor, Loading } from 'animal-island-ui';
import { Route, Routes, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Header } from './components/Header';
import { SiteFooter } from './components/SiteFooter';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const Posts = lazy(() => import('./pages/Posts').then((module) => ({ default: module.Posts })));
const PostDetail = lazy(() => import('./pages/PostDetail').then((module) => ({ default: module.PostDetail })));
const Categories = lazy(() => import('./pages/Categories').then((module) => ({ default: module.Categories })));
const CategoryDetail = lazy(() => import('./pages/Categories').then((module) => ({ default: module.CategoryDetail })));
const Tags = lazy(() => import('./pages/Tags').then((module) => ({ default: module.Tags })));
const TagDetail = lazy(() => import('./pages/Tags').then((module) => ({ default: module.TagDetail })));
const Archive = lazy(() => import('./pages/Archive').then((module) => ({ default: module.Archive })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

export default function App() {
  return <Cursor forceAll><a className="skip-link" href="#main-content">跳到主要内容</a><ScrollManager /><Header /><div id="main-content"><Suspense fallback={<Loading />}><Routes><Route path="/" element={<Home />} /><Route path="/posts" element={<Posts />} /><Route path="/posts/:slug" element={<PostDetail />} /><Route path="/categories" element={<Categories />} /><Route path="/categories/:slug" element={<CategoryDetail />} /><Route path="/tags" element={<Tags />} /><Route path="/tags/:slug" element={<TagDetail />} /><Route path="/archive" element={<Archive />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></Suspense></div><SiteFooter /><BackTop visibilityHeight={500} /></Cursor>;
}
