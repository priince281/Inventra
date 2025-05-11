import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Box, Button, Card, CardContent, Checkbox, 
  FormControlLabel, Radio, RadioGroup, TextField, 
  Typography, Avatar, CircularProgress 
} from '@mui/material';
import { Lock } from '@mui/icons-material';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: 'admin@inventra.com',
    password: 'admin123',
    role: 'admin',
    remember: true
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock authentication - no API call
    setTimeout(() => {
      if (formData.email === 'admin@inventra.com' && formData.password === 'admin123') {
        login(formData.role, formData.remember);
        navigate(location.state?.from?.pathname || '/');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: 450, p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
<Box sx={{ 
  width: 120,  // Adjust based on your logo size
  height: 120, // Adjust based on your logo size
  mb: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <img 
    src="/logo.png" 
    alt="INVENTRA Logo" 
    style={{ 
      maxWidth: '200%',
      maxHeight: '200%',
      objectFit: 'contain' 
    }} 
  />
</Box>
          <Typography variant="h5">INVENTRA LOGIN</Typography>
        </Box>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{ my: 2 }}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
            }
            label="Remember me"
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
      </Card>
    </Box>
  );
}