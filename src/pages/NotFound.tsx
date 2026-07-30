import { Button, Title } from 'animal-island-ui';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';

export function NotFound() {
  const navigate = useNavigate();
  return <main className="not-found page-shell"><Seo title="页面未找到" description="这条小路暂时还没有开放。" /><span className="not-found-code">404</span><Title size="large" color="app-yellow">这里还没有修好小路</Title><p>你要找的页面可能搬家了，先回到广场看看吧。</p><Button type="primary" size="large" onClick={() => navigate('/')}>返回首页</Button></main>;
}
