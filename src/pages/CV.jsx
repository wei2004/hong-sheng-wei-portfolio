import React from 'react'
import { Link } from 'react-router-dom'
import { profile, projects, role } from '../data/profile.js'
import Portrait from '../components/Portrait.jsx'

// 比賽獎項（履歷專用措辭；有 case study 的會連到作品頁）
const awards = projects.filter(p => p.category === 'competition').map(p => ({ comp: p.event, result: p.award, note: `${p.short} · ${role(p)}`, slug: p.slug }))

function SideBlock({ title, children }) {
  return (
    <div>
      <div className="mb-2 text-[13px] font-bold uppercase tracking-wide text-brand">{title}</div>
      {children}
    </div>
  )
}

export default function CV() {
  return (
    <main id="main" tabIndex={-1} className="cv-root mx-auto max-w-5xl px-5 py-10">
      {/* 列印樣式：列印時轉為白底黑字，隱藏按鈕 */}
      <style>{`
        @media print {
          .cv-noprint { display: none !important; }
          .cv-root { color: #111 !important; padding-top: 0 !important; }
          .cv-root .bg-card, .cv-root .bg-white\\/5 { background: #f4f4f5 !important; }
          .cv-root .border-line { border-color: #d4d4d8 !important; }
          .cv-root .text-white, .cv-root .text-white\\/90, .cv-root .text-white\\/85, .cv-root .text-white\\/80 { color: #111 !important; }
          .cv-root .text-mute { color: #555 !important; }
          .cv-root .text-cyan { color: #0e7490 !important; }
          .cv-root .text-brand { color: #b45309 !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* 頂部按鈕 */}
      <div className="cv-noprint mb-6 flex items-center justify-between">
        <Link to="/" className="text-[13px] text-mute transition hover:text-white">← 回首頁</Link>
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-brand px-4 py-2 text-[13px] font-bold text-[#231600] transition hover:brightness-110">
          列印 / 存成 PDF
        </button>
      </div>

      {/* HEADER */}
      <header className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-6 sm:flex-row sm:items-center">
        <Portrait small className="h-24 w-24 shrink-0 rounded-2xl" />
        <div className="flex-1">
          <h1 className="text-3xl font-black">
            {profile.name}
          </h1>
          <p className="mt-1 text-[15px] font-semibold text-cyan">{profile.title}</p>
          <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-white/80">
            {profile.site.resume_summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-white/85">
            {profile.email && <a href={`mailto:${profile.email}`} className="transition hover:text-brand">{profile.email}</a>}
            {profile.phone && <a href={`tel:${profile.phone}`}>{profile.phone}</a>}
            <span>{profile.location}</span>
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="transition hover:text-brand">GitHub</a>}

          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mt-6 grid gap-6 md:grid-cols-[1.7fr_1fr]">
        {/* 主欄 */}
        <div className="space-y-6">
          {/* 工作經驗 */}
          <section>
            <h2 className="mb-3 border-b border-line pb-2 text-xl font-black">實務與教學協助</h2>
            <div className="space-y-4">
              {profile.experience.map((e) => (
                <div key={`${e.org}-${e.role}`} className="rounded-xl border border-line bg-white/5 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="font-bold text-white">{e.role}<span className="ml-2 text-cyan">{e.org}</span></div>
                    <div className="text-[12px] text-mute">{e.period}</div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {e.points.map((pt, i) => (
                      <li key={i} className="text-[13px] leading-relaxed text-white/80">• {pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 border-b border-line pb-2 text-xl font-black">研究與大學專題</h2>
            <div className="space-y-3">{projects.filter(p => p.category === 'research').map(p => <Link key={p.slug} to={`/projects/${p.slug}`} className="block rounded-xl border border-line bg-white/5 p-4"><h3 className="font-bold text-white">{p.short}</h3><p className="mt-1 text-xs text-cyan">{p.award} · {p.date}</p><p className="mt-2 text-[13px] leading-relaxed text-white/80">{p.description}</p><p className="mt-2 text-xs text-mute">{role(p)}</p></Link>)}</div>
          </section>
          {/* 比賽獎項 */}
          <section>
            <h2 className="mb-3 border-b border-line pb-2 text-xl font-black">比賽獎項</h2>
            <div className="space-y-2.5">
              {awards.map((a) => {
                const body = (
                  <>
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div className="text-[14px] font-bold text-white">{a.comp}</div>
                      <span className="rounded-md bg-brand/15 px-2 py-0.5 text-[12px] font-bold text-brand">{a.result}</span>
                    </div>
                    {a.note && <div className="mt-0.5 text-[12.5px] text-mute">{a.note}</div>}
                  </>
                )
                const base = 'block rounded-xl border border-line bg-white/5 p-3.5'
                return a.slug
                  ? <Link key={a.comp} to={`/projects/${a.slug}`} className={`${base} transition hover:border-brand/50`}>{body}</Link>
                  : <div key={a.comp} className={base}>{body}</div>
              })}
            </div>
          </section>
        </div>

        {/* 側欄 */}
        <aside className="space-y-6">
          <SideBlock title="教育背景">
            <div className="space-y-2">
              {profile.education.map((ed) => (
                <div key={ed.school} className="rounded-xl border border-line bg-white/5 p-3">
                  <div className="text-[13.5px] font-bold text-white">{ed.school}</div>
                  <div className="text-[12.5px] text-white/80">{ed.dept}</div>
                  <div className="mt-0.5 text-[12px] text-mute">{ed.period}</div>
                </div>
              ))}
            </div>
          </SideBlock>

          <SideBlock title="學習面向">
            <div className="space-y-3">
              {profile.cvSkillGroups.map((g) => (
                <div key={g.label}>
                  <div className="mb-1.5 text-[12.5px] font-semibold text-cyan">{g.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((it) => (
                      <span key={it} className="rounded-lg border border-line bg-white/5 px-2 py-0.5 text-[11.5px] text-white/85">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SideBlock>

          <SideBlock title="科技法律學程">
            <p className="font-bold text-cyan">{profile.site.education.law_status}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/80">已修：{profile.site.education.law_courses.join('、')}。</p>
          </SideBlock>
          <SideBlock title="精選修課">
            <dl className="space-y-2">{profile.site.course_highlights.map(c => <div key={c.name} className="flex justify-between gap-3 text-xs"><dt className="text-mute">{c.name}</dt><dd className="font-bold text-brand">{c.score}</dd></div>)}</dl>
          </SideBlock>
          <SideBlock title="證照">
            <div className="flex flex-wrap gap-1.5">
              {profile.certs.map((c) => (
                <span key={c} className="rounded-lg border border-line bg-white/5 px-2 py-0.5 text-[11.5px] text-white/85">{c}</span>
              ))}
            </div>
          </SideBlock>

          <SideBlock title="語言能力">
            <div className="flex flex-wrap gap-1.5">
              {profile.languages.map((l) => (
                <span key={l} className="rounded-lg border border-line bg-white/5 px-2 py-0.5 text-[11.5px] text-white/85">{l}</span>
              ))}
            </div>
          </SideBlock>
        </aside>
      </div>
    </main>
  )
}
