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

import RouteInterceptor from "./app/Global/RouteInterceptor"

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <Routes>
            {/* ── Public ─────────────────────────────────────────── */}
            <Route path="/login"           element={<LoginPage />} />
            <Route path="/signup"          element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password"  element={<ResetPasswordPage />} />

            {/* ── Protected (everything else) ───────────────────── */}
            <Route path="/*" element={<RouteInterceptor />}>
              {/* root → projects */}
              <Route index element={<Navigate to="projects" replace />} />

              <Route path="projects"         element={<HomePage />} />
              <Route path="people"           element={<PeoplePage />} />
              <Route path="chat"             element={<ChatPage />} />
              <Route path="profile"          element={<ProfilePage />} />
              <Route path="profile/:userId"  element={<ProfilePage />} />
              <Route path="me"               element={<ProfilePage />} />
              <Route path="myposts"          element={<MyPostsPage />} />
              <Route path="myposts/:postId"  element={<PostApplicantsPage />} />
              <Route path="post/new"         element={<CreatePostPage />} />
              <Route path="post/:postId"     element={<PostDetailPage />} />
              <Route path="post/:postId/edit" element={<CreatePostPage />} />
            </Route>

            {/* any other path → go to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
