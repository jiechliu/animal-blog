---
title: 柔和动效的三个判断
slug: css-motion-notes
date: 2026-06-30
updated: 2026-07-02
cover: https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=85
category: 前端手札
tags: [CSS, 动效, 可访问性]
description: 动效不必抢镜，它应当解释变化、确认操作，并尊重用户偏好。
draft: false
---

动效最有价值的时刻，是界面状态发生变化而用户需要建立前后关系时。

## 它解释了什么

抽屉从侧边进入，告诉用户内容来自哪里；列表项淡出，说明它已经离开当前集合。

## 它持续多久

直接操作通常适合 150 至 250 毫秒。大面积场景转换可以稍长，但不应让用户等待动画结束才能继续。

## 它能否被关闭

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
  }
}
```

减弱动态不是删掉所有反馈，而是用淡入、颜色或即时切换替代明显位移。
