---
title: 用 Vite 搭一条轻巧的内容管线
slug: react-content-pipeline
date: 2026-07-18
updated: 2026-07-20
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85
category: 前端手札
tags: [React, Vite, Markdown]
description: 不引入庞大 CMS，使用本地 Markdown 构建类型清晰的静态博客。
draft: false
---

对个人博客来说，本地 Markdown 往往已经足够。内容与代码一起版本化，预览和部署也更容易保持一致。

## 从 glob 开始

Vite 可以在构建阶段收集内容文件：

```ts
const modules = import.meta.glob('/content/posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});
```

## 解析元数据

frontmatter 应交给 YAML 解析器处理，日期、数组和布尔值都能获得可靠的结构。再把正文与元数据组合成统一的 `Post` 类型。

### 派生而不是复制

分类数量、标签云和贡献图都应该从文章集合派生。这样新增文章时，不需要手工维护另一份统计文件。

## 构建边界

静态内容不意味着功能简单。搜索、筛选、目录和相关推荐都可以在浏览器内完成，而且部署产物仍然只是静态文件。
