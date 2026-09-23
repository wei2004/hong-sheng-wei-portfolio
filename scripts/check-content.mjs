import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = process.cwd()
const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'))
const names = fs.readdirSync('content/projects').filter(f => f.endsWith('.json'))
const projects = names.map(f => JSON.parse(fs.readFileSync(`content/projects/${f}`, 'utf8')))
const assets = new Set()
function walk(value, label) {
  if (typeof value === 'string') {
    assert(!/\?{2,}|\uFFFD/.test(value), `中文可能損壞：${label}。請以 UTF-8 儲存，不可用問號代替文字。`)
  } else if (Array.isArray(value)) value.forEach((v,i) => walk(v, `${label}[${i}]`))
  else if (value && typeof value === 'object') {
    for (const [k,v] of Object.entries(value)) {
      walk(v, `${label}.${k}`)
      if (['path','preview'].includes(k)) {
        assert(typeof v === 'string' && v.startsWith('assets/') && !v.includes('..') && !v.includes('\\'), `素材路徑錯誤：${label}.${k}`)
        assert(/\.(png|jpe?g|webp|avif|pdf)$/i.test(v), `素材格式不支援：${v}`)
        assert(!/master|private_reference|agreement-original|thesis-original/i.test(v), `內部資料不可作素材：${v}`)
        assert(fs.existsSync(path.join(root,'public',v)), `找不到素材：${v}`)
        assets.add(v)
      }
      if (k === 'url') assert(/^https?:\/\//.test(v) || /^[a-z-]+\.html(?:#.*)?$/.test(v), `連結格式錯誤：${v}`)
    }
  }
}
walk(site, 'site')
projects.forEach((p,i) => {
  walk(p, names[i])
  assert(names[i] === `${p.slug}.json` && /^[a-z0-9-]+$/.test(p.slug), '檔名須與 slug 一致')
  assert(['competition','research'].includes(p.category), `${p.slug} category 不支援`)
  assert(typeof p.visible === 'boolean', `${p.slug} visible 請填 true 或 false`)
  for (const key of ['title','intro','event','description','short','team','award']) assert(typeof p[key] === 'string' && p[key].trim(), `${p.slug}.${key} 必須填文字`)
  for (const key of ['sections','stats','tags','evidence','gallery','links']) assert(Array.isArray(p[key]), `${p.slug}.${key} 請填陣列`)
  assert(p.personal_contribution === null || Array.isArray(p.personal_contribution), `${p.slug}.personal_contribution 請填陣列或 null`)
})
assert(new Set(projects.map(p=>p.slug)).size === projects.length, '作品 slug 重複')
assert(new Set(site.project_order).size === site.project_order.length, 'project_order 重複')
assert(site.project_order.every(slug=>projects.some(p=>p.slug===slug)), 'project_order 包含不存在的作品')
assert(projects.some(p=>p.visible), '至少需要一項公開作品')
assert(site.name === '洪聖崴', '姓名不符，請確認未套入他人履歷')
if (site.contact.email) assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contact.email), 'Email 格式錯誤')
for (const key of ['github','linkedin']) if (site.contact[key]) assert(/^https:\/\//.test(site.contact[key]), `${key} 請用 https 網址`)
assert(site.education.law_status, '法律學程需有明確狀態')
console.log(`Content OK: ${projects.length} projects, ${assets.size} referenced assets; UTF-8 / links / paths checked.`)
export { site, projects, assets }
