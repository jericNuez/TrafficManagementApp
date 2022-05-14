import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import loginImageBg from '../../assets/images/login-bg.jpg';
import './Login.css';
import { auth, provider } from '../../firebase.js';

function Login() {
  // Sign in with google
  const signin = () => {
    auth.signInWithPopup(provider).catch(alert);
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
      <Card sx={{ maxWidth: 300, textAlign: 'center' }}>
        <CardContent>
          <Typography
            sx={{ fontWeight: 'bold' }}
            variant="h5"
            gutterBottom
            component="div"
          >
            Welcome to Traffic Management App
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{ width: '100%', fontWeight: 'bold' }}
            color="error"
            startIcon={<GoogleIcon />}
            onClick={signin}
          >
            Sign-In with Google
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
