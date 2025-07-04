// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '@/stores/userAuthStore';
// import { Loader2 } from 'lucide-react';

// export default function OAuthCallback() {
//   const navigate = useNavigate();
//   const initialize = useAuthStore((state) => state.initialize);

//   useEffect(() => {
//     const handleOAuthCallback = async () => {
//       // Check if there's an error in the URL params
//       const urlParams = new URLSearchParams(window.location.search);
//       const error = urlParams.get('error');
      
//       if (error) {
//         // Handle OAuth errors
//         let errorMessage = 'Authentication failed';
//         switch (error) {
//           case 'oauth_failed':
//             errorMessage = 'OAuth authentication failed';
//             break;
//           case 'token_error':
//             errorMessage = 'Token generation failed';
//             break;
//           default:
//             errorMessage = 'Authentication error occurred';
//         }
//         navigate(`/login?error=${encodeURIComponent(errorMessage)}`);
//         return;
//       }

//       // If no error, the backend should have set HTTP-only cookies
//       // Call initialize to fetch user info using the cookies
//       try {
//         await initialize();
//         navigate('/projects');
//       } catch (error) {
//         console.error('Failed to initialize after OAuth:', error);
//         navigate('/login?error=initialization_failed');
//       }
//     };

//     handleOAuthCallback();
//   }, [navigate, initialize]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//         <p>Completing authentication...</p>
//       </div>
//     </div>
//   );
// }

// Frontend OAuth Callback Component
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/userAuthStore';
import { Loader2 } from 'lucide-react';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get('error');
      const success = urlParams.get('success');
      const accessToken = urlParams.get('accessToken');
      const userParam = urlParams.get('user');
      
      if (error) {
        // Handle OAuth errors
        let errorMessage = 'Authentication failed';
        switch (error) {
          case 'oauth_failed':
            errorMessage = 'OAuth authentication failed';
            break;
          case 'token_error':
            errorMessage = 'Token generation failed';
            break;
          default:
            errorMessage = 'Authentication error occurred';
        }
        navigate(`/login?error=${encodeURIComponent(errorMessage)}`);
        return;
      }

      // Handle successful OAuth
      if (success === 'true' && accessToken && userParam) {
        try {
          // Parse user data from URL parameter
          const user = JSON.parse(decodeURIComponent(userParam));
          
          // Set auth in Zustand store
          setAuth(accessToken, user);
          
          // Navigate to projects page
          navigate('/projects');
        } catch (parseError) {
          console.error('Failed to parse user data:', parseError);
          navigate('/login?error=data_parse_failed');
        }
      } else {
        // If no success parameters, try to initialize with cookies
        // This is fallback in case cookies are set but URL params aren't
        try {
          const initialize = useAuthStore.getState().initialize;
          await initialize();
          navigate('/projects');
        } catch (error) {
          console.error('Failed to initialize after OAuth:', error);
          navigate('/login?error=initialization_failed');
        }
      }
    };

    handleOAuthCallback();
  }, [navigate, setAuth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Completing authentication...</p>
      </div>
    </div>
  );
}