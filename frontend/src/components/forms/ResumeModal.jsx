import { useEffect, useRef } from 'react'

export default function ResumeModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const frameRef = useRef(null)
  const hintRef = useRef(null)

  const checkResumeFile = async () => {
    if (!frameRef.current || !hintRef.current) return
    try {
      const response = await fetch('/resume.pdf', { method: 'HEAD' })
      hintRef.current.hidden = response.ok
    } catch {
      hintRef.current.hidden = false
    }
  }

  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement
      document.body.classList.add('is-locked')
      checkResumeFile()
      const closeBtn = modalRef.current?.querySelector('[data-modal-close].modal__btn')
      closeBtn?.focus()
    } else {
      document.body.classList.remove('is-locked')
      lastFocusedRef.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal" id="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title" ref={modalRef}>
      <div className="modal__backdrop" data-modal-close onClick={onClose} />
      <div className="modal__panel">
        <header className="modal__head">
          <h3 className="modal__title" id="resume-title">Resume</h3>
          <div className="modal__actions">
            <a
              className="modal__btn"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Open resume in a new tab"
            >
              <span className="icon icon--external" aria-hidden="true" />
            </a>
            <a
              className="modal__btn modal__btn--accent"
              href="/resume.pdf"
              download="Resume.pdf"
              aria-label="Download resume"
            >
              <span className="icon icon--download" aria-hidden="true" />
            </a>
            <button
              className="modal__btn modal__btn--plain"
              type="button"
              data-modal-close
              aria-label="Close resume"
              onClick={onClose}
            >
              <span className="icon icon--close" aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className="modal__body">
          <iframe className="modal__frame" ref={frameRef} src="/resume.pdf" title="Resume" />
          <p className="modal__hint" ref={hintRef} hidden>
            Add your own PDF at <code>public/resume.pdf</code> to see it here.
          </p>
        </div>
      </div>
    </div>
  )
}