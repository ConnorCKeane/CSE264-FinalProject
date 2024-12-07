// src/components/Callback.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the hash from the URL
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const expiresIn = params.get('expires_in');

      if (accessToken) {
        // Save the token in localStorage or state management
        localStorage.setItem('spotify_access_token', accessToken);
        localStorage.setItem('spotify_token_expiry', Date.now() + expiresIn * 1000);

        // Redirect to your main app
        navigate('/');
      } else {
        // Handle error
        console.error('Access token not found in URL hash');
      }
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default Callback;