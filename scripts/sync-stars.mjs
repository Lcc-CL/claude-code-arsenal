// 周更资源星数:仅改 src/content/resources/*.yaml 的 stars 与 lastVerified,不动其他字段
// 404 / 限流的条目跳过并记录,供 PR 描述引用
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/resources';
const token = process.env.GITHUB_TOKEN;
const today = new Date().toISOString().slice(0, 10);
const skipped = [];

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));

for (const file of readdirSync(DIR).filter(f => f.endsWith('.yaml'))) {
  const path = join(DIR, file);
  const src = readFileSync(path, 'utf8');
  const url = src.match(/^url:\s*(\S+)/m)?.[1];
  const repo = url?.match(/github\.com\/([\w.-]+\/[\w.-]+)/)?.[1];
  if (!repo) continue;

  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    skipped.push(`${repo}(HTTP ${res.status})`);
    continue;
  }
  const stars = fmt((await res.json()).stargazers_count);

  let out = src.match(/^stars:/m)
    ? src.replace(/^stars:.*$/m, `stars: ${stars}`)
    : src.replace(/^(badge:.*)$/m, `$1\nstars: ${stars}`);
  out = out.match(/^lastVerified:/m)
    ? out.replace(/^lastVerified:.*$/m, `lastVerified: ${today}`)
    : `${out.trimEnd()}\nlastVerified: ${today}\n`;

  if (out !== src) {
    writeFileSync(path, out);
    console.log(`updated ${file}: ★ ${stars}`);
  }
}

if (skipped.length) console.log(`skipped: ${skipped.join(', ')}`);
