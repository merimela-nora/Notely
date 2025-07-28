import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../Api/Axios';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('/auth/register', {
        ...form,
      });

      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #fce4ec, #e3f2fd)',
        p: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, maxWidth: 550, width: '100%' }}>
        <Card sx={{ p: 4, borderRadius: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none' }}
                >
                  ← Back to Home
                </Button>
              </Box>

              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Create Your Account
              </Typography>

              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                required
                fullWidth
                value={form.firstName}
                onChange={handleChange}
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                required
                fullWidth
                value={form.lastName}
                onChange={handleChange}
              />
              <TextField
                name="username"
                label="Username"
                variant="outlined"
                required
                fullWidth
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                required
                fullWidth
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                required
                fullWidth
                value={form.password}
                onChange={handleChange}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth size="large">
                Submit
              </Button>
            </Stack>
          </form>
        </Card>
      </Paper>
    </Box>
  );
};

export default Register;
