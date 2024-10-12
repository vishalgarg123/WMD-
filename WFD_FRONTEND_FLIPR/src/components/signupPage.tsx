
import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';  // Import AxiosError for proper error typing
import Swal from 'sweetalert2';  // Import SweetAlert2

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

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password,
      });

      // Show SweetAlert2 success message with 2-second timer
      Swal.fire({
        title: 'Success!',
        text: `Registration successful, Welcome ${response.data.username}`,  // Display the user's name
        icon: 'success',
        showConfirmButton: false,  // Remove the "OK" button
        timer: 2000,  // Display for 2 seconds
      }).then(() => {
        // Redirect after 2 seconds
        navigate('/signin');
      });
    } catch (error: AxiosError) {
      // Handle Axios error correctly with proper typing
      let errorMessage = 'Something went wrong';
      if (error.response) {
        console.error('Error Response Data:', error.response.data); // Debug server response
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        console.error('Error Request:', error.request); // Debug request error
        errorMessage = 'No response from server. Check your connection.';
      } else {
        console.error('Error Message:', error.message); // Debug other errors
        errorMessage = 'Error: ' + error.message;
      }

      // Show SweetAlert2 error message
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

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
          SignUp
        </Typography>
        <form onSubmit={handleSignup}>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type="submit" fullWidth sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Signup'}
          </StyledButton>
        </form>
      </StyledContainer>
    </Container>
  );
};

export default SignupPage;
