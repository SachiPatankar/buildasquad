import { Outlet } from 'react-router-dom'
import { Navbar } from '@/app/Global/navbar'

export default function Layout() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
