import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  Typography,
  Toolbar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menu = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'New Requirement',
      icon: <NoteAddIcon />,
      path: '/requirement-input'
    },
    {
      text: 'Analytics',
      icon: <EqualizerIcon />,
      path: '/analytics'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #6200ea 0%, #3700b3 100%)',
          color: 'white',
          boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
          paddingTop: 0, // Remove any top padding
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Add toolbar component to create space equivalent to AppBar height */}
      <Toolbar />
      
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        mb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AutoAwesomeIcon sx={{ mr: 1, fontSize: 32, color: '#ffab00' }} />
          <Typography variant="h5" fontWeight="bold">Req Extract</Typography>
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          AI-Powered Requirement Management
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      <List sx={{ px: 1 }}>
        {menu.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mt: 'auto' }} />
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={onLogout}
            sx={{
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;