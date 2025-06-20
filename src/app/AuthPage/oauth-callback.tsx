import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '@/stores/userAuthStore';
import { Loader2 } from 'lucide-react';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const error = searchParams.get('error');
  const token = searchParams.get('token');
  const userParam = searchParams.get('user');

  useEffect(() => {
    if (error) {
      console.error('OAuth error:', error);
      navigate(`/login?error=${encodeURIComponent('OAuth authentication failed')}`);
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        setAuth(token, user);
        navigate('/');
      } catch (err) {
        console.error('Error parsing user data:', err);
        navigate('/login?error=invalid_response');
      }
    } else {
      navigate('/login?error=missing_token');
    }
  }, [error, token, userParam, navigate, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Completing authentication...</p>
      </div>
    </div>
  );
}
