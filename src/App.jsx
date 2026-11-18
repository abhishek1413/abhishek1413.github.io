import { useEffect, useRef, useState } from 'react'
import { person, links, stats, summary, education, certs, services, projects, job, skills } from './data.js'

const reduced = () => matchMedia('(prefers-reduced-motion:reduce)').matches
const ext = { target: '_blank', rel: 'noopener noreferrer' }
const NAV = [['about', 'About'], ['services', 'Services'], ['projects', 'Projects'], ['experience', 'Experience'], ['skills', 'Skills'], ['contact', 'Contact']]

// Adds .in once scrolled into view. `delay` staggers siblings; onSeen fires once.
function Reveal({ as: Tag = 'div', className = '', delay = 0, onSeen, style, children, ...rest }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setSeen(true)
      onSeen?.()
      io.disconnect()
    }, { threshold: 0.12 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

// Counts up from 0 to n the first time it is visible.
function Stat({ n, d = 0, s, label, delay }) {
  const [v, setV] = useState(reduced() ? n : 0)
  const run = () => {
    if (reduced()) return
    const t0 = performance.now()
    const f = (t) => {
      const p = Math.min((t - t0) / 1400, 1)
      setV(n * (1 - Math.pow(1 - p, 4)))
      if (p < 1) requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  return (
    <Reveal className="stat" delay={delay} onSeen={run}>
      <b>{v.toFixed(d)}{s}</b>
      <span>{label}</span>
    </Reveal>
  )
}

function Section({ id, num, title, lead, children }) {
  return (
    <section id={id}>
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-num">{num}</span>
          <h2>{title}</h2>
          {lead && <p>{lead}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

function useEffects() {
  const bar = useRef(null)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      bar.current.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`
      // the last section can't reach the observer band, so pin it at page bottom
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 4) setActive('contact')
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('section[id]').forEach(s => io.observe(s))
    return () => { removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  return { bar, active }
}

export default function App() {
  const { bar, active } = useEffects()
  const [open, setOpen] = useState(false)
  const year = new Date().getFullYear()

  return (<>
    <header>
      <div className="wrap">
        <nav aria-label="Main">
          <a className="logo" href="#top">{person.name}</a>
          <div className={`links ${open ? 'open' : ''}`} id="menu">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
          <a className="btn small" href="#contact">Hire me</a>
          <button className="menu-btn" aria-label="Menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </nav>
      </div>
      <div className="progress" ref={bar} />
    </header>

    <main id="top">
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <p className="eyebrow fade-up"><span className="dot" />{person.role} · {person.location.split(',')[0]}, India</p>
              <h1 className="fade-up" style={{ '--d': '100ms' }}>
                I turn raw data into <span className="mark">measurable business impact.</span>
              </h1>
              <p className="sub fade-up" style={{ '--d': '220ms' }}>
                I build analytics and business intelligence solutions, from cleaning and exploring large data sets to predictive modeling and stakeholder-ready dashboards, using Python, SQL and Power BI.
              </p>
              <div className="cta fade-up" style={{ '--d': '340ms' }}>
                <a className="btn" href="#contact">Hire me</a>
                <a className="btn ghost" href="#projects">See my work</a>
                <a className="btn ghost" href="resume.pdf" download>Download resume</a>
              </div>
            </div>

            <aside className="facts fade-up" style={{ '--d': '300ms' }} aria-label="At a glance">
              <h3>At a glance</h3>
              <dl>
                <dt>Role</dt><dd>{person.role}</dd>
                <dt>Location</dt><dd>{person.location}</dd>
                <dt>Education</dt><dd>BCA, Data Science &amp; AI<br />May 2026</dd>
                <dt>Focus</dt><dd>Python · SQL · Power BI</dd>
                <dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd>
                <dt>Phone</dt><dd><a href={person.phoneHref}>{person.phone}</a></dd>
              </dl>
            </aside>
          </div>

          <div className="stats">
            {stats.map((s, i) => <Stat key={s.label} {...s} delay={i * 100} />)}
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(k => (
            <ul key={k}>{['Python', 'SQL', 'Power BI', 'Excel', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'SciPy', 'Apache Airflow', 'dbt', 'n8n', 'Google Cloud', 'Git & GitHub'].map(t => <li key={t}>{t}</li>)}</ul>
          ))}
        </div>
      </div>

      <Section id="about" num="01" title="About">
        <div className="about">
          <Reveal className="summary">{summary.map(p => <p key={p}>{p}</p>)}</Reveal>
          <div className="stack">
            <Reveal className="box" delay={100}>
              <h3>Education</h3>
              <p className="strong">{education.degree}</p>
              <p>{education.spec}</p>
              <p>{education.school}</p>
              <p className="muted">{education.meta}</p>
            </Reveal>
            <Reveal className="box" delay={200}>
              <h3>Certifications</h3>
              <ul className="certs">{certs.map(([t, by]) => <li key={t}><span className="strong">{t}</span><span className="muted">{by}</span></li>)}</ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="services" num="02" title="What I can do for you" lead="From messy data to stakeholder-ready insight, based on work I have already delivered.">
        <div className="services">
          {services.map(([t, p], i) => (
            <Reveal key={t} className="svc" delay={(i % 3) * 100}>
              <span className="sec-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="projects" num="03" title="Projects" lead="End-to-end projects, from raw data to a decision a stakeholder can act on. Full code is on GitHub.">
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.title} className="project" delay={i * 120}>
              <p className="domain">{p.domain}</p>
              <h3>{p.title}</h3>
              <div className="meters">
                {p.bars.map(([l, w, v]) => (
                  <div className="meter" key={l}>
                    <div className="meter-top"><span>{l}</span><b>{v}</b></div>
                    <div className="meter-bar"><i style={{ '--w': `${w}%` }} /></div>
                  </div>
                ))}
              </div>
              <ul className="nums">{p.facts.map(([b, l]) => <li key={l}><b>{b}</b><span>{l}</span></li>)}</ul>
              <ul className="points">{p.points.map(x => <li key={x}>{x}</li>)}</ul>
              <ul className="tags">{p.stack.map(t => <li key={t}>{t}</li>)}</ul>
              <a className="plink" href={p.href} {...ext}>View on GitHub <span aria-hidden="true">↗</span></a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="experience" num="04" title="Experience">
        <Reveal className="xp">
          <div className="xp-head">
            <div><h3>{job.role}</h3><p className="company">{job.company}</p></div>
            <p className="when">{job.when}</p>
          </div>
          <ul className="points">{job.points.map(x => <li key={x}>{x}</li>)}</ul>
        </Reveal>
      </Section>

      <Section id="skills" num="05" title="Skills & tools">
        <div className="skill-list">
          {skills.map(([k, v], i) => (
            <Reveal key={k} className="skill-row" delay={i * 50}>
              <h3>{k}</h3>
              <ul className="chips">{v.map(c => <li key={c}>{c}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <section id="contact">
        <div className="wrap">
          <Reveal className="contact">
            <div>
              <p className="sec-num">06 · Contact</p>
              <h2>Have data that needs answers?</h2>
              <p className="muted">Open to Data Analyst roles and client projects. Tell me what you are working on.</p>
              <a className="big-mail" href={`mailto:${person.email}?subject=Project%20inquiry`}>{person.email}</a>
            </div>
            <ul className="contact-list">
              <li><span>Phone</span><a href={person.phoneHref}>{person.phone}</a></li>
              <li><span>Location</span><em>{person.location}</em></li>
              {links.map(([n, h]) => <li key={n}><span>{n}</span><a href={h} {...ext}>{h.replace(/^https?:\/\/(www\.)?/, '')} <i aria-hidden="true">↗</i></a></li>)}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>

    <footer><div className="wrap">© {year} {person.name} · {person.location}</div></footer>
  </>)
}
