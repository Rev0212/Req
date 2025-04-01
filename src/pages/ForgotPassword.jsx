import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Simulate API call
    setIsSent(true);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card sx={{ maxWidth: 450, width: '100%', p: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
            Enter your email and we'll send you instructions to reset your password
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {isSent && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset link has been sent to your email
            </Alert>
          )}
          
          {!isSent ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2, mb: 2 }}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <Button
              variant="outlined"
              fullWidth
              size="large"
              sx={{ mt: 2, mb: 2 }}
              onClick={() => setIsSent(false)}
            >
              Resend Email
            </Button>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Remember your password?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" component="span" color="primary">
                  Back to Login
                </Typography>
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ForgotPassword;