# 岛屿手记

基于 React 18、Vite 5、Markdown 与 Animal-Island-UI 的静态个人博客。

## 本地运行

```bash
npm install
npm run dev
```

生产检查：

```bash
npm run lint
npm run typecheck
npm run build
```

## 添加文章

在 `content/posts/` 新建 Markdown 文件，并按现有文章填写 frontmatter。首页统计、贡献图、分类、标签和归档都会自动从文章元数据派生。

根目录 `posts/` 中的旧格式文章可通过以下命令重新导入：

```bash
node scripts/import-posts.mjs
```

导入会补齐当前博客需要的元数据，并将旧分类映射到现有分类；源文件不会被删除。

## 评论区

文章详情页已经接入 Giscus 评论。启用前需要在 GitHub 仓库中打开 Discussions，并安装 Giscus GitHub App：

1. 打开仓库 `Settings > Features`，勾选 `Discussions`。
2. 打开 [giscus.app](https://giscus.app/zh-CN)，填写仓库 `jiechliu/animal-blog`，选择 `Discussion title contains page pathname` 和 `General` 分类。
3. 按页面提示安装 [Giscus GitHub App](https://github.com/apps/giscus)，授权到 `jiechliu/animal-blog`。
4. 将生成的参数填入本地 `.env.local`，并在 Vercel 环境变量中填写同样的值：

```env
VITE_GISCUS_REPO=jiechliu/animal-blog
VITE_GISCUS_REPO_ID=
VITE_GISCUS_CATEGORY=General
VITE_GISCUS_CATEGORY_ID=
```

未配置这些变量时，文章页会显示“评论区等待连接”的占位提示。

## 个性化

- 在 `src/data/profile.json` 替换昵称、头像与社交链接。
- 在 `src/data/categories.json` 调整分类定义。
- 将 `public/robots.txt` 中的 `example.com` 替换为正式域名。

生产构建时可通过 `SITE_URL=https://your-domain.com npm run build` 自动为全部文章生成 RSS 和 Sitemap；未设置时使用 `https://example.com`。

## 部署

项目可直接部署到 Vercel，构建命令为 `npm run build`，输出目录为 `dist`。`vercel.json` 已包含 React Router 的单页回退规则。

Animal-Island-UI 使用 CC BY-NC 4.0，仅适用于非商业用途；商业部署前请确认许可要求。
