import { Box, Typography, Paper, Grid } from '@mui/material';
import { CalendarToday, Inventory, People, LocalShipping } from '@mui/icons-material';

export default function Dashboard() {
  // Mock user data - replace with actual user data from your auth system
  const currentUser = {
    name: "Ameer",
    role: "Admin"
  };

  // Mock stats data
  const stats = [
    { title: "Total Products", value: 124, icon: <Inventory fontSize="large" /> },
    { title: "Active Customers", value: 89, icon: <People fontSize="large" /> },
    { title: "Pending Orders", value: 16, icon: <LocalShipping fontSize="large" /> },
    { title: "Today's Tasks", value: 5, icon: <CalendarToday fontSize="large" /> }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Welcome Section */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 10,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: 3
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Welcome back, {currentUser.name}!
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {currentUser.role} Dashboard • {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Typography>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={4}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ 
              p: 3, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              borderLeft: `4px solid`,
              borderColor: 'primary.main'
            }}>
              <Box sx={{ 
                color: 'primary.main',
                mb: 5
              }}>
                {item.icon}
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Paper elevation={0} sx={{ 
        p: 5, 
        mt: 4,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Recent Activity
        </Typography>
        <Typography color="text.secondary">
          Your system is running smoothly. No pending actions required.
        </Typography>
      </Paper>
    </Box>
  );
}