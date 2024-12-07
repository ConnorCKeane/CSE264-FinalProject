// src/components/Header.jsx

import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import supabase from '../supabaseClient';

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const linkStyle = (isActive) => ({
    display: 'inline-block',
    color: isActive ? '#1DB954' : '#FFFFFF',
    fontSize: 18,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: isActive ? 'bold' : '500',
    lineHeight: '30px',
    textDecoration: 'none',
    margin: '0 30px',
    transition: 'font-size 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div
      style={{
        width: '100%',
        height: '80px',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        paddingLeft: '20px',
        paddingRight: '20px',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Left side logo */}
      <div style={{ display: 'flex', alignItems: 'center', width: '200px', flexShrink: 0 }}>
        <img src="/spotify-logo.png" alt="Spotify Logo" style={{ height: '50px' }} />
      </div>

      {/* Center navigation links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: 'auto',
        }}
      >
        <NavLink to="/search" style={({ isActive }) => linkStyle(isActive)}>
          Search
        </NavLink>

        <NavLink to="/" style={({ isActive }) => linkStyle(isActive)}>
          Home
        </NavLink>

        <NavLink to="/about" style={({ isActive }) => linkStyle(isActive)}>
          About Us
        </NavLink>
      </div>

      {/* Right side */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '200px',
          justifyContent: 'flex-end',
          flexShrink: 0,
        }}
      >
        {user ? (
          <>
            <NavLink to="/profile" style={({ isActive }) => linkStyle(isActive)}>
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #FFFFFF',
                borderRadius: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" style={({ isActive }) => linkStyle(isActive)}>
              Login
            </NavLink>
            <NavLink to="/signup" style={({ isActive }) => linkStyle(isActive)}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;