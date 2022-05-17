import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import loginImageBg from '../../assets/images/login-bg.jpg';
import './Login.css';
import { auth, provider } from '../../firebase.js';
import tmsLogo from '../../assets/images/tms-topbar-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // Sign in with google
  const signinWithGoogle = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        setError('Login Error: Incorrect Email or Password');
      });
  };

  const signUp = () => {
    navigate('/sign-up', { replace: true });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginImageBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="login-container"
    >
      <Card
        sx={{
          maxWidth: 300,
          height: '100vh',
          textAlign: 'center',
          borderRadius: 0,
        }}
      >
        <CardContent>
          <img alt="tmsLogo" src={tmsLogo} />
        </CardContent>
        {error && (
          <Alert sx={{ mx: 2 }} severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <CardContent>
          <form onSubmit={signIn} autoComplete="off">
            <Stack spacing={2}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Stack>
            <Button
              sx={{ width: '100%', fontWeight: 'bold', mt: 2 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign-In
            </Button>

            <Button
              sx={{ width: '100%', fontWeight: 'bold', mt: 2 }}
              color="primary"
              variant="outlined"
              onClick={signUp}
            >
              Sign-Up
            </Button>
          </form>
        </CardContent>
        <center>
          <b>OR</b>
        </center>
        <CardActions>
          <Button
            sx={{ width: '100%', fontWeight: 'bold', mx: 1, mt: 2 }}
            color="error"
            startIcon={<GoogleIcon />}
            variant="contained"
            onClick={signinWithGoogle}
          >
            Sign-In with Google
          </Button>
        </CardActions>
      </Card>
      <div className="copyright-container">
        <div>
          <small>Traffic Management App</small>
        </div>
        <div>
          <small>&copy; 2022</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
