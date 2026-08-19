import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../auth.scss'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/auth/authThunks'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(registerUser(formData))
    if (registerUser.fulfilled.match(result)) {
      navigate('/')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="auth-logo-icon">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <span>Cognitive Edge</span>
        </div>

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Start your AI-powered interview prep today</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="auth-label">Username</label>
            <input
              type="text"
              name="username"
              className="auth-input"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="auth-label">Email</label>
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="auth-btn mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider" />
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  )
}
