# syntax=docker/dockerfile:1
# Platform-neutral image: build the static site, serve it with Nginx.
#   docker build --build-arg SITE_URL=https://example.com -t arsenal .

# ---------- build ----------
FROM node:22-slim AS build
WORKDIR /app
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# Public origin for canonical / og / hreflang; empty = relative URLs.
ARG SITE_URL=
ENV SITE_URL=${SITE_URL}
RUN pnpm build

# ---------- serve ----------
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
