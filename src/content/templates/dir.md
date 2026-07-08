---
layer: dir
title: 局部规则层
tabLabel: "③ 目录级 src/CLAUDE.md"
scopeLabel: SCOPE·单个目录
termTitle: "src/components/CLAUDE.md"
savePath: '任意子目录,如 <span class="mono">src/components/CLAUDE.md</span>'
loadTiming: '<b>懒加载</b>——Claude 读到该目录下文件时才注入,兄弟目录互不可见,天然节省上下文'
put:
  - 只对这一块代码成立的规则:组件规范、该模块专属的测试方式、monorepo 中各包差异化的构建命令
avoid:
  - '<span class="dont">全仓库通用的约定</span>——放上层会被重复加载稀释;若规则被无视,先跑 <span class="mono">/memory</span> 确认它是否尚未加载'
order: 3
---
# components/ 目录规则(仅在本目录内工作时生效)

- 每个组件独立文件夹:index.tsx + types.ts + *.test.tsx
- 基础控件只从 @/components/ui 取用,禁止引入新组件库
- 状态优先局部 useState;跨组件共享走 zustand(见 @/stores)
- 服务端数据一律经由 hooks/ 内的 query hook,组件内不 fetch
- 新组件必须补同目录 *.stories.tsx(Storybook)
- 可访问性:交互元素必须有可见焦点态与 aria 标签
