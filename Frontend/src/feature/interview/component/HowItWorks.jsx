const steps = [
  { icon: 'cloud_upload', color: 'primary', label: 'Ingest Profile', desc: 'Upload your current resume and the specific job description.' },
  { icon: 'psychology', color: 'tertiary', label: 'Neural Synthesis', desc: 'AI correlates your experience against role requirements.' },
  { icon: 'auto_awesome', color: 'secondary', label: 'Generate Plan', desc: 'Receive targeted behavioral questions and skill gap reports.' },
]

export default function HowItWorks() {
  return (
    <section className="ce-how" id="how-it-works">
      <div className="ce-container">
        <div className="ce-section-header">
          <h2>The Cognitive Approach</h2>
          <p>A deterministic pipeline designed to bridge the gap between your current resume and the exact requirements of your target role.</p>
        </div>
        <div className="ce-steps">
          <div className="ce-steps-line" />
          {steps.map((step, i) => (
            <div key={i} className="ce-step">
              <div className={`ce-step-icon ce-step-icon--${step.color}`}>
                <span className="material-symbols-outlined">{step.icon}</span>
                <div className="ce-step-number">{i + 1}</div>
              </div>
              <h3>{step.label}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
