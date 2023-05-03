import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './Authorize'

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()

  return (
      isAuthenticated() ? <Outlet/> : <Navigate to="/login" />
  )
}

export default PrivateRoutes