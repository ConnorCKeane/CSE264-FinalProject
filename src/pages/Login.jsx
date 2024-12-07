// src/pages/Login.jsx

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

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      navigate('/');
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
            Login
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
            onClick={handleLogin}
            style={{ backgroundColor: '#1DB954', color: '#FFFFFF' }}
          >
            Login
          </Button>
          <Typography variant="body1" align="center" style={{ marginTop: '20px', color: '#B3B3B3' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#1DB954' }}>Sign up</Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Login;