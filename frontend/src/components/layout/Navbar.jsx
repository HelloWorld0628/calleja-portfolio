import { useEffect, useState, useRef } from 'react'

export default function Navbar({ activeSection, isOpen, onToggle, onClose }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 20)

      if (y > lastScrollY.current && y > 120) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'about', label: '/about' },
    { id: 'stack', label: '/stack' },
    { id: 'projects', label: '/projects' },
    { id: 'contact', label: '/contact' }
  ]

  const scrollToSection = (id) => {
    onClose()
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
    <nav
      className={`nav ${isScrolled ? 'is-scrolled' : ''} ${isHidden ? 'is-hidden' : ''} ${isOpen ? 'is-open' : ''}`}
      id="nav"
    >
      <a className="nav__logo" href="#top" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
        <pre>{'</kevin>'}</pre>
      </a>

      <div className="nav__links">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            data-scroll-to={link.id}
            data-nav-link={link.id}
            className={activeSection === link.id ? 'is-active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        className="nav__toggle"
        id="menu-toggle"
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <svg className="nav__icon nav__icon--burger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg className="nav__icon nav__icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>
  )
}