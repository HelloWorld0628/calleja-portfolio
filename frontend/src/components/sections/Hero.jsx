import { useTypewriter } from '../../hooks/useTypewriter'

export default function Hero({ onViewProjects, onContact }) {
  const { elementRef, showCursor } = useTypewriter([
    'Building things that just work.',
    'Keeping the code clean.',
    'Solving problems properly.',
    'Shipping without the drama.'
  ], {
    typeSpeed: 50,
    deleteSpeed: 30,
    holdTime: 1500,
    nextPhraseDelay: 400
  })

  const scrollToSection = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const target = document.getElementById(id)
    if (!target) return
    const navHeight = 80
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <p className="hero__intro code">
        <span className="accent">const</span> developer ={' '}
        <span className="hero__name">"Kevin Calleja"</span>;
      </p>

      <h1 className="hero__title">Full-Stack Developer</h1>
      <h2 className="hero__rotator">
        <span className="typewriter" data-typewriter ref={elementRef}></span>
        <span className={`typewriter__cursor ${!showCursor ? 'is-hidden' : ''}`} data-cursor>|</span>
      </h2>
      <p className="hero__lead">
        I build end-to-end web applications, connecting intuitive frontends with scalable backend systems
        focused on clean architecture, performance, and production-ready results.
      </p>

      <div className="hero__actions">
        <button className="btn btn--primary" type="button" onClick={() => scrollToSection('projects')}>
          View Projects <span className="btn__arrow">→</span>
        </button>
        <button className="btn btn--ghost" type="button" onClick={() => scrollToSection('contact')}>
          Get in Touch
        </button>
      </div>

      <div className="deco deco--braces" aria-hidden="true">{'{'}{'}'}</div>
      <div className="deco deco--bars" aria-hidden="true">
        <span className="bar bar--teal"></span>
        <span className="bar bar--green"></span>
        <span className="bar bar--slate"></span>
      </div>
      <div className="deco deco--brackets" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <div className="deco deco--dots" aria-hidden="true">
        <span className="dot dot--teal"></span>
        <span className="dot dot--green"></span>
        <span className="dot dot--slate"></span>
        <span className="dot dot--yellow"></span>
      </div>
      <aside className="sticky-note" aria-hidden="true">
        <span className="sticky-note__quote">
          <svg className="sticky-note__mark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </span>
        <p className="sticky-note__text">Design with intent. Develop with discipline.</p>
        <div className="sticky-note__sign">
          <span className="sticky-note__line"></span>
          <span className="sticky-note__label">CODING MANTRA</span>
        </div>
      </aside>
      <div className="deco deco--roles" aria-hidden="true">
        <span className="code">// developer</span>
        <span className="code">// designer</span>
        <span className="code">// problem-solver</span>
      </div>
      <div className="deco deco--tag" aria-hidden="true">{'<'}{'/'}{'>'}</div>
    </section>
  )
}