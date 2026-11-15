import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { useTilt } from '../../hooks/useTilt'
import profileImg from '../../assets/images/profile.jpg'
import passportImg from '../../assets/images/passport_size.jpg'

export default function About({ onResumeOpen }) {
  const [cardRef, cardVisible] = useReveal()
  const [bodyRef, bodyVisible] = useReveal()
  const [tiltRef, tiltStyles, isTiltActive] = useTilt()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="section" id="about">
      <div className="section__head">
        <p className="section__path">/about</p>
        <span className="section__rule" />
      </div>

      <div className="about">
        <div className={`about__card reveal ${cardVisible ? 'is-visible' : ''}`} ref={cardRef}>
          <div
            className={`pc ${isTiltActive ? 'is-active' : ''} ${isHovered ? 'is-hovered' : ''}`}
            data-tilt
            ref={tiltRef}
            style={tiltStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="pc__glow" aria-hidden="true" />
            <div className="pc__shell">
              <div className="pc__inner">
                <div className="pc__shine" aria-hidden="true" />
                <div className="pc__glare" aria-hidden="true" />

                <div className="pc__layer pc__layer--avatar">
                  <img className="pc__avatar" src={profileImg} alt="Kevin Calleja" />
                  <div className="pc__user">
                    <div className="pc__user-row">
                      <img className="pc__mini" src={passportImg} alt="" />
                      <div className="pc__user-text">
                        <div className="pc__default-content">
                          <span className="pc__handle">@HelloWorld0628</span>
                          <span className="pc__status">Third Year Student</span>
                          <span className="pc__meta">From Philippines</span>
                        </div>
                        <div className="pc__hover-content">
                          <h3 className="pc__hover-name">Kevin Calleja</h3>
                          <p className="pc__hover-course">Bachelor of Science in Information Technology Student</p>
                        </div>
                      </div>
                    </div>
                    <button className="pc__cta" type="button" onClick={onResumeOpen}>
                      Let's Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`about__body reveal ${bodyVisible ? 'is-visible' : ''}`} ref={bodyRef}>
          <h2 className="about__title">
            A developer who <span className="grad-text">cares about the details</span>
          </h2>

          <div className="about__blurb">
            <span className="about__blurb-bar" aria-hidden="true" />
            <p>
              Third year Bachelor of Science in Information Technology student with a solid foundation in software development,
              committed to creating <span className="accent">scalable and reliable</span> full-stack applications.
            </p>
          </div>

          <blockquote className="quote">
            <p>
              "Curiosity drives how I approach technology - from solving coding problems to developing
              <span className="quote__highlight">intuitive, useful software</span>. I enjoy transforming abstract
              ideas into tangible, usable solutions."
            </p>
          </blockquote>

          <div className="interests">
            <h3 className="interests__title">Interests</h3>
            <ul className="interests__list">
              <li>Software Development</li>
              <li>Web Technologies</li>
              <li>AI & Automation</li>
              <li>Problem-Solving</li>
            </ul>
          </div>

          <button className="btn btn--outline" id="resume-open" type="button" onClick={onResumeOpen}>
            <span>View Full Resume</span>
            <span className="icon icon--external" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  )
}