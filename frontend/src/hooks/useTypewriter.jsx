import { useState, useEffect, useRef } from 'react'

export function useTypewriter(phrases = [], options = {}) {
  const {
    typeSpeed = 75,
    deleteSpeed = 50,
    holdTime = 1500,
    nextPhraseDelay = 800,
    reducedMotion = false
  } = options

  const [showCursor, setShowCursor] = useState(true)
  const phraseIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const deletingRef = useRef(false)
  const timerRef = useRef(null)
  const isMountedRef = useRef(true)
  const elementRef = useRef(null)

  useEffect(() => {
    isMountedRef.current = true

    if (reducedMotion) {
      if (elementRef.current) {
        elementRef.current.textContent = phrases[0] || ''
      }
      setShowCursor(false)
      return
    }

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }

    const step = () => {
      if (!isMountedRef.current) return

      const phrase = phrases[phraseIndexRef.current] || ''
      const el = elementRef.current

      if (!deletingRef.current) {
        charIndexRef.current += 1
        if (el) el.textContent = phrase.slice(0, charIndexRef.current)

        if (charIndexRef.current === phrase.length) {
          deletingRef.current = true
          timerRef.current = setTimeout(step, holdTime)
          return
        }
        timerRef.current = setTimeout(step, typeSpeed)
        return
      }

      charIndexRef.current -= 1
      if (el) el.textContent = phrase.slice(0, charIndexRef.current)

      if (charIndexRef.current === 0) {
        deletingRef.current = false
        phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length
        timerRef.current = setTimeout(step, nextPhraseDelay)
        return
      }
      timerRef.current = setTimeout(step, deleteSpeed)
    }

    timerRef.current = setTimeout(step, 600)

    return () => {
      isMountedRef.current = false
      clearTimer()
    }
  }, [phrases, typeSpeed, deleteSpeed, holdTime, nextPhraseDelay, reducedMotion])

  return { elementRef, showCursor }
}