# Design System

## Direction

Animal-Island-UI 风格的中文技术手账：羊皮纸底色、泥土棕文字、薄荷绿主操作、黄色焦点、彩色分类标识。设计是温暖的，但正文区域保持安静。

## Typography

- UI 与正文：Nunito, "Noto Sans SC", system-ui, sans-serif。
- 正文字重不低于 500，正文行长控制在 72ch 内。
- 标题通过字号和字重建立至少 1.25 的层级，不使用负字距。

## Color

- 使用 Animal-Island-UI 提供的 `--animal-*` 运行时变量。
- 页面为暖羊皮纸色，文字为棕色，不使用纯黑、纯白或冷灰背景。
- 主操作使用薄荷绿，内容分类在蓝、粉、黄、绿之间分配。
- 输入焦点使用黄色，按钮焦点使用薄荷色。

## Shape And Elevation

- 按钮和输入保持 50px 胶囊。
- 交互元素圆角至少 12px。
- 主按钮可使用组件自带 3D 阴影；卡片不增加投影。
- 标题使用组件的燕尾丝带，弹窗保留组件有机轮廓。

## Layout

- 主内容最大宽度 1180px，文章正文最大宽度 72ch。
- 首页使用非对称 Hero，内容区间距有松紧变化。
- 桌面文章页为正文加悬浮目录，移动端目录进入 Drawer。
- 不嵌套卡片；卡片只用于文章、分类和明确的工具容器。

## Motion

- 交互时长 150ms 至 350ms，使用 `cubic-bezier(0.4, 0, 0.2, 1)`。
- 只变换 opacity 与 transform，尊重 `prefers-reduced-motion`。

## Imagery

- 使用真实自然与书桌照片作为文章封面，图片清晰展示主题。
- 图片使用有意义的中文替代文本并懒加载。
