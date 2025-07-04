// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '@/stores/userAuthStore';
// import { Loader2 } from 'lucide-react';

// export default function OAuthCallback() {
//   const navigate = useNavigate();
//   const setAuth = useAuthStore((state) => state.setAuth);

//   useEffect(() => {
//     // Extract token from URL hash (e.g. #token=...)
//     const hash = window.location.hash;
//     const params = new URLSearchParams(hash.replace(/^#/, ''));
//     const token = params.get('token');
//     if (token) {
//       setAuth(token, null); // User info will be fetched on initialize
//       navigate('/');
//     } else {
//       navigate('/login?error=missing_token');
//     }
//   }, [navigate, setAuth]);

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
//         <p>Completing authentication...</p>
//       </div>
//     </div>
//   );
// }
