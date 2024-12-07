// src/components/LoginButton.jsx

import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        backgroundColor: '#1DB954',
        color: '#FFFFFF',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '25px',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      Login with Spotify
    </button>
  );
};

export default LoginButton;