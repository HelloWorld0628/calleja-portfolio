import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import hirelaneImg from '../../assets/images/hirelane.png'
import careerquillImg from '../../assets/images/careerquill.png'
import flowmindImg from '../../assets/images/flowmind.png'
import proctorlyImg from '../../assets/images/proctorly.png'

const projects = [
  {
    id: 'hirelane',
    title: 'HireLane',
    subtitle: 'Job Application Automation & Tracking Platform',
    image: hirelaneImg,
    sheen: 'orange',
    description: 'Chrome extension automating job applications across 5 ATS platforms, with a unified dashboard tracking status, deadlines, and JD-resume match scores.',
    highlights: [
      '5 ATS platforms supported (Workday, Greenhouse, Wellfound, Internshala, Naukri)',
      '3-layer field classification (static + cache + Gemini fallback)',
      'Multi-stage Workday flow handling with stable session IDs'
    ],
    tech: [
      { name: 'React', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: null },
      { name: 'Gemini API', icon: null },
      { name: 'Chrome Extension APIs', icon: null },
      { name: 'JWT', icon: 'jwt' }
    ],
    github: 'https://github.com/HelloWorld0628'
  },
  {
    id: 'careerquill',
    title: 'CareerQuill',
    subtitle: 'Resume Generation & ATS Scoring Platform',
    image: careerquillImg,
    sheen: 'teal',
    description: 'End-to-end resume builder with ATS scoring using NLP to match resumes against job descriptions and suggest keywords.',
    highlights: [
      '6 resume templates (PDF & DOCX)',
      'NLP-based ATS scoring',
      'JWT auth & resume versioning'
    ],
    tech: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind', icon: 'tailwind' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'spaCy', icon: null },
      { name: 'scikit-learn', icon: null }
    ],
    github: 'https://github.com/HelloWorld0628'
  },
  {
    id: 'flowmind',
    title: 'FlowMind-AI',
    subtitle: 'No-Code AI Workflow Builder',
    image: flowmindImg,
    sheen: 'violet',
    description: 'Visual platform to design and execute AI workflows using drag-and-drop nodes, document retrieval, and LLM orchestration.',
    highlights: [
      'Visual workflow editor',
      'Semantic search (90%+ accuracy)',
      'Tiered access & orchestration'
    ],
    tech: [
      { name: 'React', icon: 'react' },
      { name: 'React Flow', icon: null },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'PostgreSQL', icon: null },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'ChromaDB', icon: null },
      { name: 'Gemini LLM', icon: null },
      { name: 'Docker', icon: null }
    ],
    github: 'https://github.com/HelloWorld0628'
  },
  {
    id: 'proctorly',
    title: 'Proctorly',
    subtitle: 'Real-Time Video Proctoring System',
    image: proctorlyImg,
    sheen: 'amber',
    description: 'Web-based proctoring system monitoring video, audio, and object detection to generate session integrity reports.',
    highlights: [
      'Face & object detection',
      'Real-time event logging',
      'PDF integrity reports'
    ],
    tech: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind', icon: 'tailwind' },
      { name: 'MediaPipe', icon: null },
      { name: 'TensorFlow.js', icon: null },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'jsPDF', icon: null }
    ],
    github: 'https://github.com/HelloWorld0628'
  }
]

export default function Projects() {
  const [projectsRef, projectsVisible] = useReveal()
  const [expandedTechs, setExpandedTechs] = useState({})

  const toggleTech = (projectId) => {
    setExpandedTechs((prev) => ({ ...prev, [projectId]: !prev[projectId] }))
  }

  return (
    <section className="section" id="projects">
      <div className="section__head">
        <p className="section__path">/projects</p>
        <span className="section__rule" />
      </div>

      <div className={`projects reveal ${projectsVisible ? 'is-visible' : ''}`} ref={projectsRef}>
        <h2 className="section__title">Things I've Built</h2>
        <p className="section__sub section__sub--wide">
          Real-world projects focused on system design, scalability, and clean engineering.
        </p>

        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.id} className="project">
              <div className="project__media">
                <img src={project.image} alt={project.title} loading="lazy" />
                <span className="project__scrim" />
                <span className={`project__sheen project__sheen--${project.sheen}`} />
                <div className="project__caption">
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>
              </div>
              <div className="project__body">
                <p className="project__desc">{project.description}</p>
                <ul className="project__highlights">
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
                <div
                  className={`project__tech ${expandedTechs[project.id] ? '' : 'is-collapsed'}`}
                  data-tech
                >
                  {project.tech.map((t, i) =>
                    t.icon ? (
                      <span key={i} className="tag">
                        <span className={`icon icon--${t.icon}`} aria-hidden="true" />
                        {t.name}
                      </span>
                    ) : (
                      <span key={i} className="tag">{t.name}</span>
                    )
                  )}
                  <button
                    className="project__more"
                    type="button"
                    data-tech-toggle
                    onClick={() => toggleTech(project.id)}
                  >
                    {expandedTechs[project.id] ? '− less' : `+${Math.max(project.tech.length - 4, 0)}`}
                  </button>
                </div>
                <div className="project__links">
                  <button
                    type="button"
                    className="project__link"
                    aria-label={`${project.title} source on GitHub`}
                  >
                    <span className="icon icon--github" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects__footer">
          <a
            className="link-underline"
            href="https://github.com/HelloWorld0628"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              View all projects on GitHub
              <span className="link-underline__bar" />
            </span>
            <span className="icon icon--external" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}