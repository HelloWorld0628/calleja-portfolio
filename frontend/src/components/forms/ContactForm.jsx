import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { api } from '../../services/api'

export default function ContactForm() {
  const [introRef, introVisible] = useReveal()
  const [formRef, formVisible] = useReveal()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const validate = (values) => {
    const newErrors = {}
    if (!values.name.trim()) newErrors.name = 'Name is required'
    else if (values.name.trim().length < 2) newErrors.name = 'Name too short'
    if (!values.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) newErrors.email = 'Invalid email'
    if (!values.message.trim()) newErrors.message = 'Message is required'
    else if (values.message.trim().length < 10) newErrors.message = 'Message too short'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate(formData)
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setStatus('')

    try {
      await api.contact.submit(formData)
      setFormData({ name: '', email: '', message: '' })
      setStatus('Message sent successfully ✓')
    } catch (error) {
      setStatus(error.message || 'Failed to send message')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="section__head">
        <p className="section__path">/contact</p>
        <span className="section__rule" />
      </div>

      <div className="contact">
        <div className={`contact__intro reveal ${introVisible ? 'is-visible' : ''}`} ref={introRef}>
          <h2 className="contact__title">Let's work together</h2>
          <p className="contact__lead">
            Have an opportunity or project in mind? Send a quick message - I usually respond within 24 hours.
          </p>

          <div className="contact__cards">
            <a
              className="social"
              href="https://github.com/HelloWorld0628"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--github social__icon" aria-hidden="true" />
              <span className="social__text">
                <strong>GitHub</strong>
                <small>Explore my projects</small>
              </span>
              <span className="icon icon--external social__arrow" aria-hidden="true" />
            </a>

            <a
              className="social"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon icon--linkedin social__icon social__icon--blue" aria-hidden="true" />
              <span className="social__text">
                <strong>LinkedIn</strong>
                <small>Let's connect</small>
              </span>
              <span className="icon icon--external social__arrow" aria-hidden="true" />
            </a>

            <a
              className="social"
              href="https://contra.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="social__icon social__icon--contra" aria-hidden="true">C</span>
              <span className="social__text">
                <strong>Contra</strong>
                <small>Hire me for freelance projects</small>
              </span>
              <span className="icon icon--external social__arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        <form
          className={`form reveal ${formVisible ? 'is-visible' : ''}`}
          ref={formRef}
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h3 className="form__title">Send a Message</h3>

          <div className={`field ${errors.name ? 'has-error' : ''}`}>
            <input
              id="field-name"
              name="name"
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="field__error" data-error-for="name">{errors.name}</p>
          </div>

          <div className={`field ${errors.email ? 'has-error' : ''}`}>
            <input
              id="field-email"
              name="email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="field__error" data-error-for="email">{errors.email}</p>
          </div>

          <div className={`field ${errors.message ? 'has-error' : ''}`}>
            <textarea
              id="field-message"
              name="message"
              rows={5}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
            <p className="field__error" data-error-for="message">{errors.message}</p>
          </div>

          <button className="btn btn--send" type="submit" data-submit disabled={isSubmitting}>
            <span className="icon icon--send" aria-hidden="true" />
            <span data-submit-label>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>

          <p className="form__status" role="status" aria-live="polite" data-form-status>
            {status}
          </p>
        </form>
      </div>
    </section>
  )
}