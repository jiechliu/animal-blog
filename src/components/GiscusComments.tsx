import { Card } from 'animal-island-ui';
import { MessageCircle } from 'lucide-react';
import Giscus from '@giscus/react';

const defaultGiscusConfig = {
  repo: 'jiechliu/animal-blog',
  repoId: 'R_kgDOTm-vfw',
  category: 'General',
  categoryId: 'DIC_kwDOTm-vf84DCRp7',
} as const;

export function GiscusComments() {
  const repo = import.meta.env.VITE_GISCUS_REPO ?? defaultGiscusConfig.repo;
  const repoId = import.meta.env.VITE_GISCUS_REPO_ID ?? defaultGiscusConfig.repoId;
  const category = import.meta.env.VITE_GISCUS_CATEGORY ?? defaultGiscusConfig.category;
  const categoryId = import.meta.env.VITE_GISCUS_CATEGORY_ID ?? defaultGiscusConfig.categoryId;

  if (!repo || !repoId || !categoryId) {
    return (
      <Card type="dashed" className="giscus-empty">
        <MessageCircle size={24} />
        <div>
          <strong>评论区等待连接</strong>
          <p>在环境变量中补充 Giscus 仓库信息后，这里会自动显示 GitHub Discussions 评论。</p>
        </div>
      </Card>
    );
  }

  return (
    <Giscus
      repo={repo}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="noborder_light"
      lang="zh-CN"
      loading="lazy"
    />
  );
}
