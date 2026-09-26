# 部署(平台无关)

本站是纯静态站:`pnpm build` 产出 `dist/`,任何能托管静态文件的地方都能部署。
唯一的部署参数是构建期变量 `SITE_URL`(站点正式地址,canonical / og / hreflang
以它为基准);不设置时这些标签退化为相对地址,站点照常可用。切换平台只需在
新平台上设置同一个 `SITE_URL`。

## 方式一:任意 Linux 服务器(Docker,推荐)

前置条件:Docker Engine 24+ 与 Compose v2。镜像分两阶段:Node 22 + pnpm 构建,
Nginx(`deploy/nginx.conf`)托管,带 `/healthz` 健康检查。

首次部署:

```bash
git clone https://github.com/Lcc-CL/claude-code-arsenal.git
cd claude-code-arsenal
cp .env.production.example .env.production   # 填写 SITE_URL
./scripts/deploy.sh
```

`scripts/deploy.sh` 依次执行:拉取目标版本 → 构建镜像 → 启动 → 等待健康检查
通过,失败时输出最近日志并以非零退出码结束。

```bash
./scripts/deploy.sh                              # 部署 origin/main 最新提交
DEPLOY_REF=<tag 或 commit> ./scripts/deploy.sh   # 部署指定版本(回滚)
SKIP_PULL=1 ./scripts/deploy.sh                  # 按当前工作区部署
```

HTTPS:在同机放反向代理终止 TLS,并在 `.env.production` 设 `WEB_BIND=127.0.0.1`。
Caddy 示例:

```
arsenal.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

不想用 Docker 时,也可以直接 `SITE_URL=https://arsenal.example.com pnpm build`,
把 `dist/` 交给现有的 Nginx(配置参考 `deploy/nginx.conf`,把 `root` 改成 `dist`
所在目录)。

## 方式二:GitHub Actions 自动部署

`.github/workflows/deploy.yml` 在每次推送 `main`(或手动触发)时通过 SSH 登录
服务器,执行 `DEPLOY_REF=<本次提交> ./scripts/deploy.sh`。未配置时整个 job 自动
跳过。先按方式一完成首次部署,再在仓库 Settings → Secrets and variables →
Actions 中添加:

| 类型 | 名称 | 内容 |
|---|---|---|
| Variable | `DEPLOY_HOST` | 服务器地址(设置后即启用自动部署) |
| Variable | `DEPLOY_USER` | SSH 用户(需能执行 docker) |
| Variable | `DEPLOY_PATH` | 服务器上仓库目录的绝对路径 |
| Variable | `DEPLOY_PORT` | SSH 端口,可选,默认 22 |
| Secret | `DEPLOY_SSH_KEY` | 该用户的 SSH 私钥(建议专用密钥) |
| Secret | `DEPLOY_KNOWN_HOSTS` | `ssh-keyscan -p <端口> <服务器>` 的输出,用于校验主机指纹 |

要暂停自动部署,删除 `DEPLOY_HOST` 变量即可。

## 方式三:任意静态托管 / 容器平台

- **静态托管**(Cloudflare Pages、Vercel、Netlify、EdgeOne、对象存储等):
  构建命令 `pnpm build`,输出目录 `dist`,Node 22,环境变量 `SITE_URL`。
- **容器平台**:使用仓库根目录的 `Dockerfile`,构建参数 `SITE_URL`,容器端口 `80`,
  健康检查路径 `/healthz`。

## 上线检查

- 首页、`/about/`、`/en/` 均返回 200;不存在的路径返回站内 404 页。
- 首页源码中 `<link rel="canonical">` 指向 `SITE_URL`。
- 暗色 / 浅色主题各看一遍。
