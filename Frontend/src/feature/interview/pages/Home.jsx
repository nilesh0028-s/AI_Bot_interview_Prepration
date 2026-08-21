import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import HowItWorks from '../component/HowItWorks'
import AnalysisForm from '../component/AnalysisForm'
import Footer from '../component/Footer'
import { generateReport } from '../service/interview.api'
import { fetchUserReports } from '../../redux/interview/interviewThunks'
import '../style/interview.scss'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ jobDescription: '', selfDescription: '', resume: null })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { reports, loading: reportsLoading } = useSelector(state => state.interview)

  useEffect(() => {
    dispatch(fetchUserReports())
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleFile = (e) => setFormData({ ...formData, resume: e.target.files[0] })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.resume) return alert('Please upload a resume PDF')
    setLoading(true)
    try {
      const data = new FormData()
      data.append('jobDescription', formData.jobDescription)
      data.append('selfDescription', formData.selfDescription)
      data.append('resume', formData.resume)
      const res = await generateReport(data)
      navigate(`/interview/${res.data.report._id}`)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ce-root">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <AnalysisForm
          formData={formData}
          onChange={handleChange}
          onFile={handleFile}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <section className="ce-reports">
          <div className="ce-container">
            <div className="ce-reports-header">
              <h2>My Recent Reports</h2>
              <span>{reports.length} report{reports.length !== 1 ? 's' : ''}</span>
            </div>
            {reportsLoading ? (
              <p className="ce-reports-empty">Loading...</p>
            ) : reports.length === 0 ? (
              <p className="ce-reports-empty">No reports yet. Generate your first one above.</p>
            ) : (
              <div className="ce-reports-grid">
                {reports.map((r) => (
                  <Link key={r._id} to={`/interview/${r._id}`} className="ce-report-card">
                    <div className="ce-report-card-top">
                      <span className="ce-report-title">{r.title}</span>
                      <span className="ce-report-score">{r.matchScore}%</span>
                    </div>
                    <p className="ce-report-jd">{r.jobDescription.slice(0, 100)}{r.jobDescription.length > 100 ? '...' : ''}</p>
                    <span className="ce-report-date">{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
