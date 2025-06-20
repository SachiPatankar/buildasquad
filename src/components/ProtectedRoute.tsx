import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/userAuthStore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
  const { token, initialize, isInitialized } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

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

  if (!token) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
