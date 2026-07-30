---
title: 小产品也值得认真测试
slug: testing-small-products
date: 2026-05-22
updated: 2026-05-23
cover: https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1400&q=85
category: 工程拾贝
tags: [测试, 工程化, Playwright]
description: 用少量高价值检查，守住个人项目最容易被忽略的质量底线。
draft: false
---

个人项目没有专职测试，但这并不意味着只能凭感觉发布。关键是把检查放在风险最高的位置。

## 先保证主路径

首页能否进入文章，筛选是否正确，文章锚点是否可达，这些路径比每个组件的快照更重要。

## 再检查边界

- 空搜索结果
- 不存在的文章地址
- 375px 宽度下的导航
- 键盘打开和关闭搜索

## 最后看真实画面

自动截图能发现很多 DOM 断言看不到的问题，例如文字溢出、悬浮目录遮挡正文，以及图片加载后的布局跳动。
