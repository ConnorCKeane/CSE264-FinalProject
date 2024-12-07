// src/pages/Signup.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful! Please check your email for confirmation.');
      navigate('/login');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <Container maxWidth="sm" style={{ paddingTop: '100px' }}>
        <Box
          sx={{
            backgroundColor: '#181818',
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
            Sign Up
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: '#FFFFFF', borderRadius: 4 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            style={{ marginBottom: '20px', backgroundColor: '#FFFFFF', borderRadius: 4 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            style={{ backgroundColor: '#1DB954', color: '#FFFFFF' }}
          >
            Sign Up
          </Button>
          <Typography variant="body1" align="center" style={{ marginTop: '20px', color: '#B3B3B3' }}>
            Already have an account? <Link to="/login" style={{ color: '#1DB954' }}>Log in</Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;