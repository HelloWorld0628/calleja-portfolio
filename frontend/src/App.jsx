import { useState, useEffect } from 'react'
import Preloader from './components/ui/Preloader'
import Navbar from './components/layout/Navbar'
import MobileMenu from './components/layout/MobileMenu'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import ContactForm from './components/forms/ContactForm'
import Footer from './components/layout/Footer'
import ResumeModal from './components/forms/ResumeModal'
import { useScrollSpy } from './hooks/useScrollSpy'

function App() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const activeSection = useScrollSpy(['about', 'stack', 'projects', 'contact'])

  const handlePreloaderDone = () => {
    setShowPreloader(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderDone} />}

      <div className="backdrop" aria-hidden="true">
        <div className="backdrop__grid" />
        <div className="backdrop__blob backdrop__blob--cyan" />
        <div className="backdrop__blob backdrop__blob--green" />
      </div>

      <Navbar
        activeSection={activeSection}
        isOpen={isMenuOpen}
        onToggle={setIsMenuOpen}
        onClose={closeMenu}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} activeSection={activeSection} />

      <main className="page">
        <Hero onViewProjects={() => closeMenu()} onContact={() => closeMenu()} />
        <About onResumeOpen={() => setIsResumeOpen(true)} />
        <Stack />
        <Projects />
        <ContactForm />
      </main>

      <Footer onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  )
}

export default App