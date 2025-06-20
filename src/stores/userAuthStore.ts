// src/stores/userAuthStore.ts
import { getMe } from '@/api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  _id: string
  email: string
  first_name?: string
  last_name?: string
  photo?: string
}

interface AuthState {
  token: string | null
  user: User | null
  isInitialized: boolean
  initialize: () => Promise<void>
  setAuth: (token: string, user: User | null) => void
  clearAuth: () => void
}


const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isInitialized: false,
      initialize: async () => {
        const { token, user } = get()
        
        // If we already have a user and token, consider it initialized
        if (token && user) {
          set({ isInitialized: true })
          return
        }
        
        // If no token, clear and mark as initialized
        if (!token) {
          set({ isInitialized: true })
          return
        }
        
        try {
          const res = await getMe()
          set({ user: res.data, isInitialized: true })
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          get().clearAuth()
          set({ isInitialized: true })
        }
      },
      setAuth: (token, user) => set({ token, user, isInitialized: true }),
      clearAuth: () => set({ token: null, user: null, isInitialized: true }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        // Don't persist isInitialized
      }),
    }
  )
)


export default useAuthStore
