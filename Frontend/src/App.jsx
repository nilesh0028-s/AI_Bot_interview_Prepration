import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.route.jsx'
import { fetchMe } from './feature/redux/auth/authThunks'

function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(fetchMe())
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#111125', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #28283d', borderTop: '3px solid #bec2ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  return <RouterProvider router={router} />
}

export default App
