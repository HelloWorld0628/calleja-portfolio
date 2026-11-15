import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'

const techData = {
  frontend: [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'react' },
    { name: 'Tailwind', icon: 'tailwind' }
  ],
  backend: [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express', icon: 'express' },
    { name: 'REST APIs', icon: 'rest' },
    { name: 'JWT Auth', icon: 'jwt' },
    { name: 'FastAPI', icon: 'fastapi' }
  ],
  database: [
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'MySQL', icon: 'mysql' }
  ],
  devops: [
    { name: 'GitHub', icon: 'github' },
    { name: 'Vercel', icon: 'vercel' },
    { name: 'Render', icon: 'render' },
    { name: 'AWS', icon: 'aws' }
  ]
}

const extraTechs = [
  { name: 'Python', icon: 'python' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Java', icon: 'java' }
]

export default function Stack() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [groupsRef, groupsVisible] = useReveal()
  const [introRef, introVisible] = useReveal()
  const [quoteRef, quoteVisible] = useReveal()
  const [tabsRef, tabsVisible] = useReveal()

  const filters = ['all', 'frontend', 'backend', 'database', 'devops']

  const visibleGroups = activeFilter === 'all'
    ? Object.entries(techData)
    : Object.entries(techData).filter(([key]) => key === activeFilter)

  return (
    <section className="section" id="stack">
      <div className="section__head">
        <p className="section__path">/stack</p>
        <span className="section__rule" />
      </div>

      <div className={`stack reveal ${introVisible ? 'is-visible' : ''}`} ref={introRef}>
        <div className="stack__intro">
          <div>
            <h2 className="section__title">My Tech Stack</h2>
            <p className="section__sub">The technologies I reach for most often - each chosen with purpose</p>
          </div>
          <aside className={`stack__quote reveal ${quoteVisible ? 'is-visible' : ''}`} ref={quoteRef}>
            <p>"Use boring tech. Build something that lasts."</p>
            <div className="stack__quote-sign">
              <span>~ Dan McKinley</span>
              <span className="stack__quote-dot" />
            </div>
          </aside>
        </div>

        <div className="tabs" role="tablist" aria-label="Filter tech stack">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`tab ${activeFilter === filter ? 'is-active' : ''}`}
              type="button"
              data-filter={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div
          className={`stack__groups reveal ${groupsVisible ? 'is-visible' : ''}`}
          ref={groupsRef}
          id="stack-groups"
        >
          {visibleGroups.map(([groupKey, items]) => (
            <div key={groupKey} className="stack-group" data-group={groupKey}>
              <h3 className="stack-group__title">{groupKey}</h3>
              <div className="stack-group__items">
                {items.map((item) => (
                  <span key={item.name} className="chip" data-category={groupKey}>
                    <span className={`icon icon--${item.icon}`} aria-hidden="true" />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stack__extra">
          <p className="code stack__extra-label">// Also comfortable with:</p>
          <div className="stack-group__items">
            {extraTechs.map((item) => (
              <span key={item.name} className="chip chip--flat">
                <span className={`icon--${item.icon}`} aria-hidden="true" />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}