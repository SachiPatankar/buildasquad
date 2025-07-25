import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
// import OAuthCallbackPage from "@/app/AuthPage/oauth-callback"

import useAuthStore from "@/stores/userAuthStore"
import { useEffect } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Layout from "./app/Global/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import SavedPostsPage from "./app/SavedPostPage/saved-posts"
import MyApplicationsPage from "./app/MyApplicationsPage/my-applications"
import NotificationsPage from "./app/NotificationsPage/page"
import ContactsPage from "./app/ChatPage/contacts"
import ContactsRequestsPage from "./app/ChatPage/contacts-requests"
import OAuthCallback from "./app/AuthPage/oauth-callback"
import LandingPage from "./app/LandingPage/page"
import PrivacyPolicyPage from "./app/Global/privacy-policy"
import TermsOfServicePage from "./app/Global/terms-of-service"
import useSocket from "./hooks/useSocket"


function App() {
  // Theme is managed by ThemeProvider
  useSocket()
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <ToastContainer 
            position="top-right"
            autoClose={4000}
            hideProgressBar
          />
          <Routes>
            {/* ── Public Routes ───────────────────────────────────────── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />

            {/* ── Protected Routes with Layout ───────────────────────── */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                {/* <Route index element={<Navigate to="projects" replace />} /> */}
                <Route path="projects" element={<HomePage />} />
                <Route path="people" element={<PeoplePage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="chat/:chatId" element={<ChatPage />} />
                <Route path="profile" element={<ProfilePage />} />
                 <Route path="profile/me" element={<ProfilePage />} />
                <Route path="profile/:userId" element={<ProfilePage />} />
                <Route path="me" element={<ProfilePage />} />
                <Route path="myposts" element={<MyPostsPage />} />
                <Route path="myposts/:postId" element={<PostApplicantsPage />} />
                <Route path="post/new" element={<CreatePostPage />} />
                <Route path="post/edit/:postId" element={<CreatePostPage />} />
                <Route path="post/:postId" element={<PostDetailPage />} />
                <Route path="post/:postId/edit" element={<CreatePostPage />} />
                <Route path="saved-posts" element={<SavedPostsPage />} />
                <Route path="my-applications" element={<MyApplicationsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="contacts/requests" element={<ContactsRequestsPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                
              </Route>
            </Route>
            
            {/* Redirect any unknown paths to home or login */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
