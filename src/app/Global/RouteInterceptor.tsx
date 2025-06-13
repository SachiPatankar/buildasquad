import { Outlet, Navigate } from 'react-router-dom'
import useAuthStore from '@/stores/userAuthStore'
import { Navbar } from '@/app/Global/navbar'

/**
 * Wraps all protected routes:
 * - if not logged in → redirect to /login
 * - otherwise → render Navbar + child <Outlet/>
 */
export default function RouteInterceptor() {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
