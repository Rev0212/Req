import React, { useState, useEffect } from 'react';
import {
  Box, Avatar, Tooltip, Badge, Chip, Typography, 
  AvatarGroup, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CollaborativeEditing = ({ documentId }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  
  useEffect(() => {
    // Simulate fetching active users with a delay
    const fetchActiveUsers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setActiveUsers([
        { id: 1, name: 'Alex Kim', avatar: 'AK', status: 'editing', section: 'Security Requirements' },
        { id: 2, name: 'Rishi', avatar: 'JD', status: 'viewing' },
        { id: 3, name: 'Sarah Lee', avatar: 'SL', status: 'idle' }
      ]);
    };
    
    fetchActiveUsers();
    
    // Simulate user activity updates
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        // Randomly update a user's status
        if (prev.length > 0) {
          const statuses = ['editing', 'viewing', 'idle'];
          const sections = ['Security Requirements', 'Performance Metrics', 'User Interface', 'Data Storage'];
          const randomIndex = Math.floor(Math.random() * prev.length);
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          const randomSection = sections[Math.floor(Math.random() * sections.length)];
          
          return prev.map((user, idx) => 
            idx === randomIndex ? 
              { ...user, status: randomStatus, section: randomStatus === 'editing' ? randomSection : user.section } : 
              user
          );
        }
        return prev;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [documentId]);
  
  // Render status icon based on user status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'editing': return <EditIcon fontSize="small" color="primary" />;
      case 'viewing': return <VisibilityIcon fontSize="small" color="action" />;
      default: return <PersonIcon fontSize="small" color="disabled" />;
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mr: 2 }}>
        Collaborators:
      </Typography>
      
      <AvatarGroup max={4}>
        {activeUsers.map(user => (
          <Tooltip
            key={user.id}
            title={`${user.name} (${user.status}${user.section && user.status === 'editing' ? ` ${user.section}` : ''})`}
            arrow
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={getStatusIcon(user.status)}
            >
              <Avatar alt={user.name} sx={{ bgcolor: user.status === 'editing' ? 'primary.main' : 'default' }}>
                {user.avatar}
              </Avatar>
            </Badge>
          </Tooltip>
        ))}
      </AvatarGroup>
      
      {activeUsers.some(u => u.status === 'editing') && (
        <Chip
          size="small"
          color="primary"
          label="Document being edited"
          sx={{ ml: 2, animation: 'pulse 2s infinite' }}
        />
      )}
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </Paper>
  );
};

export default CollaborativeEditing;