export default function MobileMenu({ isOpen, onClose, activeSection }) {
  if (!isOpen) return null

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
    <div className="menu is-open" id="mobile-menu">
      <div className="menu__links">
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
        <button className="menu__close" id="menu-close" type="button" onClick={onClose}>
          Close Menu
        </button>
      </div>
    </div>
  )
}