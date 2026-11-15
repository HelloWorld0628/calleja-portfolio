import { usePreloader } from '../../hooks/usePreloader'

export default function Preloader({ onComplete }) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { phase, progress, showSkip, finish } = usePreloader({
    reducedMotion,
    skipForDev: false,
    onComplete
  })

  if (phase === 'done') return null

  const isHiding = phase === 'hiding' || phase === 'done'
  const isCountHidden = phase === 'count-hidden' || phase === 'hiding' || phase === 'done'
  const isFollowTall = phase === 'follow-tall' || phase === 'sweep' || phase === 'hiding' || phase === 'done'
  const isSweep = phase === 'sweep' || phase === 'hiding' || phase === 'done'

  return (
    <div className="preloader" id="preloader">
      <div className="preloader__stage">
        <div
          className="preloader__follow"
          data-follow
          style={{
            width: phase === 'loading' ? 0 : '100%',
            height: isFollowTall ? '100%' : '2px',
            top: isFollowTall ? 0 : '50%',
            transform: isFollowTall ? 'none' : 'translateY(-50%)'
          }}
        />
        <div
          className="preloader__sweep"
          style={{ transform: isSweep ? 'translateX(0)' : 'translateX(100%)' }}
        />
        <div className="preloader__rule">
          <span
            className="preloader__bar"
            data-bar
            style={{ width: isCountHidden ? '100%' : `${progress}%` }}
          />
        </div>
        <p className={`preloader__count ${isCountHidden ? 'preloader__hide-off' : ''}`}>
          <span data-count>{progress}</span>%
        </p>
      </div>
      <div className="preloader__content" data-preloader-content>
        <div className="preloader__fill" data-portfolio-content />
      </div>
      {showSkip && (
        <button className="skip-intro" id="skip-intro" type="button" onClick={finish}>
          Skip Intro
        </button>
      )}
    </div>
  )
}