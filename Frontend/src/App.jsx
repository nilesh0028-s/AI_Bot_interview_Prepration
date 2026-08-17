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

  if (loading) return <h4>Loading...</h4>

  return <RouterProvider router={router} />
}

export default App
