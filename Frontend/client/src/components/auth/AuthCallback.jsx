import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/loginSlice';

const AuthCallback = () => {
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userId = searchParams.get('userId');
    const error = searchParams.get('error');
    const email = searchParams.get('email');

    if (error) {
      console.error('Authentication failed:', error);
      navigate('/login?error=authentication_failed');
      return;
    }

    if (accessToken && refreshToken && userId) {
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', userId);
      if (email) localStorage.setItem('email', email);

      // Update Redux state
      dispatch(setCredentials({
        user: { id: userId, email },
        accessToken,
        refreshToken
      }));

      // Redirect to dashboard or home page
      navigate('/');
    } else {
      console.error('Missing authentication tokens');
      navigate('/login?error=missing_tokens');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback; 