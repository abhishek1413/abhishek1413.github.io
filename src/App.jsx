import { useEffect, useRef, useState } from 'react'
import { stats, services, projects, job, skills, links } from './data.js'

const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches

// Fades in on scroll; calls onSeen once (used for the stat counters).
function Reveal({ as: Tag = 'div', className = '', onSeen, children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setSeen(true)
      onSeen?.()
      io.disconnect()
    }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} {...rest}>{children}</Tag>
}

function Stat({ n, d = 0, s, label }) {
  const [v, setV] = useState(n)
  const run = () => {
    if (reduce()) return
    const t0 = performance.now()
    const f = (t) => {
      const p = Math.min((t - t0) / 1200, 1)
      setV(n * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  return (
    <Reveal className="stat" onSeen={run}>
      <b>{v.toFixed(d)}{s}</b><span>{label}</span>
    </Reveal>
  )
}

function Heading({ eyebrow, title, lead }) {
  return (<>
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p className="lead">{lead}</p>
  </>)
}

function useTheme() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('theme') } catch { return null } })
  useEffect(() => {
    if (!theme) return
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])
  return () => {
    const dark = theme ? theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches
    setTheme(dark ? 'light' : 'dark')
  }
}

const ext = { target: '_blank', rel: 'noopener' }

export default function App() {
  const toggle = useTheme()
  return (<>
    <header><div className="wrap"><nav aria-label="Main">
      <a className="logo" href="#top">Abhishek<span className="grad"> Gupta</span></a>
      <span className="links" style={{ display: 'flex', gap: 18 }}>
        {['services', 'projects', 'experience', 'skills', 'contact'].map(s =>
          <a key={s} href={`#${s}`} style={{ textTransform: 'capitalize' }}>{s}</a>)}
      </span>
      <button id="theme" aria-label="Toggle dark mode" onClick={toggle}>◐</button>
    </nav></div></header>

    <main id="top">
      <section className="hero"><div className="wrap">
        <div className="badge"><span className="dot" /> Open to data analyst roles &amp; freelance projects</div>
        <h1>I turn raw data into <span className="grad">measurable business impact.</span></h1>
        <p className="sub">Hi, I'm Abhishek, a Data Analyst from Lucknow, India. I build predictive models, automated dashboards and clean data pipelines that help teams make faster, better decisions, using Python, SQL and Power BI.</p>
        <div className="cta">
          <a className="btn primary" href="#contact">Hire me</a>
          <a className="btn" href="#projects">See my work</a>
          <a className="btn" href="resume.pdf" download>Download resume ↓</a>
        </div>
        <div className="stats">{stats.map(s => <Stat key={s.label} {...s} />)}</div>
      </div></section>

      <section id="services"><div className="wrap">
        <Heading eyebrow="What I can do for you" title="Analytics that drive decisions"
          lead="From messy spreadsheets to stakeholder-ready insight. Here is how I can help your team." />
        <div className="grid">{services.map(([ico, t, p]) =>
          <Reveal key={t} className="card"><div className="ico">{ico}</div><h3>{t}</h3><p>{p}</p></Reveal>)}
        </div>
      </div></section>

      <section id="projects"><div className="wrap">
        <Heading eyebrow="Selected work" title="Projects with real results"
          lead="End-to-end projects, from raw data to a decision a stakeholder can act on. Full code is on GitHub." />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
          {projects.map(p => (
            <Reveal as="article" key={p.title} className="card project">
              <div>{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <h3>{p.title}</h3>
              <div className="metrics">{p.metrics.map(([b, l]) => <span key={l} className="metric"><b>{b}</b>{l}</span>)}</div>
              <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
              <div>{p.stack.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <a className="plink" href={p.href} {...ext}>View on GitHub ↗</a>
            </Reveal>))}
        </div>
      </div></section>

      <section id="experience"><div className="wrap">
        <Heading eyebrow="Experience" title="Where I've worked" lead={' '} />
        <Reveal className="xp">
          <h3>{job.title}</h3><p className="meta">{job.meta}</p>
          <ul>{job.points.map(x => <li key={x}>{x}</li>)}</ul>
        </Reveal>
      </div></section>

      <section id="skills"><div className="wrap skills">
        <Heading eyebrow="Toolkit" title="Skills & tools" lead={' '} />
        <div className="grid">{Object.entries(skills).map(([k, v]) =>
          <Reveal key={k} className="card"><h3>{k}</h3>
            <div className="row">{v.map(c => <span key={c} className="chip">{c}</span>)}</div></Reveal>)}
        </div>
      </div></section>

      <section><div className="wrap"><div className="grid">
        <Reveal className="card"><h3>🎓 Education</h3><p><b style={{ color: 'var(--text)' }}>BCA, Computer Science</b><br />Data Science &amp; AI specialization<br />Shri Ramswaroop Memorial University<br />2023 – May 2026 · CGPA 7.57</p></Reveal>
        <Reveal className="card"><h3>📜 Certifications</h3><ul style={{ paddingLeft: 18 }}><li>Data Analytics Essentials, Cisco Networking Academy</li><li>Data Analytics Job Simulation, Deloitte (via Forage)</li></ul></Reveal>
        <Reveal className="card"><h3>🤝 How I work</h3><p>Creative, detail-oriented and a clear communicator. I evaluate performance, spot trends and explain findings in plain language.</p></Reveal>
      </div></div></section>

      <section id="contact"><div className="wrap">
        <Reveal className="contact">
          <p className="eyebrow">Let's work together</p>
          <h2>Have data that needs answers?</h2>
          <p>Tell me about your project. I usually reply within a day.</p>
          <a className="btn primary" href="mailto:informabhishekgupta@gmail.com?subject=Project%20inquiry">informabhishekgupta@gmail.com</a>
          <div className="socials">
            <a className="btn" href="tel:+916306891413">📞 +91 63068 91413</a>
            {links.map(([n, h]) => <a key={n} className="btn" href={h} {...ext}>{n}</a>)}
          </div>
        </Reveal>
      </div></section>
    </main>
    <footer>© {new Date().getFullYear()} Abhishek Gupta · Lucknow, India</footer>
  </>)
}
