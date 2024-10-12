import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Styled components
const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  margin: '0 auto',
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      transition: 'all 0.3s ease',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6a1b9a 30%, #ff6f00 90%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #7b1fa2 30%, #ff8f00 90%)',
  },
  transition: 'all 0.3s ease',
}));

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      setLoading(false);

      // Save the username in localStorage
      localStorage.setItem('user', JSON.stringify({ ...data }));

      // SweetAlert for successful login with timer (2 seconds) and no "OK" button
      Swal.fire({
        title: 'Login Successful',
        text: 'Welcome back!',
        icon: 'success',
        timer: 2000, // 2 seconds
        showConfirmButton: false, // No OK button
        willClose: () => {
          navigate('/'); // Redirect to home after the alert closes
        },
      });
    } catch (error) {
      setLoading(false);

      // SweetAlert for failed login with timer (2 seconds) and no "OK" button
      Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        icon: 'error',
        timer: 2000, // 2 seconds
        showConfirmButton: false, // No OK button
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Set body styles for background image
    document.body.style.margin = '0';
    document.body.style.height = '100vh';
    document.body.style.backgroundImage =
      'url("https://www.shutterstock.com/shutterstock/photos/2434240523/display_1500/stock-photo-businessman-hand-mobile-phone-with-mobile-banking-2434240523.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <CssBaseline />
      <StyledContainer>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={submitHandler}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <CircularProgress sx={{ mt: 3, mb: 2 }} />
          ) : (
            <StyledButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
              Sign In
            </StyledButton>
          )}

          <NavLink
            to="/signup"
            style={{
              marginTop: '16px',
              textDecoration: 'underline',
              color: '#3f51b5',
            }}
          >
            {"Don't have an account? Sign Up"}
          </NavLink>
        </form>
      </StyledContainer>
    </Container>
  );
};

export default LoginPage;

