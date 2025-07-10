// // src/stores/userAuthStore.ts
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// export interface User {
//   _id: string
//   email: string
//   first_name?: string
//   last_name?: string
//   photo?: string
// }

// interface AuthState {
//   token: string | null
//   user: User | null
//   isInitialized: boolean
//   initialize: () => Promise<void>
//   setAuth: (token: string, user: User | null) => void
//   clearAuth: () => void
// }


// const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       token: null,
//       user: null,
//       isInitialized: false,
//       initialize: async () => {
//         const { token, user } = get()
        
//         // If we already have a user and token, consider it initialized
//         if (token && user) {
//           set({ isInitialized: true })
//           return
//         }
        
//         // If no token, clear and mark as initialized
//         if (!token) {
//           set({ isInitialized: true })
//           return
//         }
        
//         // No getMe logic for now
//         set({ isInitialized: true })
//       },
//       setAuth: (token, user) => {
//         set({ token, user, isInitialized: true });
//       },
//       clearAuth: () => {
//         set({ token: null, user: null, isInitialized: true });
//         // Call backend to clear refresh token
//         fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
//           method: 'POST',
//           credentials: 'include',
//         });
//       },
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({ 
//         token: state.token, 
//         user: state.user,
//         // Don't persist isInitialized
//       }),
//     }
//   )
// )


// export default useAuthStore

// src/stores/userAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

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
  isAuthenticated: () => boolean
  isTokenValid: () => boolean
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isInitialized: false,
      
      initialize: async () => {
        const { token, isTokenValid } = get()
        
        // If token exists and is valid, try to get user info
        if (token && isTokenValid()) {
          try {
            // Import api here to avoid circular dependency
            const { getMe } = await import('@/api/index')
            const response = await getMe()
            set({ 
              user: {
                _id: response.data.user.id || response.data.user._id,
                email: response.data.user.email,
                first_name: response.data.user.first_name,
                last_name: response.data.user.last_name,
                photo: response.data.user.photo,
              }, 
              isInitialized: true 
            })
          } catch (error) {
            console.error('Failed to get user info:', error)
            // Token might be invalid, clear auth
            set({ token: null, user: null, isInitialized: true })
          }
        } else {
          // No valid token, clear auth
          set({ token: null, user: null, isInitialized: true })
        }
      },
      
      setAuth: (token, user) => {
        set({ 
          token, 
          user: user ? {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            _id: user._id || user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            photo: user.photo,
          } : null, 
          isInitialized: true 
        })
      },
      
      clearAuth: () => {
        set({ token: null, user: null, isInitialized: true })
        
        // Call backend to clear refresh token (fire and forget)
        fetch(`${import.meta.env.VITE_API_URL}/v1/auth/logout`, {
          method: 'POST',
          credentials: 'include',
        }).catch(console.error)
      },
      
      isAuthenticated: () => {
        const { token, isTokenValid } = get()
        return token !== null && isTokenValid()
      },
      
      isTokenValid: () => {
        const { token } = get()
        if (!token) return false
        
        try {
          const decoded: any = jwtDecode(token)
          if (!decoded.exp) return false
          // Add 30 seconds buffer to account for network delays
          return decoded.exp * 1000 > Date.now() + 60000
        } catch {
          return false
        }
      },
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