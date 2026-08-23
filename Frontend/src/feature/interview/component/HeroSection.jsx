export default function HeroSection() {
  return (
    <section className="ce-hero" id="features">
      <div className="ce-glow ce-glow-1" />
      <div className="ce-glow ce-glow-2" />

      <div className="ce-container ce-hero-grid">
        <div className="ce-hero-left">
          <div className="ce-badge">
            <span className="ce-badge-dot" />
            <span>Cognitive Analysis Engine v2.4</span>
          </div>
          <h1 className="ce-hero-title">
            Land Your Dream Job <br />
            with <span className="ce-gradient-text">AI-Powered</span><br />
            Interview Prep.
          </h1>
          <p className="ce-hero-sub">
            Upload your resume and job description. Get tailored interview questions,
            skill gap analysis, a 7-day prep roadmap — and a free ATS-optimized resume
            built specifically for the role.
          </p>
          <div className="ce-hero-actions">
            <a href="#prepare" className="ce-btn-primary ce-btn-lg">
              <span className="material-symbols-outlined">upload_file</span>
              Upload Resume to Start
            </a>
            <div className="ce-social-proof">
              <div className="ce-avatars">
                <div className="ce-avatar-sm z3"><span className="material-symbols-outlined">person</span></div>
                <div className="ce-avatar-sm z2"><span className="material-symbols-outlined">person</span></div>
                <div className="ce-avatar-sm z1"><span className="material-symbols-outlined">person</span></div>
              </div>
              <span>Join 10k+ candidates</span>
            </div>
          </div>
        </div>

        <div className="ce-hero-right">
          <div className="ce-ai-card">
            <div className="ce-ai-card-top">
              <div className="ce-dots"><span /><span /><span /></div>
              <span className="ce-analyzing">
                <span className="material-symbols-outlined ce-spin">sync</span> Analyzing Data
              </span>
            </div>
            <div className="ce-mock-doc">
              <div className="ce-scan-line" />
              <div className="ce-mock-title-bar" />
              <div className="ce-mock-lines">
                <div /><div /><div className="ce-short" />
              </div>
              <div className="ce-gap-highlight">
                <div className="ce-gap-accent-bar" />
                <div className="ce-gap-header">
                  <div className="ce-mock-sm" />
                  <span className="ce-gap-badge">Gap Identified</span>
                </div>
                <div className="ce-mock-lines">
                  <div /><div className="ce-short" />
                </div>
              </div>
              <div className="ce-bar-chart">
                <div className="ce-bar" style={{ height: '40%' }} />
                <div className="ce-bar" style={{ height: '70%' }} />
                <div className="ce-bar ce-bar-primary" style={{ height: '90%' }}>
                  <span className="ce-bar-label">Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
