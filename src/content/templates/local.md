---
layer: local
title: 个人偏好层
tabLabel: "④ 个人 CLAUDE.local.md"
scopeLabel: SCOPE·只有你
termTitle: "./CLAUDE.local.md(记得 gitignore)"
savePath: '仓库根目录 <span class="mono">./CLAUDE.local.md</span>,并加入 <span class="mono">.gitignore</span>'
loadTiming: 启动即加载,但不随仓库共享——团队规则与个人口味互不污染
put:
  - 个人环境与偏好:本地服务地址、测试账号指引、你个人的沟通习惯
avoid:
  - '<span class="dont">真实密钥与密码</span>——写「去哪取」而不是写值本身;gitignore 不等于安全'
order: 4
---
# 个人偏好(已 gitignore,不与团队共享)

- 本地数据库:postgresql://localhost:5433/myapp_dev
- 本地服务:web 3000 / api 4000 / mail 预览 8025
- 演示账号:demo@local(密码在团队 1Password「MyApp Dev」)
- 向我解释用中文,commit message 保持英文
- 我用 macOS + zsh,不要给我 Windows 路径或 PowerShell 命令
