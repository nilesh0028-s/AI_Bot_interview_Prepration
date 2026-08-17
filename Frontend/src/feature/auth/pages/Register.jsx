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
    <div className="auth-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card card p-4 shadow">
        <h4 className="text-center mb-4">Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary w-100">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
