import { useRef, useEffect, useState } from 'react'

export function useTilt() {
  const elementRef = useRef(null)
  const [styles, setStyles] = useState({})
  const [isActive, setIsActive] = useState(false)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useEffect(() => {
    const element = elementRef.current
    if (!element || reducedMotion || !hasFinePointer) return

    let active = false

    const onMove = (event) => {
      if (!active) return
      const rect = element.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const px = (x / rect.width) * 100
      const py = (y / rect.height) * 100

      setStyles({
        '--pointer-x': `${px}%`,
        '--pointer-y': `${py}%`,
        '--rotate-x': `${((px - 50) / 6).toFixed(2)}deg`,
        '--rotate-y': `${(-(py - 50) / 5).toFixed(2)}deg`
      })
    }

    const onEnter = (event) => {
      active = true
      setIsActive(true)
      onMove(event)
    }

    const onLeave = () => {
      active = false
      setIsActive(false)
      setStyles({
        '--rotate-x': '0deg',
        '--rotate-y': '0deg'
      })
    }

    element.addEventListener('pointerenter', onEnter)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      element.removeEventListener('pointerenter', onEnter)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion, hasFinePointer])

  return [elementRef, styles, isActive]
}