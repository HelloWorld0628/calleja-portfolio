export default function Footer({ onScrollTop }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <span className="footer__rule" />
      <p className="footer__note">
        Built with modern web technologies and a focus on clean and performant code
      </p>
      <p className="footer__made">
        Made with
        <span className="icon icon--heart footer__heart" aria-hidden="true" />
        and
        <span className="icon icon--coffee footer__coffee" aria-hidden="true" />
        by Kevin
      </p>
      <div className="footer__links">
        <a href="https://github.com/HelloWorld0628" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer__sep">•</span>
        <button type="button" id="scroll-top" onClick={onScrollTop}>Scroll to top</button>
      </div>
      <p className="footer__copy">© {year} • All rights reserved</p>
    </footer>
  )
}