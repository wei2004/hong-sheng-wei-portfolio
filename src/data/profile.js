// 日常只改 content/ 裡的 JSON；此檔把資料接到學長的原始版型。
import site from '../../content/site.json'
const modules = import.meta.glob('../../content/projects/*.json', { eager: true, import: 'default' })
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
export const role = (p) => p.personal_contribution?.length
  ? `我的參與：${p.personal_contribution.join('、')}`
  : (p.category === 'competition' ? '團隊提案與成果' : '團隊研究與報告方法')
export const projects = Object.values(modules).filter(p => p.visible).sort((a, b) => {
  const rank = p => site.project_order.includes(p.slug) ? site.project_order.indexOf(p.slug) : 999
  return rank(a) - rank(b)
}).map(p => ({
  ...p,
  featured: p.category === 'competition',
  host: p.event,
  period: p.date,
  coverImg: p.cover ? asset(p.cover.path) : null,
  hook: p.description,
  stat: { big: p.award, label: p.team },
  hasDemo: Boolean(p.actions?.some(a => a.label.includes('Demo'))),
  video: p.actions?.find(a => a.label.includes('影片'))?.url,
}))
export const profile = {
  name: site.name,
  nameZh: site.name,
  title: `${site.education.school} · ${site.education.department}`,
  titleEn: '經營管理 · 研究與實務',
  tagline: site.intro,
  location: `預計 ${site.education.expected_graduation_year} 年畢業`,
  email: site.contact.email,
  phone: site.contact.phone,
  github: site.contact.github,
  linkedin: site.contact.linkedin,
  cv: '/cv',
  photo: site.portrait ? asset(site.portrait.path) : null,
  intro: site.about,
  experience: site.experience.map(e => ({ role: e.title, org: '', period: e.duration || e.period, points: [e.description] })),
  education: [{ school: site.education.school, dept: site.education.department, period: `${site.education.start_year} 入學 · 預計 ${site.education.expected_graduation_year} 畢業` }],
  productSkills: site.certifications,
  techSkills: [`${site.language.exam}：${site.language.skills.join('／')} ${site.language.level}`],
  certs: site.certifications,
  languages: [`${site.language.exam}：${site.language.skills.join('／')} ${site.language.level}`],
  cvSkillGroups: site.focus.map(f => ({ label: f.title, items: [f.text] })),
  site,
}
