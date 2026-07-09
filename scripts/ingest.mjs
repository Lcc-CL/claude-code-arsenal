// ingest.mjs · 收录入库三模式
//   手动:  node scripts/ingest.mjs add --name pdf-tools --category dev --summary "…" --usage "…" \
//            --command "npx skills add owner/repo/pdf-tools" --source https://github.com/owner/repo [--origin community] [--tags a,b]
//   批量:  node scripts/ingest.mjs batch data/candidates.json   (数组,字段同 add;已存在的自动跳过)
//   推荐:  node scripts/ingest.mjs scout [--top 30]             (爬 skills.sh 榜单,产出 scout-report.md + data/candidates.json)
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SKILLS_DIR = 'src/content/skills';
const today = new Date().toISOString().slice(0, 10);

/* ── 现有收录索引 ── */
function loadExisting() {
  const names = new Set();
  let maxOrder = 0;
  for (const f of readdirSync(SKILLS_DIR).filter(f => f.endsWith('.yaml'))) {
    const src = readFileSync(join(SKILLS_DIR, f), 'utf8');
    const name = src.match(/^name:\s*(.+)$/m)?.[1]?.trim();
    if (name) names.add(name);
    const order = Number(src.match(/^order:\s*(\d+)/m)?.[1] ?? 0);
    if (order > maxOrder) maxOrder = order;
  }
  return { names, maxOrder };
}

/* ── 单条写入(JSON.stringify 产出合法 YAML 双引号标量) ── */
const q = (s) => JSON.stringify(String(s));

function writeSkill(entry, order) {
  const required = ['name', 'category', 'summary', 'usageExample', 'command', 'sourceUrl'];
  const missing = required.filter(k => !entry[k]);
  if (missing.length) throw new Error(`${entry.name ?? '<unnamed>'}: 缺字段 ${missing.join(', ')}`);
  if (!['doc', 'dev', 'art', 'team'].includes(entry.category)) throw new Error(`${entry.name}: category 必须是 doc|dev|art|team`);

  const slug = entry.slug ?? entry.name;
  const method = entry.method ?? (entry.command.startsWith('npx') ? 'npx' : entry.command.startsWith('/plugin') ? 'plugin' : 'manual');
  const tags = Array.isArray(entry.tags) ? entry.tags : String(entry.tags ?? '').split(',').filter(Boolean);
  const lines = [
    `name: ${entry.name}`,
    `slug: ${slug}`,
    `origin: ${entry.origin ?? 'community'}`,
    `category: ${entry.category}`,
    `summary: ${q(entry.summary)}`,
    `usageExample: ${q(entry.usageExample)}`,
    ...(entry.summaryEn ? [`summaryEn: ${q(entry.summaryEn)}`] : []),
    ...(entry.usageExampleEn ? [`usageExampleEn: ${q(entry.usageExampleEn)}`] : []),
    'install:',
    `  method: ${method}`,
    `  command: ${entry.command}`,
    `sourceUrl: ${entry.sourceUrl}`,
    `tags: [${tags.join(', ')}]`,
    `featured: ${entry.featured ?? false}`,
    `order: ${order}`,
    `addedAt: ${today}`,
    `lastVerified: ${today}`,
  ];
  writeFileSync(join(SKILLS_DIR, `${slug}.yaml`), lines.join('\n') + '\n');
  console.log(`✓ 入库 ${slug}.yaml (order ${order})`);
}

/* ── 模式:add ── */
function cmdAdd(args) {
  const entry = {};
  for (let i = 0; i < args.length; i += 2) {
    if (!args[i].startsWith('--')) throw new Error(`未知参数 ${args[i]}`);
    entry[{ usage: 'usageExample', usageEn: 'usageExampleEn', source: 'sourceUrl', summaryEn: 'summaryEn' }[args[i].slice(2)] ?? args[i].slice(2)] = args[i + 1];
  }
  const { names, maxOrder } = loadExisting();
  if (names.has(entry.name)) { console.log(`已存在,跳过:${entry.name}`); return; }
  writeSkill(entry, maxOrder + 1);
  console.log('记得跑 pnpm build 校验 schema,并在 CHANGELOG.md 记一笔。');
}

/* ── 模式:batch ── */
function cmdBatch(file) {
  const entries = JSON.parse(readFileSync(file, 'utf8'));
  if (!Array.isArray(entries)) throw new Error('batch 文件必须是 JSON 数组');
  const { names, maxOrder } = loadExisting();
  let order = maxOrder;
  let added = 0;
  for (const e of entries) {
    if (e.skip) { console.log(`· 标记跳过:${e.name}`); continue; }
    if (names.has(e.name)) { console.log(`· 已存在:${e.name}`); continue; }
    writeSkill(e, ++order);
    added++;
  }
  console.log(`批量完成:新增 ${added} 条。记得 pnpm build 校验 + 更新 CHANGELOG.md。`);
}

/* ── 模式:scout(skills.sh 榜单) ── */
async function cmdScout(top = 30) {
  const res = await fetch('https://skills.sh', { headers: { 'user-agent': 'Mozilla/5.0 (arsenal-scout)' } });
  if (!res.ok) throw new Error(`skills.sh HTTP ${res.status}`);
  const html = await res.text();

  const seen = new Set();
  const board = [];
  for (const m of html.matchAll(/href="\/([\w.-]+)\/([\w.-]+)\/([\w-]+)"/g)) {
    const [, owner, repo, skill] = m;
    if (owner.startsWith('_') || owner === 'api') continue;
    const key = `${owner}/${repo}/${skill}`;
    if (seen.has(key)) continue;
    seen.add(key);
    board.push({ rank: board.length + 1, owner, repo, skill });
    if (board.length >= top) break;
  }
  if (board.length === 0) throw new Error('解析到 0 条——skills.sh 页面结构可能变了,需要更新解析器');

  const { names } = loadExisting();
  const fresh = board.filter(b => !names.has(b.skill));

  const candidates = fresh.map(b => ({
    skip: false,
    name: b.skill,
    category: 'dev',
    summary: 'TODO:50 字内中文摘要(核实后填写)',
    usageExample: 'TODO:试试对 Claude 说……',
    summaryEn: 'TODO: one-line English summary',
    usageExampleEn: 'TODO: Try telling Claude …',
    command: `npx skills add ${b.owner}/${b.repo}/${b.skill}`,
    // owner 为 site 时 repo 是域名(如 open.feishu.cn),不是 GitHub 仓库
    sourceUrl: b.owner === 'site' ? `https://${b.repo}` : `https://github.com/${b.owner}/${b.repo}`,
    tags: [],
  }));
  if (!existsSync('data')) mkdirSync('data');
  writeFileSync('data/candidates.json', JSON.stringify(candidates, null, 2) + '\n');

  const rows = board.map(b =>
    `| ${b.rank} | \`${b.skill}\` | [${b.owner}/${b.repo}](https://github.com/${b.owner}/${b.repo}) | ${names.has(b.skill) ? '✅ 已收录' : '🆕 候选'} |`);
  const report = [
    `# 🛰 skills.sh 榜单周报 · ${today}`,
    '',
    `榜单前 ${board.length} 名中,**${fresh.length} 条未收录**。已生成预填的 \`data/candidates.json\`。`,
    '',
    '| # | Skill | 仓库 | 状态 |',
    '|---|-------|------|------|',
    ...rows,
    '',
    '## 推荐入库流程',
    '1. 打开 `data/candidates.json`,不要的条目把 `skip` 改成 `true`',
    '2. 要收录的条目补齐 `summary` / `usageExample`(以及英文字段),核实 `sourceUrl`',
    '3. 跑 `pnpm ingest batch data/candidates.json`,再 `pnpm build` 过 schema 校验',
    '4. CHANGELOG.md 记一笔,提交 PR',
  ].join('\n');
  writeFileSync('scout-report.md', report + '\n');
  console.log(report);
}

/* ── 入口 ── */
const [mode, ...rest] = process.argv.slice(2);
try {
  if (mode === 'add') cmdAdd(rest);
  else if (mode === 'batch') cmdBatch(rest[0] ?? 'data/candidates.json');
  else if (mode === 'scout') await cmdScout(Number(rest[rest.indexOf('--top') + 1]) || 30);
  else {
    console.log('用法: node scripts/ingest.mjs <add|batch|scout> …(详见文件头注释)');
    process.exit(mode ? 1 : 0);
  }
} catch (e) {
  console.error('✗', e.message);
  process.exit(1);
}
