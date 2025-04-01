import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Badge, 
  Avatar,
  InputBase,
  alpha,
  Tooltip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Header = ({ title }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'white',
        color: '#333',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {title === 'Dashboard' && (
            <AutoAwesomeIcon sx={{ mr: 1, color: '#ffab00' }} />
          )}
          {title}
        </Typography>
        
        <Box 
          sx={{ 
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha('#000', 0.04),
            '&:hover': {
              backgroundColor: alpha('#000', 0.08),
            },
            mr: 2,
            width: '300px',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <Box 
            sx={{ 
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search requirements..."
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: '8px 8px 8px 48px',
              },
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              sx={{ 
                backgroundColor: alpha('#000', 0.04),
                mr: 1,
                '&:hover': { backgroundColor: alpha('#000', 0.08) }
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Help">
            <IconButton 
              color="inherit"
              sx={{ 
                backgroundColor: alpha('#000', 0.04),
                mr: 1,
                '&:hover': { backgroundColor: alpha('#000', 0.08) }
              }}
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
          
          <Avatar 
            sx={{ 
              bgcolor: '#6200ea',
              cursor: 'pointer',
              '&:hover': { 
                boxShadow: '0 0 0 2px #b388ff'
              }
            }}
            alt="User"
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
