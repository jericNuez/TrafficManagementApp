import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from '@mui/material';
import loginImageBg from '../../assets/images/login-bg.jpg';
import './Register.css';
import { auth } from '../../firebase.js';
import tmsLogo from '../../assets/images/tms-topbar-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const signUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Password does not matched!');
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch((err) => {
          setError(err.message.replace('Firebase', 'Error'));
        });
    }
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
          position: 'absolute',
          width: 300,
          height: '100vh',
          textAlign: 'center',
          borderRadius: 0,
          right: 0,
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
          <form onSubmit={signUp} autoComplete="off">
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
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Stack>
            <Button
              sx={{ width: '100%', fontWeight: 'bold', mt: 2 }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Sign-Up
            </Button>
          </form>
        </CardContent>
        <CardActions>
          <Button
            sx={{ width: '100%', fontWeight: 'bold', mx: 1 }}
            color="primary"
            variant="outlined"
            onClick={() => navigate('/login', { replace: true })}
          >
            Sign-In
          </Button>
        </CardActions>
      </Card>
      <div className="copyright-container-register">
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

export default Register;
