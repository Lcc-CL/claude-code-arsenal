---
layer: global
title: 行为准则层
tabLabel: "① 全局 ~/.claude/CLAUDE.md"
scopeLabel: SCOPE·全部项目
termTitle: "~/.claude/CLAUDE.md"
savePath: '<span class="mono">~/.claude/CLAUDE.md</span>'
loadTiming: 每个会话启动即加载,对本机所有项目生效
put:
  - '跨项目稳定不变的<b>行为规则</b>:沟通语言、破坏性操作确认、工程纪律、环境事实(时区/默认包管理器)'
avoid:
  - '<span class="dont">任何具体项目的信息</span>——那是项目层的事;也别写人格设定,写不改变行为的话等于浪费注意力'
order: 1
---
# 全局工作准则(适用于本机所有项目)

## 沟通
- 用中文与我交流;代码、命令、报错信息保持英文原样
- 先给结论再给理由;不确定就直说,不要编造 API 或配置项

## 行为边界
- 删除文件、git push --force、数据库迁移、改 CI 配置等
  破坏性/高影响操作:先说明影响范围,征得我确认再执行
- 永远不要把密钥、token、密码写进代码或提交历史;
  发现 .env / 凭据有泄露风险时主动提醒我
- 不要擅自升级依赖的大版本

## 工程纪律
- 改动最小化:只做被要求的事,不顺手重构、不加多余抽象
- 修完 bug 先运行相关测试再收工
- commit message 用 Conventional Commits(feat/fix/chore/docs…)
- 同一任务连续失败两次时,停下来复述你对问题的理解再继续

## 我的环境
- 时区 Asia/Shanghai;macOS + zsh;Node ≥ 20;包管理器默认 pnpm
