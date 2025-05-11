import { List, ListItem, ListItemButton, ListItemText, Divider, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Categories', path: '/categories' },
    { label: 'Products', path: '/products' },
    { label: 'Customer', path: '/customers' },
    { label: 'Suppliers', path: '/suppliers' },
    { label: 'Reviews', path: '/reviews' }
  ];

  return (
    <Box 
      sx={{ 
        width: 275,
        bgcolor: 'primary.main',
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        top: 64,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        color: 'white'
      }}
    >
      <Box sx={{ width: '100%', px: 3 }}>
        <List sx={{ width: '100%' }}>
          {menuItems.map(({ label, path }) => {
            const isSelected = currentPath === path;

            return (
              <ListItem 
                key={label} 
                disablePadding
                sx={{ 
                  mb: 3,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <ListItemButton 
                  component={Link} 
                  to={path}
                  selected={isSelected}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    py: 2,
                    px: 3,
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.light'
                    }
                  }}
                >
                  <ListItemText 
                    primary={label.toUpperCase()} 
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
