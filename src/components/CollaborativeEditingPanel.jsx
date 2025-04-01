import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

const CollaborativeEditingPanel = ({ documentTitle }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  
  // Simulate users joining the editing session
  useEffect(() => {
    const users = [
      { id: 1, name: 'John Doe', avatar: 'J', color: '#1976d2', active: true },
      { id: 2, name: 'Sarah Smith', avatar: 'S', color: '#388e3c', active: false },
      { id: 3, name: 'Mike Johnson', avatar: 'M', color: '#d32f2f', active: false }
    ];
    
    // Initially show no users
    setActiveUsers([]);
    
    // First user joins after 1.5 seconds
    const timer1 = setTimeout(() => {
      setActiveUsers([users[0]]);
      setNotification({
        message: `${users[0].name} joined the document`,
        severity: 'info'
      });
    }, 1500);
    
    // Second user joins after 4 seconds
    const timer2 = setTimeout(() => {
      setActiveUsers(prev => [...prev, users[1]]);
      setNotification({
        message: `${users[1].name} joined the document`,
        severity: 'info'
      });
    }, 4000);
    
    // Show typing indicator after 7 seconds
    const timer3 = setTimeout(() => {
      setActiveUsers(prev => 
        prev.map(user => 
          user.id === 1 ? { ...user, typing: true } : user
        )
      );
    }, 7000);
    
    // Stop typing after 10 seconds
    const timer4 = setTimeout(() => {
      setActiveUsers(prev => 
        prev.map(user => 
          user.id === 1 ? { ...user, typing: false } : user
        )
      );
    }, 10000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f8ff',
        border: '1px solid #e0e7ff',
        borderRadius: 1,
        p: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
            Collaborating on: <strong>{documentTitle}</strong>
          </Typography>
          
          {activeUsers.some(u => u.typing) && (
            <Chip 
              label="Someone is typing..." 
              size="small" 
              color="primary" 
              variant="outlined"
              sx={{ 
                animation: 'pulse 1.5s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 0.6 },
                  '50%': { opacity: 1 },
                  '100%': { opacity: 0.6 }
                }
              }}
            />
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AvatarGroup max={4} sx={{ mr: 1 }}>
            {activeUsers.map(user => (
              <Tooltip title={`${user.name} ${user.typing ? '(typing...)' : '(viewing)'}`} key={user.id}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={user.typing ? "error" : "success"}
                >
                  <Avatar sx={{ bgcolor: user.color, width: 30, height: 30, fontSize: '0.9rem' }}>
                    {user.avatar}
                  </Avatar>
                </Badge>
              </Tooltip>
            ))}
          </AvatarGroup>
          
          <Tooltip title="Invite collaborators">
            <Chip 
              icon={<PersonAddIcon />} 
              label="Invite" 
              size="small" 
              variant="outlined" 
              onClick={() => {
                setNotification({
                  message: 'Invitation link copied to clipboard',
                  severity: 'success'
                });
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      
      <Snackbar
        open={!!notification}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {notification && (
          <Alert
            onClose={() => setNotification(null)}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default CollaborativeEditingPanel;