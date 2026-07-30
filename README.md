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

## 个性化

- 在 `src/data/profile.json` 替换昵称、头像与社交链接。
- 在 `src/data/categories.json` 调整分类定义。
- 将 `public/robots.txt` 中的 `example.com` 替换为正式域名。
- 将 `.env.example` 复制为 `.env.local` 并填写 Giscus 仓库信息。

生产构建时可通过 `SITE_URL=https://your-domain.com npm run build` 自动为全部文章生成 RSS 和 Sitemap；未设置时使用 `https://example.com`。

## 部署

项目可直接部署到 Vercel，构建命令为 `npm run build`，输出目录为 `dist`。`vercel.json` 已包含 React Router 的单页回退规则。

Animal-Island-UI 使用 CC BY-NC 4.0，仅适用于非商业用途；商业部署前请确认许可要求。
