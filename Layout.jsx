import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <TopBar />
      
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 346px)` },
          ml: { sm: '346px' },
          mt: '64px',
          p: 4,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {/* Content container with max width */}
        <Box sx={{ 
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}