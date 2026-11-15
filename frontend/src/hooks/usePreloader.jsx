import { useState, useEffect, useCallback, useRef } from 'react'

export function usePreloader(options = {}) {
  const {
    reducedMotion = false,
    skipForDev = false,
    onComplete
  } = options

  const [phase, setPhase] = useState('loading')
  const [progress, setProgress] = useState(0)
  const [showSkip, setShowSkip] = useState(true)
  const timersRef = useRef([])

  const later = useCallback((fn, ms) => {
    const timer = setTimeout(fn, ms)
    timersRef.current.push(timer)
  }, [])

  const finish = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setPhase('hiding')
    setShowSkip(false)
    later(() => {
      setPhase('done')
      onComplete?.()
    }, 320)
  }, [later, onComplete])

  useEffect(() => {
    if (reducedMotion || skipForDev) {
      finish()
      return
    }

    const tick = setInterval(() => {
      setProgress((p) => {
        const next = p + 1
        if (next >= 100) {
          clearInterval(tick)
          return 100
        }
        return next
      })
    }, 25)

    later(() => {
      setPhase('line-complete')
    }, 700)

    later(() => {
      setPhase('count-hide')
    }, 1900)

    later(() => {
      setPhase('count-hidden')
    }, 2250)

    later(() => {
      setPhase('follow-tall')
    }, 2350)

    later(() => {
      setPhase('sweep')
    }, 3050)

    later(finish, 3700)

    return () => {
      clearInterval(tick)
      timersRef.current.forEach(clearTimeout)
    }
  }, [reducedMotion, skipForDev, later, finish])

  return { phase, progress, showSkip, finish }
}