import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
import HeroSection from '../component/HeroSection'
import HowItWorks from '../component/HowItWorks'
import AnalysisForm from '../component/AnalysisForm'
import Footer from '../component/Footer'
import { generateReport } from '../service/interview.api'
import '../style/interview.scss'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    jobDescription: '',
    selfDescription: '',
    resume: null
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] })
  }

  const navigate = useNavigate()

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
      </main>
      <Footer />
    </div>
  )
}
