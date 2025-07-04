// import { Navigate, Outlet } from 'react-router-dom';
// import useAuthStore from '@/stores/userAuthStore';
// import { useEffect, useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { jwtDecode } from 'jwt-decode';

// const isTokenValid = (token: string | null) => {
//   if (!token) return false;
//   try {
//     const decoded: any = jwtDecode(token);
//     if (!decoded.exp) return false;
//     return decoded.exp * 1000 > Date.now();
//   } catch {
//     return false;
//   }
// };

// const ProtectedRoute = () => {
//   const { token, initialize, isInitialized } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       if (!isInitialized) {
//         await initialize();
//       }
//       setIsLoading(false);
//     };
    
//     initAuth();
//   }, [initialize, isInitialized]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!isTokenValid(token)) {
//     return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/userAuthStore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { isAuthenticated, initialize, isInitialized } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      if (!isInitialized) {
        await initialize();
      }
      setIsLoading(false);
    };
    
    initAuth();
  }, [initialize, isInitialized]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <Navigate 
        to="/login" 
        replace 
        state={{ from: location.pathname }} 
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;