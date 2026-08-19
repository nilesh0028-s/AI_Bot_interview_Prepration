export default function AnalysisForm({ formData, onChange, onFile, onSubmit, loading }) {
  return (
    <section className="ce-prepare" id="prepare">
      <div className="ce-prepare-bg" />
      <div className="ce-container">
        <div className="ce-form-card">
          <div className="ce-form-header">
            <h2>Generate Your Interview Report</h2>
            <p>Input your details below to initialize the cognitive analysis sequence.</p>
          </div>

          <form onSubmit={onSubmit} className="ce-form">

            <div className="ce-field">
              <label>Upload Resume Document</label>
              <div className={`ce-upload ${formData.resume ? 'ce-upload--active' : ''}`}>
                <input type="file" accept=".pdf" id="resumeUpload" onChange={onFile} required className="ce-upload-input" />
                <label htmlFor="resumeUpload" className="ce-upload-label">
                  <div className="ce-upload-icon">
                    <span className="material-symbols-outlined">upload_file</span>
                  </div>
                  <div className="ce-upload-text">
                    {formData.resume ? (
                      <>
                        <span className="ce-upload-filename">{formData.resume.name}</span>
                        <span>Click to change file</span>
                      </>
                    ) : (
                      <>
                        <span><strong>Click to upload</strong> or drag and drop</span>
                        <span>PDF  (Max 5MB)</span>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div className="ce-field">
              <label className="ce-label-row">
                Target Job Description
                <span className="ce-label-hint">Optional but recommended</span>
              </label>
              <textarea
                name="jobDescription"
                className="ce-textarea"
                placeholder="Paste the full job description here to enable gap analysis..."
                rows={4}
                value={formData.jobDescription}
                onChange={onChange}
                required
              />
            </div>

            <div className="ce-field">
              <label>About Yourself</label>
              <textarea
                name="selfDescription"
                className="ce-textarea"
                placeholder="Briefly describe your career goals or specific areas you want the AI to focus on..."
                rows={3}
                value={formData.selfDescription}
                onChange={onChange}
                required
              />
            </div>

            <div className="ce-form-footer">
              <button type="submit" disabled={loading} className="ce-btn-primary ce-btn-submit">
                {loading ? (
                  <>
                    <span className="ce-dot-pulse" /><span className="ce-dot-pulse" /><span className="ce-dot-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Initialize Analysis
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
