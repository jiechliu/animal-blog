import { Button, Collapse, Tag, Title } from 'animal-island-ui';
import { Github, Mail } from 'lucide-react';
import profile from '../data/profile.json';
import { Seo } from '../components/Seo';

const skills = ['React', 'TypeScript', 'CSS', 'Node.js', '设计系统', '内容设计', '可访问性'];

export function About() {
  return <main className="page-shell inner-page about-page"><Seo title="关于我" description="认识岛屿手记背后的作者。" /><div className="page-intro"><Title size="large" color="app-yellow">关于岛民</Title></div><section className="about-profile"><img src={profile.avatar} alt={`${profile.name}的头像`} /><div><span className="eyebrow">RESIDENT PROFILE</span><h1>{profile.name}</h1><strong>{profile.bio}</strong><p>{profile.intro} 我喜欢把复杂的东西讲清楚，也相信稳定的小步最终会留下很长的路。</p><div className="about-actions"><Button type="link" icon={<Github size={18} />} onClick={() => window.open(profile.social.github, '_blank')}>GitHub</Button><Button type="link" icon={<Mail size={18} />} onClick={() => { window.location.href = profile.social.email; }}>Email</Button></div></div></section><section className="about-section"><Title color="app-teal">常用工具</Title><div className="skill-cloud">{skills.map((skill, index) => <Tag key={skill} color={(['app-teal', 'app-blue', 'app-pink', 'app-yellow'][index % 4] as 'app-teal')}>{skill}</Tag>)}</div></section><section className="about-section"><Title color="app-pink">沿途经历</Title><div className="timeline"><div><time>2024 至今</time><h3>认真做产品，也认真写下来</h3><p>关注前端体验、设计系统与工程质量，让界面更清楚也更有人情味。</p></div><div><time>2021 至 2024</time><h3>从实现页面到理解问题</h3><p>在真实业务里学习协作、取舍，以及如何把复杂需求拆成可靠的小步。</p></div></div></section><section className="about-section faq-section"><Title color="app-blue">常见问题</Title><Collapse question="这个博客用什么搭建？" answer="React、Vite、本地 Markdown 和 Animal-Island-UI。内容与代码一起维护，构建后是纯静态站点。" defaultExpanded /><Collapse question="可以转载文章吗？" answer="可以引用并附上原文链接；完整转载或商业使用请先通过邮件联系。" /><Collapse question="为什么叫岛屿手记？" answer="写作像维护一座小岛，不急着扩张，只把每条路和每棵树照顾好。" /></section></main>;
}
