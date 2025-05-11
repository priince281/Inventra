import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';

export default function TopBar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: '100%',
                bgcolor: 'white',
                color: 'text.primary',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/logo.png" // Path to logo in public folder
                            alt="INVENTRA Logo"
                            style={{
                                height: 50, // Adjust height as needed
                                maxWidth: 180, // Prevent overflow
                            }}
                        />
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<Logout />}
                    sx={{
                        color: 'primary.main',
                        borderColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                        },
                    }}
                    onClick={() => {
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('userRole');
                        window.location.href = '/login';
                    } /* Redirect to login page */}
                >
                    Sign Out
                </Button>
            </Toolbar>
        </AppBar>
    );
}