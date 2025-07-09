import { Outlet } from 'react-router-dom'
import { Navbar } from '@/app/Global/navbar'

export default function Layout() {

  return (
    <>
      <Navbar />
      <div className="pb-16 md:pb-0">
        <Outlet />
      </div>
    </>
  )
}
