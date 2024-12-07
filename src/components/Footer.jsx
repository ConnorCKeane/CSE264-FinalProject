// src/components/Footer.jsx

import React from 'react';
import { Container } from '@mui/material';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        backgroundColor: 'black', // Spotify's black color
        color: '#FFFFFF',
        padding: '20px 0',
        position: 'relative',
        bottom: 0,
        left: 0,
        minHeight: '100px',
      }}
    >
      <Container>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {/* Project Information */}
          <div>
            <h5 style={{ color: '#1DB954' }}>Lehigh Music Rank</h5>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          {/* Team Members */}
          <div>
            <h5 style={{ color: '#1DB954' }}>Team Members</h5>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>Amanda Mertz</li>
              <li>Evan Trock</li>
              <li>Connor Keane</li>
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h5 style={{ color: '#1DB954' }}>Technologies Used</h5>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <li>React</li>
              <li>Material UI</li>
              <li>Supabase</li>
              <li>Spotify API</li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;