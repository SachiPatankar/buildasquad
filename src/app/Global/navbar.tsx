"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MessageSquare, Bell, Menu, X } from "lucide-react"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and brand name */}
          <div className="flex items-center">
            <Link to="/projects" className="flex items-center gap-2">
              <img src={logo} alt="BuildASquad Logo" className="h-8 w-8 rounded-md" />
              <span className="ml-1 font-medium text-lg">BuildASquad</span>
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/projects" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
            <Link to="/people" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsMenuOpen(false)}>
              People
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-muted">
            <div className="flex items-center px-5 space-x-3">
              <Link to="/chat">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

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
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
