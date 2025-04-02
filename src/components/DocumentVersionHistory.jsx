import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  CircularProgress
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CloseIcon from '@mui/icons-material/Close';

const DocumentVersionHistory = ({ documentTitle }) => {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);
    
    // Simulate API call to fetch version history
    setTimeout(() => {
      const versionHistory = [
        { 
          id: 5, 
          version: "1.4",
          date: "2025-04-01 15:32",
          author: "Rishi",
          authorAvatar: "J",
          changes: [
            { type: "added", text: "Added 2 security requirements" },
            { type: "modified", text: "Updated performance metrics" }
          ]
        },
        {
          id: 4, 
          version: "1.3",
          date: "2025-03-29 11:45",
          author: "Sarah Smith",
          authorAvatar: "S",
          changes: [
            { type: "removed", text: "Removed redundant login requirements" },
            { type: "modified", text: "Clarified dashboard metrics" }
          ]
        },
        { 
          id: 3, 
          version: "1.2",
          date: "2025-03-27 09:15",
          author: "Mike Johnson",
          authorAvatar: "M",
          changes: [
            { type: "added", text: "Added mobile UI requirements" }
          ]
        },
        { 
          id: 2, 
          version: "1.1",
          date: "2025-03-25 14:22",
          author: "Rishi",
          authorAvatar: "J",
          changes: [
            { type: "modified", text: "Refined user authentication flow" },
            { type: "added", text: "Added password requirements" }
          ]
        },
        { 
          id: 1, 
          version: "1.0",
          date: "2025-03-23 10:05",
          author: "Rishi",
          authorAvatar: "J",
          changes: [
            { type: "added", text: "Initial document creation" }
          ]
        }
      ];
      
      setVersions(versionHistory);
      setLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVersion(null);
  };

  const handleRestore = (version) => {
    setRestoring(true);
    setSelectedVersion(version);
    
    // Simulate restore process
    setTimeout(() => {
      setRestoring(false);
      handleClose();
      
      // In a real application, you would update the document state here
    }, 2000);
  };

  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'added': return 'success';
      case 'removed': return 'error';
      case 'modified': return 'warning';
      default: return 'default';
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<HistoryIcon />}
        onClick={handleOpen}
      >
        Version History
      </Button>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Version History: {documentTitle}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {versions.map((version, index) => (
                <Box key={version.id}>
                  <ListItem
                    sx={{ 
                      backgroundColor: index === 0 ? '#f5f9ff' : 'transparent',
                      borderRadius: 1,
                      border: index === 0 ? '1px solid #e3f2fd' : 'none'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: index === 0 ? '#1976d2' : '#9e9e9e' }}>
                        {version.authorAvatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" fontWeight={index === 0 ? 'bold' : 'medium'}>
                            Version {version.version}
                          </Typography>
                          {index === 0 && (
                            <Chip 
                              label="Current" 
                              size="small" 
                              color="primary" 
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {version.date} by {version.author}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            {version.changes.map((change, i) => (
                              <Chip
                                key={i}
                                label={change.text}
                                size="small"
                                color={getChangeTypeColor(change.type)}
                                variant="outlined"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                    {index !== 0 && (
                      <Box>
                        <Tooltip title="Compare with current">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <CompareArrowsIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Restore this version">
                          <IconButton 
                            size="small" 
                            onClick={() => handleRestore(version)}
                            disabled={restoring}
                          >
                            <RestoreIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </ListItem>
                  {index < versions.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Restore confirmation dialog */}
      <Dialog
        open={!!selectedVersion}
        onClose={() => !restoring && setSelectedVersion(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Restore Version</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to restore version {selectedVersion?.version}? This will replace the current document with this version.
          </Typography>
          {restoring && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setSelectedVersion(null)} 
            disabled={restoring}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={restoring}
            onClick={() => handleRestore(selectedVersion)}
          >
            {restoring ? 'Restoring...' : 'Restore'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocumentVersionHistory;