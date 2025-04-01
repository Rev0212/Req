import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Avatar, AvatarGroup, Tooltip, Badge, 
  Chip, Paper, IconButton, Alert, Snackbar 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatIcon from '@mui/icons-material/Chat';

const CollaborativeEditor = ({ documentId, content, onContentChange }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Simulate users joining/leaving with delays
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Alex Kim', avatar: 'A', status: 'editing', section: 'functional-requirements' },
      { id: 2, name: 'Taylor Smith', avatar: 'T', status: 'viewing' },
      { id: 3, name: 'Jamie Lee', avatar: 'J', status: 'idle' }
    ];
    
    const addUser = async () => {
      setActiveUsers([mockUsers[0]]);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setActiveUsers(prev => [...prev, mockUsers[1]]);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setActiveUsers(prev => [...prev, mockUsers[2]]);
    };
    
    addUser();
    
    // Simulate user activity notifications
    const activitySimulation = async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      setNotification({ user: 'Alex Kim', action: 'edited the functional requirements section' });
      await new Promise(resolve => setTimeout(resolve, 8000));
      setNotification({ user: 'Taylor Smith', action: 'commented on the security requirements' });
    };
    
    activitySimulation();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  const handleStartEditing = (section) => {
    setEditingSection(section);
    
    // Simulate saving progress after some time
    setTimeout(() => {
      setNotification({ user: 'You', action: 'started editing' });
    }, 500);
  };
  
  const handleStopEditing = () => {
    setNotification({ user: 'You', action: 'stopped editing' });
    setEditingSection(null);
  };
  
  const simulateTyping = async () => {
    // This function would integrate with a real-time collaboration system in production
    await new Promise(resolve => setTimeout(resolve, 1500));
    setNotification({ user: 'Alex Kim', action: 'is typing...' });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Collaborative Document Editing</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AvatarGroup max={4} sx={{ mr: 2 }}>
            {activeUsers.map((user) => (
              <Tooltip key={user.id} title={`${user.name} (${user.status})`}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color={user.status === 'editing' ? 'error' : user.status === 'viewing' ? 'info' : 'default'}
                >
                  <Avatar sx={{ width: 30, height: 30, bgcolor: user.id === 1 ? '#f44336' : user.id === 2 ? '#3f51b5' : '#4caf50' }}>
                    {user.avatar}
                  </Avatar>
                </Badge>
              </Tooltip>
            ))}
          </AvatarGroup>
          
          <Chip 
            label={`${activeUsers.length} online`} 
            size="small" 
            color="success" 
            variant="outlined" 
          />
        </Box>
      </Box>
      
      <Box sx={{ mb: 2 }}>
        {activeUsers.find(user => user.status === 'editing' && user.id !== 1) && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {activeUsers.find(user => user.status === 'editing' && user.id !== 1)?.name} is currently editing 
            {activeUsers.find(user => user.status === 'editing')?.section ? 
              ` the ${activeUsers.find(user => user.status === 'editing')?.section.replace('-', ' ')}` : 
              ''
            }
          </Alert>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Tooltip title="Edit Document">
            <IconButton 
              color={editingSection ? 'primary' : 'default'} 
              onClick={() => editingSection ? handleStopEditing() : handleStartEditing('document')}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View Only">
            <IconButton color="info">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Chat with Collaborators">
            <IconButton color="secondary" onClick={simulateTyping}>
              <ChatIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        message={notification ? `${notification.user} ${notification.action}` : ''}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </Paper>
  );
};

export default CollaborativeEditor;