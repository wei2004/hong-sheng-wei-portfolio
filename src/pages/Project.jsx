// 沿用 Ken Chui 的 ProjectBNP / ProjectTapAble 頁面結構、Section / Card 版型。
// 內容改由 JSON 共用，檜山坊也使用相同版型。
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects, role, asset } from '../data/profile.js'
import Media from '../components/Media.jsx'

function Section({ kicker, title, children, id }) {
  return <section id={id} className="mx-auto max-w-4xl px-5 py-10">
    {kicker && <div className="mb-1 text-[13px] font-bold text-cyan">{kicker}</div>}
    <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
}
function Card({ title, children, index }) {
  return <div className="rounded-2xl border border-line bg-card p-5">
    <h3 className={`mb-2 font-bold ${index % 2 ? 'text-cyan' : 'text-brand'}`}>{title}</h3>
    <p className="text-[14px] leading-relaxed text-white/85">{children}</p>
  </div>
}
function Evidence({ item }) {
  if (!item.path.endsWith('.pdf')) return <Media item={item} />
  return <div className="rounded-2xl border border-line bg-card p-4">
    {item.preview && <Media item={{path: item.preview, alt: item.alt, caption: `證明 PDF 第 ${item.page || 1} 頁預覽`}} />}
    <a href={`${asset(item.path)}#page=${item.page || 1}`} target="_blank" rel="noreferrer" className="mt-3 block py-2 text-sm font-semibold text-cyan">{item.caption} · 開啟 PDF ↗</a>
  </div>
}
export default function Project() {
  const { slug } = useParams()
  const p = projects.find(p => p.slug === slug)
  if (!p) return <main id="main" tabIndex={-1} className="mx-auto max-w-4xl px-5 py-20"><h1 className="text-3xl font-bold">找不到這項作品</h1><Link to="/" className="mt-6 block text-cyan">回到首頁 →</Link></main>
  return <main id="main" tabIndex={-1}>
    <section className="pp-ring border-b border-line/60">
      <div className="mx-auto max-w-4xl px-5 py-14">
        <Link to="/?section=projects" className="mb-6 inline-block text-sm text-mute hover:text-white">← 回到作品集</Link>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/15 px-3 py-1 text-[13px] font-bold text-brand">{p.award}</span>
          <span className="text-[13px] text-mute">{p.period}</span>
        </div>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">{p.title}</h1>
        <p className="mt-3 text-[15px] font-semibold text-cyan">{p.event}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85">{p.intro}</p>
        {p.actions?.length > 0 && <div className="mt-7 flex flex-wrap gap-3">{p.actions.map((a,i) => <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className={`rounded-xl px-5 py-3 text-sm font-bold transition hover:brightness-110 ${i === 0 ? 'bg-brand text-[#231600] shadow-glow' : 'border border-line text-white/90 hover:bg-white/5'}`}>{a.label} ↗</a>)}</div>}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">{p.stats.map(s => <div key={s.label} className="rounded-2xl border border-line bg-card p-4 text-center"><div className="text-2xl font-black text-brand">{s.value}</div><div className="mt-1 text-xs text-mute">{s.label}</div></div>)}</div>
      </div>
    </section>
    <Section kicker="MY ROLE" title="參與說明">
      <div className="rounded-2xl border border-line bg-card p-5"><p className="font-semibold text-cyan">{role(p)}</p><p className="mt-2 text-sm leading-relaxed text-white/80">{p.personal_contribution?.length ? `本頁同時展示${p.team}的整體作品，個人參與以上述分工為範圍。` : '本頁呈現團隊的提案與研究內容。'}</p></div>
    </Section>
    {p.cover && <div className="mx-auto max-w-4xl px-5 pb-6"><Media item={p.cover} eager /></div>}
    {p.sections.map((s,i) => <Section key={s.title} kicker={`CASE STUDY / ${String(i+1).padStart(2,'0')}`} title={s.title} id={`section-${i+1}`}>
      {s.paragraphs?.map((v,n) => <p key={n} className="mb-4 text-[15px] leading-relaxed text-white/85">{v}</p>)}
      {s.cards && <div className={`grid gap-4 ${s.cards.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>{s.cards.map((c,n) => <Card key={c.title} title={c.title} index={n}>{c.text}</Card>)}</div>}
      {s.facts && <dl className="divide-y divide-line rounded-2xl border border-line bg-card px-5">{s.facts.map(f => <div key={f.label} className="grid gap-2 py-4 sm:grid-cols-[120px_1fr]"><dt className="text-sm font-bold text-cyan">{f.label}</dt><dd className="text-sm text-white/85">{f.value}</dd></div>)}</dl>}
      {s.note && <p className="mt-4 rounded-xl border border-line bg-white/5 p-4 text-sm leading-relaxed text-mute">{s.note}</p>}
      {s.images && <div className={`mt-6 grid items-start gap-5 ${s.images.length > 1 ? 'md:grid-cols-2' : ''}`}>{s.images.map(im => <Media key={im.path} item={im} />)}</div>}
    </Section>)}
    {p.gallery.length > 0 && <Section kicker="GALLERY" title="活動與作品紀錄"><div className="grid items-start gap-5 md:grid-cols-2">{p.gallery.map(im => <Media key={im.path} item={im} />)}</div></Section>}
    {p.evidence.length > 0 && <Section kicker="AWARD & EVIDENCE" title="獲獎與參賽證明"><div className="grid items-start gap-5 md:grid-cols-2">{p.evidence.map(im => <Evidence key={im.path} item={im} />)}</div></Section>}
    {p.links.length > 0 && <Section kicker="RESOURCES" title="相關連結"><div className="flex flex-wrap gap-3">{p.links.map(a => <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className="rounded-xl border border-line px-4 py-3 text-sm text-cyan hover:bg-white/5">{a.label} ↗</a>)}</div></Section>}
    <div className="mx-auto max-w-4xl px-5 pb-16"><Link to="/?section=projects" className="block rounded-2xl border border-line bg-card p-6 text-center font-semibold text-brand">回到作品集 →</Link></div>
  </main>
}
