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
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';
import axios from "../Api/Axios";
import cookie from 'js-cookie';
let ser:any =""

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [mes, setMes] = useState('');

  // const { isPending, mutate } = useMutation({
  //   mutationKey: ["login_users"],
  //   mutationFn: async (loginDetails: LoginDetails) => {
  //     const response = await axiosInstance.post("/auth/login", loginDetails);
  //     return response.data;
  //   },_

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    cookie.set('name', identifier, { expires: 7 });
  
    setMes("Loading Please Wait...")
    ser ="success";

    try {
     const response =  await axios.post('/auth/login', { identifier, password });
     const UserId = JSON.parse(JSON.stringify(response.data.id));  
     cookie.set('id', UserId, { expires: 7 });  
     setLoading(true);
     if (response.status === 200) {
      navigate('/dashboard');
     }
     else{
      setError('Invalid credentials, please try again.');
     }
    
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
    finally{
      setLoading(false);
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
              <Alert severity={ser}>{mes}</Alert>

              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Username"
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

              <Button type="submit"
               disabled={isLoading}
               variant="contained"
                color="primary" 
                fullWidth size="large">
                {isLoading? "signing in.... " :"Sign In"}
          
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