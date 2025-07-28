import {
  Card,
  Paper,
  TextField,
  Typography,
  Stack,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "../Api/Axios";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/auth/login', { identifier, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
        p: 2,
      }}
    >
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, maxWidth: 450, width: '100%' }}>
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Login to Notely
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Email or Username"
                variant="outlined"
                fullWidth
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                Submit
              </Button>

              <Typography variant="body2" textAlign="center">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Register
                </Link>
              </Typography>
            </Stack>
          </form>
        </Card>
      </Paper>
    </Box>
  );
};

export default Login;
