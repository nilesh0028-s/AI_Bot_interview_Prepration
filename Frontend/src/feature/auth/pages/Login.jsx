import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../auth.scss'
import { loginUser } from '../../redux/auth/authThunks'
import { useDispatch, useSelector } from 'react-redux'




export default function Login() {
  const navigate= useNavigate()
  
  const dispatch = useDispatch()
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
    <div className="auth-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card card p-4 shadow">
        <h4 className="text-center mb-4">Login</h4>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
