import { useEffect, useRef, useState } from 'react'
import { stats, services, projects, job, skills, links } from './data.js'

const reduce = () => matchMedia('(prefers-reduced-motion:reduce)').matches
const fine = () => matchMedia('(hover:hover) and (pointer:fine)').matches

// Fades up on scroll (staggered by `delay` ms). `tilt` adds a 3D hover effect.
function Reveal({ as: Tag = 'div', className = '', delay = 0, tilt, onSeen, style, children, ...rest }) {
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
  const move = (e) => {
    if (!tilt || reduce() || !fine()) return
    const el = ref.current, r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  const leave = () => { ref.current.style.setProperty('--rx', '0deg'); ref.current.style.setProperty('--ry', '0deg') }
  return (
    <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${tilt ? 'tilt' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }} onMouseMove={move} onMouseLeave={leave}
      {...rest}>{children}</Tag>
  )
}

function Stat({ n, d = 0, s, label, delay }) {
  const [v, setV] = useState(n)
  const run = () => {
    if (reduce()) return
    const t0 = performance.now()
    const f = (t) => {
      const p = Math.min((t - t0) / 1400, 1)
      setV(n * (1 - Math.pow(1 - p, 4)))
      if (p < 1) requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  return (
    <Reveal className="stat" tilt delay={delay} onSeen={run}>
      <b>{v.toFixed(d)}{s}</b><span>{label}</span>
    </Reveal>
  )
}

function Heading({ eyebrow, title, lead }) {
  return (
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="lead">{lead}</p>
    </Reveal>
  )
}

// Hero title: each word flies in with a stagger.
function Words({ text, grad, start = 0 }) {
  return text.split(' ').map((w, i) => (
    <span key={i}><span className={`word ${grad ? 'grad' : ''}`} style={{ '--d': `${start + i * 90}ms` }}>{w}</span>{' '}</span>
  ))
}

const ROLES = ['Data Analyst', 'Power BI Dashboard Builder', 'SQL & Python Problem Solver', 'Predictive Modeler']
function useTyper(words) {
  const [out, setOut] = useState(reduce() ? words[0] : '')
  useEffect(() => {
    if (reduce()) return
    let w = 0, c = 0, del = false, t
    const tick = () => {
      const word = words[w]
      c += del ? -1 : 1
      setOut(word.slice(0, c))
      let wait = del ? 35 : 75
      if (!del && c === word.length) { del = true; wait = 1400 }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300 }
      t = setTimeout(tick, wait)
    }
    tick()
    return () => clearTimeout(t)
  }, [])
  return out
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

// Scroll progress bar, cursor glow and the active nav section.
function useEffects() {
  const bar = useRef(null), glow = useRef(null)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`
    }
    const onMove = (e) => {
      glow.current.style.opacity = 1
      glow.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`
    }
    addEventListener('scroll', onScroll, { passive: true })
    if (fine() && !reduce()) addEventListener('pointermove', onMove)
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('section[id]').forEach(s => io.observe(s))
    return () => { removeEventListener('scroll', onScroll); removeEventListener('pointermove', onMove); io.disconnect() }
  }, [])
  return { bar, glow, active }
}

const ext = { target: '_blank', rel: 'noopener' }
const allSkills = Object.values(skills).flat()

export default function App() {
  const toggle = useTheme()
  const role = useTyper(ROLES)
  const { bar, glow, active } = useEffects()
  return (<>
    <div className="progress" ref={bar} />
    <div className="blobs" aria-hidden><i className="blob a" /><i className="blob b" /><i className="blob c" /></div>
    <div className="glow" ref={glow} aria-hidden />

    <header><div className="wrap"><nav aria-label="Main">
      <a className="logo" href="#top">Abhishek<span className="grad"> Gupta</span></a>
      <span className="links" style={{ display: 'flex', gap: 18 }}>
        {['services', 'projects', 'experience', 'skills', 'contact'].map(s =>
          <a key={s} href={`#${s}`} className={active === s ? 'active' : ''} style={{ textTransform: 'capitalize' }}>{s}</a>)}
      </span>
      <button id="theme" aria-label="Toggle dark mode" onClick={toggle}>◐</button>
    </nav></div></header>

    <main id="top">
      <section className="hero"><div className="wrap">
        <div className="badge fade-up"><span className="dot" /> Open to data analyst roles &amp; freelance projects</div>
        <h1>
          <Words text="I turn raw data into" />
          <Words text="measurable business impact." grad start={450} />
        </h1>
        <p className="typer fade-up" style={{ '--d': '900ms' }} aria-label="Data Analyst">
          <span aria-hidden>{role}<span className="caret" /></span>
        </p>
        <p className="sub fade-up" style={{ '--d': '1050ms' }}>Hi, I'm Abhishek, a Data Analyst from Lucknow, India. I build predictive models, automated dashboards and clean data pipelines that help teams make faster, better decisions, using Python, SQL and Power BI.</p>
        <div className="cta fade-up" style={{ '--d': '1200ms' }}>
          <a className="btn primary" href="#contact">Hire me</a>
          <a className="btn" href="#projects">See my work</a>
          <a className="btn" href="resume.pdf" download>Download resume ↓</a>
        </div>
        <div className="stats">{stats.map((s, i) => <Stat key={s.label} {...s} delay={1300 + i * 120} />)}</div>
      </div></section>

      <div className="marquee" aria-hidden>
        <div className="track">{[...allSkills, ...allSkills].map((c, i) => <span key={i} className="chip">{c}</span>)}</div>
      </div>

      <section id="services"><div className="wrap">
        <Heading eyebrow="What I can do for you" title="Analytics that drive decisions"
          lead="From messy spreadsheets to stakeholder-ready insight. Here is how I can help your team." />
        <div className="grid">{services.map(([ico, t, p], i) =>
          <Reveal key={t} className="card" tilt delay={(i % 3) * 110}><div className="ico">{ico}</div><h3>{t}</h3><p>{p}</p></Reveal>)}
        </div>
      </div></section>

      <section id="projects"><div className="wrap">
        <Heading eyebrow="Selected work" title="Projects with real results"
          lead="End-to-end projects, from raw data to a decision a stakeholder can act on. Full code is on GitHub." />
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
          {projects.map((p, i) => (
            <Reveal as="article" key={p.title} className="card project" tilt delay={i * 150}>
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
        <div className="grid">{Object.entries(skills).map(([k, v], i) =>
          <Reveal key={k} className="card" tilt delay={(i % 3) * 110}><h3>{k}</h3>
            <div className="row">{v.map(c => <span key={c} className="chip">{c}</span>)}</div></Reveal>)}
        </div>
      </div></section>

      <section><div className="wrap"><div className="grid">
        <Reveal className="card" tilt><h3>🎓 Education</h3><p><b style={{ color: 'var(--text)' }}>BCA, Computer Science</b><br />Data Science &amp; AI specialization<br />Shri Ramswaroop Memorial University<br />2023 – May 2026 · CGPA 7.57</p></Reveal>
        <Reveal className="card" tilt delay={110}><h3>📜 Certifications</h3><ul style={{ paddingLeft: 18 }}><li>Data Analytics Essentials, Cisco Networking Academy</li><li>Data Analytics Job Simulation, Deloitte (via Forage)</li></ul></Reveal>
        <Reveal className="card" tilt delay={220}><h3>🤝 How I work</h3><p>Creative, detail-oriented and a clear communicator. I evaluate performance, spot trends and explain findings in plain language.</p></Reveal>
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
