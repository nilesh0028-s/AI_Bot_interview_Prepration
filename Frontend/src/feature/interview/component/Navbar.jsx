export default function Navbar() {
  return (
    <header className="ce-navbar">
      <div className="ce-navbar-inner">
        <div className="ce-logo">
          <div className="ce-logo-icon">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <span className="ce-logo-text">Cognitive Edge</span>
        </div>
        <nav className="ce-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#prepare">Get Started</a>
        </nav>
        <div className="ce-nav-actions">
          <a href="#prepare" className="ce-btn-primary">Get Started</a>
          <div className="ce-avatar">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}
