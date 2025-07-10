import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/app/Global/navbar'

export default function Layout() {
  const location = useLocation();
  const isChat = location.pathname.startsWith('/chat');
  return (
    <>
      <Navbar />
      <div className={isChat ? 'md:pb-0' : 'pb-16 md:pb-0'}>
        <Outlet />
      </div>
    </>
  )
}
