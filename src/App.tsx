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
import { XCircle } from 'lucide-react';
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
import { useQuery } from '@apollo/client';
import { LOAD_PENDING_FRIEND_REQUESTS } from '@/graphql';
import useNotificationStore from '@/stores/notificationStore';


function App() {
  // Theme is managed by ThemeProvider
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const { data } = useQuery(LOAD_PENDING_FRIEND_REQUESTS, { fetchPolicy: 'network-only' });
  useEffect(() => {
    if (data?.loadPendingFriendRequests) {
      setUnreadCount(data.loadPendingFriendRequests.length);
    }
  }, [data, setUnreadCount]);
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background">
          <ToastContainer 
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastClassName={({ type }) =>
              `bg-background border border-border text-foreground rounded-md shadow-lg p-4 flex items-center gap-3 ${
                type === 'error' ? 'border-destructive bg-destructive/10 text-destructive' : ''
              }`
            }
            className="text-sm"
            progressClassName="hidden"
            icon={({ type }) =>
              type === 'error' ? <XCircle className="text-destructive w-5 h-5 mr-2" /> : null
            }
            theme="auto"
          />
          <Routes>
            {/* ── Public Routes ───────────────────────────────────────── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
            <Route path="/oauth-callback" element={<OAuthCallback />} />

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
