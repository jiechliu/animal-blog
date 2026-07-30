# 个人博客 - 产品功能列表（PRD v2）

> 技术栈已确认：**React + Vite + Animal-Island-UI + Giscus**
> 风格已确认：动森 / 羊皮纸 / 圆润 / 柔和

---

## 一、技术栈

| 维度 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | **React 18 + Vite 5** | 轻量、快、Animal-Island-UI 是 React 组件库 |
| 路由 | **React Router v6** | 静态路由即可（/、/posts、/categories、/about…） |
| UI 库 | **animal-island-ui** | 动森风组件库，提供 Button/Card/Tag/Title/Tabs/Modal/Drawer 等 |
| 样式 | **Tailwind CSS + 库自带样式** | 主要用 Tailwind 布局，组件用 Animal-Island-UI |
| 内容 | **Markdown + frontmatter** | 本地 `content/posts/**/*.md` 管理 |
| Markdown 渲染 | **react-markdown + remark-gfm + rehype-highlight** | 支持表格、代码高亮 |
| 目录生成 | **rehype-slug + 自定义 TOC 提取** | 文章右侧悬浮目录 |
| 评论 | **Giscus** | 基于 GitHub Discussions |
| 图标补充 | **lucide-react** | Animal-Island-UI 只有 10 个内置图标，站外用 lucide 补充 |
| 部署 | **CloudStudio / Vercel** | 任选，构建产物为纯静态 |

---

## 二、Animal-Island-UI 组件在本项目中的使用映射

| 模块 | 使用组件 | 用途 |
| --- | --- | --- |
| 全局 | `Cursor` | 全站游戏风手指光标 |
| 全局 | `Footer` (sea/tree) | 页脚装饰 |
| 全局 | `BackTop` | 返回顶部（动森钱袋图标） |
| 全局 | `Loading` | 全局加载占位 |
| 全局 | `Notification` | 操作提示（复制成功等） |
| 全局 | `Drawer` | 移动端侧边菜单 |
| 导航 | `Button` / `Tag` | 导航按钮、当前页标签 |
| 首页 | `Card` / `Title` | Hero 卡片、区块标题丝带 |
| 首页 | `Tag` | 统计数字胶囊 |
| 文章卡片 | `Card` hoverable | 文章列表卡片 |
| 文章卡片 | `Tag` | 分类、标签 |
| 文章详情 | `Title` | 章节小标题（装饰性） |
| 文章详情 | `Tabs` | 相关文章/评论切换（可选） |
| 文章详情 | `Collapse` | FAQ / 折叠说明 |
| 搜索 | `Input` | 全局搜索框 |
| 筛选 | `Select` / `Checkbox` / `Radio` | 分类、标签、年份筛选 |
| 关于页 | `Card` / `Title` / `Collapse` | 技能卡片、FAQ |

> 注：Animal-Island-UI 不暴露 CSS 变量，需要硬编码其羊皮纸色板做补充样式。

---

## 三、色彩与 Token（基于 Animal-Island-UI）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--animal-bg` | `#f8f8f0` | 页面背景（羊皮纸色） |
| `--animal-card` | `rgb(247,243,223)` | 卡片背景 |
| `--animal-text` | `#725d42` | 主文字（棕色） |
| `--animal-blue` | `#889df0` | 主强调色 / 链接 |
| `--animal-pink` | `#f8a6b2` | 副强调色 |
| `--animal-teal` | `#82d5bb` | 成功 / 标签 |
| `--animal-yellow` | `#f7cd67` | 高亮 |
| `--animal-green` | `#8ac68a` | 贡献图中低活跃度 |
| `--animal-brown` | `#9a835a` | 装饰 |
| `--animal-border` | `#e8dcc8` | 边框 / 分隔线 |

> 贡献图颜色方案（基于 GitHub 风格，但适配动森柔和色板）：
> - 0 次：`#e8dcc8`（浅羊皮纸）
> - 1-2 次：`#82d5bb`（teal 浅）
> - 3-5 次：`#8ac68a`（green）
> - 6-9 次：`#f7cd67`（yellow）
> - 10+ 次：`#889df0`（blue）

---

## 四、模块总览

| 编号 | 模块 | 路由 | 优先级 |
| --- | --- | --- | --- |
| M1 | 首页 | `/` | P0 |
| M2 | 文章列表 | `/posts` | P0 |
| M3 | 分类 | `/categories` + `/categories/:slug` | P0 |
| M4 | 文章详情 | `/posts/:slug` | P0 |
| M5 | 标签 | `/tags` + `/tags/:slug` | P1 |
| M6 | 归档 | `/archive` | P1 |
| M7 | 关于 | `/about` | P1 |
| M8 | 全局能力 | — | P0 |

---

## 五、模块详细说明

### M1. 首页 `/`（P0）

1. **Hero 区**
   - 个人头像（圆形，带柔和阴影）
   - 昵称 + 签名
   - 简短介绍
   - 社交链接（GitHub / Twitter / 邮箱）用 `Button type="link"`
   - 两个主按钮：「开始阅读」「关于我」用 `Button type="primary"`

2. **年度贡献图（Contribution Graph）** ⭐ 核心
   - 全年 52 周 × 7 天网格
   - 鼠标 hover Tooltip 显示日期 + 当日产出量
   - 颜色梯度 5 级（基于上面 token）
   - 标题：`2025–2026 年度贡献`
   - 图例 Less → More
   - 数据来源：读取 `content/posts/**/*.md` 的 `date` 字段

3. **最新文章**
   - 最近 6 篇文章卡片（`Card hoverable`）
   - 每张卡片：封面、标题、摘要、日期、分类 Tag、阅读时长

4. **统计胶囊**
   - 用 `Tag` 大号展示：文章数、分类数、总字数、持续天数

5. **精选分类**
   - 横向 3-5 个分类卡片（`Card color="app-blue"` 等）
   - 名称、描述、文章数

6. **页脚装饰**
   - `<Footer type="sea" />`

---

### M2. 文章列表 `/posts`（P0）

1. **顶部筛选区（放在 Card 内）**
   - `Input` 搜索框（带 search icon）
   - `Select` 分类筛选
   - `Select` 年份筛选
   - `Select` 排序方式

2. **文章卡片网格**
   - `Card hoverable`
   - 封面图、标题、摘要、元信息行、分类 Tag

3. **分页**
   - 每页 10 条
   - 用 `Button` 实现「上一页 / 下一页」

4. **空状态**
   - `Card type="dashed"` 内展示提示

---

### M3. 分类 `/categories` + `/categories/:slug`（P0）

**列表页 `/categories`：**
- 分类卡片网格（不同分类用不同 `Card color`）
- 名称、描述、文章数

**详情页 `/categories/:slug`：**
- 顶部 `Title` 展示分类名
- 该分类下的文章列表（复用文章卡片）

---

### M4. 文章详情 `/posts/:slug`（P0） ⭐ 核心

1. **文章头**
   - 标题（H1，原生样式）
   - 元信息：日期 · 分类 Tag · 标签 Tags · 阅读时长
   - 封面图

2. **文章目录（TOC）** ⭐
   - 桌面端：右侧悬浮小卡片
   - 移动端：顶部 `Button` 展开 `Drawer`
   - 从 H2/H3 生成
   - 当前位置高亮
   - 点击平滑滚动

3. **正文**
   - `react-markdown` 渲染
   - 代码高亮（`rehype-highlight`）
   - 图片懒加载 + 点击放大
   - 引用块、列表、表格样式适配羊皮纸主题
   - 链接处理：站内相对、外链新窗口

4. **阅读体验增强**
   - 顶部阅读进度条
   - 上一篇 / 下一篇导航卡片
   - 分享按钮（复制链接）

5. **GitHub 评论（Giscus）** ⭐
   - 集成在文章底部
   - 需要 GitHub 仓库 + Discussions 开启

6. **相关文章**
   - 同分类 / 同标签推荐 3 篇

---

### M5. 标签 `/tags` + `/tags/:slug`（P1）

- `/tags`：标签云，用不同颜色 `Tag`
- `/tags/:slug`：该标签下文章列表

---

### M6. 归档 `/archive`（P1）

- 时间轴按年份分组
- 每个月下列出文章
- 右侧迷你热力图

---

### M7. 关于 `/about`（P1）

- `Card` 个人介绍
- `Title` 小标题
- 技能标签云 `Tag`
- 工作经历时间轴（自定义 CSS）
- 联系方式 `Button type="link"`

---

### M8. 全局能力（P0）

| 能力 | 实现 |
| --- | --- |
| 顶部导航 | 固定导航栏，含 Logo、菜单、`Input` 搜索（快捷键 ⌘K）、移动端 `Drawer` |
| 主题切换 | Animal-Island-UI 不内置暗色主题，默认只提供羊皮纸亮色一套主题 |
| 响应式 | 移动 / 平板 / 桌面适配 |
| 搜索面板 | `Modal` 内嵌 `Input`，全文搜索标题/摘要/标签 |
| SEO | 每页 `react-helmet-async` 设置 title/description/og |
| RSS | `/rss.xml`（构建时生成） |
| Sitemap | `/sitemap.xml` |
| 404 页 | `Title` + `Button` 返回首页 |
| 返回顶部 | `BackTop` |
| 加载 | `Loading` / `Skeleton` |

---

## 六、目录结构

```
blog/
├── content/
│   └── posts/                # Markdown 文章
├── public/
│   └── images/               # 封面图、头像
├── src/
│   ├── components/           # 复用组件
│   │   ├── ContributionGraph.tsx
│   │   ├── PostCard.tsx
│   │   ├── PostList.tsx
│   │   ├── Toc.tsx
│   │   ├── TocDrawer.tsx
│   │   ├── GiscusComments.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchModal.tsx
│   │   └── ReadingProgress.tsx
│   ├── data/
│   │   ├── profile.json      # 个人信息
│   │   ├── categories.json   # 分类定义
│   │   └── posts.ts          # 文章加载工具
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Posts.tsx
│   │   ├── Categories.tsx
│   │   ├── CategoryDetail.tsx
│   │   ├── PostDetail.tsx
│   │   ├── Tags.tsx
│   │   ├── TagDetail.tsx
│   │   ├── Archive.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 七、数据 schema

### 文章 frontmatter

```yaml
---
title: "文章标题"
slug: "my-post"
date: 2026-07-29
updated: 2026-07-30
cover: "/images/cover.png"
category: "技术"
tags: ["前端", "Animal-Island-UI"]
description: "摘要"
draft: false
---
```

### 分类定义 `src/data/categories.json`

```json
[
  {
    "slug": "tech",
    "name": "技术",
    "description": "前端、后端、工程化",
    "color": "app-blue"
  }
]
```

### 个人信息 `src/data/profile.json`

```json
{
  "name": "你的名字",
  "avatar": "/images/avatar.png",
  "bio": "一句话签名",
  "intro": "简短介绍",
  "social": {
    "github": "https://github.com/xxx",
    "twitter": "https://twitter.com/xxx",
    "email": "mailto:xxx@example.com"
  }
}
```

---

## 八、Giscus 配置需求

Giscus 需要以下信息：

1. GitHub 仓库名（例如：`yourname/your-blog`）
2. Discussions 分类名（例如：`Announcements` / `General`）
3. 仓库已开启 Discussions 功能

我将在 `src/components/GiscusComments.tsx` 中封装配置，只需你把仓库信息告诉我。

---

## 九、实施计划

按以下顺序交付：

1. **项目初始化**：Vite + React + TypeScript + Tailwind + Animal-Island-UI
2. **基础架构**：路由、布局、Header、Footer、404
3. **文章数据层**：Markdown 加载、frontmatter 解析、分类/标签聚合
4. **首页**：Hero + 贡献图 + 最新文章 + 统计
5. **文章列表**：搜索 + 筛选 + 分页
6. **分类模块**：分类列表 + 分类详情
7. **文章详情**：正文渲染 + TOC + Giscus + 上下篇
8. **扩展模块**：标签、归档、关于
9. **全局能力**：搜索面板、RSS、SEO、部署

---

## 十、需要你确认 / 提供的信息

1. **Giscus 仓库信息**：你的 GitHub 用户名/仓库名，以及 Discussions 分类名（用于评论）
2. **个人信息**：昵称、签名、头像路径、GitHub/Twitter/邮箱链接
3. **示例文章**：我先帮你写 2-3 篇示例 Markdown 文章可以吗？
4. **部署目标**：CloudStudio（推荐，方便预览）还是 Vercel？
5. **是否支持暗色主题**：Animal-Island-UI 是羊皮纸固定风格，切换暗色需要自定义；默认不做，是否需要？

---

> 确认后我会开始第一步：项目初始化。你可以直接回复「开干」+ Giscus 仓库信息。
