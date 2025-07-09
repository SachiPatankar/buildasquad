"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { MessageSquare, Bell} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "@/assets/buildasquad_logo.png"
import useAuthStore from '@/stores/userAuthStore'

export function Navbar() {
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const user = useAuthStore((state) => state.user)
  const photo = user?.photo;
  const fullName = user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : 'User';
  const initials = user ? ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() : 'UN';

  // Detect mobile size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <nav className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo and brand name (brand name hidden on mobile) */}
            <div className="flex items-center">
              <Link to="/projects" className="flex items-center gap-2">
                <img src={logo} alt="BuildASquad Logo" className="h-8 w-8 rounded-md" />
                <span className="ml-1 font-medium text-lg hidden md:inline">BuildASquad</span>
              </Link>
            </div>

            {/* Middle: Navigation links (hidden on mobile) */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/projects" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
                  Projects
                </Link>
                <Link to="/people" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
                  People
                </Link>
              </div>
            </div>

            {/* Right: Action icons and profile (hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/chat">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <ModeToggle />
              <UserMenu />
            </div>

            {/* Mobile: Action icons and user avatar menu (no hamburger) */}
            <div className="flex md:hidden items-center space-x-2">
              <Link to="/chat">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <ModeToggle />
              {/* Directly show user avatar as menu trigger */}
              <button
                className="relative h-8 w-8 rounded-full p-0 focus:outline-none"
                onClick={() => setIsMobileUserMenuOpen((v) => !v)}
                aria-label="Open user menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={photo || "/placeholder.svg?height=32&width=32"} alt={fullName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile user menu panel */}
      {isMobile && isMobileUserMenuOpen && (
        <MobileUserMenu onClose={() => setIsMobileUserMenuOpen(false)} />
      )}
      {/* Bottom navigation for mobile */}
      <BottomNav />
    </>
  )
}

// Update UserMenu to support avatarOnly prop
function UserMenu() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const user = useAuthStore((state) => state.user)

  const handleLogout = async () => {
    clearAuth() // This will also call backend logout
    navigate('/login')
  }

  const fullName = user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : 'User';
  const email = user?.email || 'user@example.com';
  const photo = user?.photo;
  const initials = user ? ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() : 'UN';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={photo || "/placeholder.svg?height=32&width=32"} alt={fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile/me">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/myposts">My Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-applications">My Applications</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/saved-posts">My Saved Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// MobileUserMenu: full-width panel for mobile user menu
function MobileUserMenu({ onClose }) {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const user = useAuthStore((state) => state.user)
  const fullName = user ? [user.first_name, user.last_name].filter(Boolean).join(' ') : 'User';
  const email = user?.email || 'user@example.com';
  const photo = user?.photo;
  const initials = user ? ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() : 'UN';

  const handleLogout = async () => {
    clearAuth()
    navigate('/login')
    onClose()
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-background border-t border-b border-muted shadow-lg animate-slide-down">
      <div className="flex items-center px-5 py-4 space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={photo || "/placeholder.svg?height=40&width=40"} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-base">{fullName}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
        <button className="ml-auto text-sm text-muted-foreground" onClick={onClose}>Close</button>
      </div>
      <div className="flex flex-col px-5 pb-4 space-y-2">
        <Link to="/profile/me" className="py-2" onClick={onClose}>My Profile</Link>
        <Link to="/myposts" className="py-2" onClick={onClose}>My Posts</Link>
        <Link to="/my-applications" className="py-2" onClick={onClose}>My Applications</Link>
        <Link to="/saved-posts" className="py-2" onClick={onClose}>My Saved Posts</Link>
        <button className="py-2 text-left" onClick={onClose}>Settings</button>
        <button className="py-2 text-left text-red-600" onClick={handleLogout}>Sign out</button>
      </div>
    </div>
  )
}

// New BottomNav component for mobile
function BottomNav() {
  const location = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-muted flex justify-around items-center h-14 md:hidden">
      <Link to="/projects" className={`flex flex-col items-center justify-center px-2 ${location.pathname === '/projects' ? 'text-primary' : 'text-muted-foreground'}`}> 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4M8 3v4M4 11h16" /></svg>
        <span className="text-xs">Projects</span>
      </Link>
      <Link to="/people" className={`flex flex-col items-center justify-center px-2 ${location.pathname === '/people' ? 'text-primary' : 'text-muted-foreground'}`}> 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
        <span className="text-xs">People</span>
      </Link>
    </nav>
  )
}
