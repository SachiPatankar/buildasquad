import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/app/Global/theme-provider"
import { Navbar } from "@/app/Global/navbar"
import HomePage from "@/app/HomePage/home"
import PeoplePage from "@/app/HomePage/people"
import ProfilePage from '@/app/ProfilePage/profile'
import ChatPage from '@/app/ChatPage/chat'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

