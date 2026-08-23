import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../auth.scss'
import { loginUser } from '../../redux/auth/authThunks'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser(formData))
    if (loginUser.fulfilled.match(result)) {
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

        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in to continue your interview prep</p>

        {error && <div className="auth-error"><span className="material-symbols-outlined">error</span>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
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
          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-divider" />
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

      </div>
    </div>
  )
}
