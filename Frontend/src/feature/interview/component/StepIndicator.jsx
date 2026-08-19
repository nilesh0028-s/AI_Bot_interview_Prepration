const steps = [
  { number: 1, label: 'Ingest', desc: 'Upload your profile' },
  { number: 2, label: 'Synthesis', desc: 'AI analyzes your data' },
  { number: 3, label: 'Plan', desc: 'Get your report' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((step, i) => (
        <div key={step.number} className="step-item">
          <div className={`step-circle ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'done' : ''}`}>
            {currentStep > step.number ? '✓' : step.number}
          </div>
          <div className="step-info">
            <span className="step-label">{step.label}</span>
            <span className="step-desc">{step.desc}</span>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${currentStep > step.number ? 'done' : ''}`} />}
        </div>
      ))}
    </div>
  )
}
