import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



export default function Protectedroute({ children }) {
  const { user, loading} = useSelector((state) => state.auth)

  if (loading) {
    return <h1>loading</h1>
  }

  if (!user) {
    return <Navigate to="/login"/>
  }

  return <>{children}</>
}
