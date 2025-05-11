import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        403 - Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You don't have permission to access this page
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}
        sx={{ mr: 2 }}
      >
        Go Back
      </Button>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
      >
        Return Home
      </Button>
    </Box>
  );
}