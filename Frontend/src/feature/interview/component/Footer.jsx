export default function Footer() {
  return (
    <footer className="ce-footer">
      <div className="ce-container">
        <div className="ce-footer-grid">
          <div className="ce-footer-brand">
            <div className="ce-logo">
              <span className="material-symbols-outlined">psychology</span>
              <span className="ce-logo-text">Cognitive Edge</span>
            </div>
            <p>Master the art of high-stakes interviews with AI-driven behavioral analysis and real-time feedback coaching.</p>
          </div>
          <div className="ce-footer-links">
            <span>Company</span>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="ce-footer-social">
            <span>Connect</span>
            <div className="ce-social-icons">
              <a href="#"><span className="material-symbols-outlined">share</span></a>
              <a href="#"><span className="material-symbols-outlined">public</span></a>
              <a href="#"><span className="material-symbols-outlined">groups</span></a>
            </div>
          </div>
        </div>
        <div className="ce-footer-bottom">
          <span>© 2024 Cognitive Edge AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
