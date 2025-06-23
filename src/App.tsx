import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/app/Global/theme-provider"
import HomePage from "@/app/HomePage/home"
import PeoplePage from "@/app/HomePage/people"
import ProfilePage from "@/app/ProfilePage/profile"
import ChatPage from "@/app/ChatPage/chat"
import MyPostsPage from "@/app/MyPostsPage/my-posts"
import PostApplicantsPage from "@/app/MyPostsPage/post-applicants"
import CreatePostPage from "@/app/CreatePostPage/create-post"
import PostDetailPage from "@/app/PostDetailPage/post-detail"
import LoginPage from "./app/AuthPage/login"
import SignupPage from "./app/AuthPage/signup"
import ResetPasswordPage from "./app/AuthPage/reset-password"
import ForgotPasswordPage from "./app/AuthPage/forgot-password"
import OAuthCallbackPage from "@/app/AuthPage/oauth-callback"

import useAuthStore from "@/stores/userAuthStore"
import { useEffect } from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from "./app/Global/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"



function App() {
  // Theme is managed by ThemeProvider
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastClassName="bg-background border border-border text-foreground rounded-md shadow-lg p-4"
            progressClassName="!bg-primary"
          />
          <Routes>
            {/* ── Public Routes ───────────────────────────────────────── */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
            <Route path="/auth/callback" element={<OAuthCallbackPage />} />

            {/* ── Protected Routes with Layout ───────────────────────── */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Navigate to="projects" replace />} />
                <Route path="projects" element={<HomePage />} />
                <Route path="people" element={<PeoplePage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="profile" element={<ProfilePage />} />
                 <Route path="profile/me" element={<ProfilePage />} />
                <Route path="profile/:userId" element={<ProfilePage />} />
                <Route path="me" element={<ProfilePage />} />
                <Route path="myposts" element={<MyPostsPage />} />
                <Route path="myposts/:postId" element={<PostApplicantsPage />} />
                <Route path="post/new" element={<CreatePostPage />} />
                <Route path="post/:postId" element={<PostDetailPage />} />
                <Route path="post/:postId/edit" element={<CreatePostPage />} />
              </Route>
            </Route>
            
            {/* Redirect any unknown paths to home or login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
