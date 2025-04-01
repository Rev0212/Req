import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, List, ListItem, ListItemText, 
  ListItemIcon, Divider, IconButton, Chip, Dialog, 
  DialogTitle, DialogContent, Button, DialogActions,
  CircularProgress, Tooltip, Badge
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import RestoreIcon from '@mui/icons-material/Restore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const DocumentVersionHistory = ({ documentId, onRevertToVersion }) => {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [loadingComparison, setLoadingComparison] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);
  
  useEffect(() => {
    const fetchVersionHistory = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const mockVersions = [
        { 
          id: 'v1.0', 
          timestamp: new Date('2025-03-25T14:22:10'), 
          author: 'Alex Kim', 
          changes: 'Initial document creation',
          major: true
        },
        { 
          id: 'v1.1', 
          timestamp: new Date('2025-03-26T09:45:32'), 
          author: 'Taylor Smith', 
          changes: 'Added functional requirements section',
          major: false
        },
        { 
          id: 'v1.2', 
          timestamp: new Date('2025-03-28T16:08:47'), 
          author: 'Jamie Lee', 
          changes: 'Updated performance requirements',
          major: false
        },
        { 
          id: 'v2.0', 
          timestamp: new Date('2025-04-01T10:12:05'), 
          author: 'You', 
          changes: 'Completed security section and updated document structure',
          major: true
        },
      ];
      
      setVersions(mockVersions);
      setLoading(false);
    };
    
    fetchVersionHistory();
  }, [documentId]);
  
  const handleCompareVersions = async () => {
    if (selectedVersions.length !== 2) return;
    
    setLoadingComparison(true);
    setCompareDialogOpen(true);
    
    // Simulate comparison process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setComparisonResult({
      added: 12,
      removed: 5,
      modified: 8,
      sections: [
        { name: 'Functional Requirements', added: 10, removed: 2, modified: 3 },
        { name: 'Non-Functional Requirements', added: 2, removed: 1, modified: 3 },
        { name: 'Security Requirements', added: 0, removed: 2, modified: 2 }
      ]
    });
    
    setLoadingComparison(false);
  };
  
  const handleToggleVersionSelect = (versionId) => {
    setSelectedVersions(prev => {
      if (prev.includes(versionId)) {
        return prev.filter(id => id !== versionId);
      } else if (prev.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev[1], versionId]; // Replace oldest selection
      }
    });
  };
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Document Version History</Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<CompareArrowsIcon />}
          disabled={selectedVersions.length !== 2 || loading}
          onClick={handleCompareVersions}
        >
          Compare Selected
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {versions.map((version, index) => (
            <React.Fragment key={version.id}>
              {index > 0 && <Divider variant="inset" component="li" />}
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Box>
                    <Tooltip title="Restore this version">
                      <IconButton edge="end" aria-label="restore" onClick={() => onRevertToVersion && onRevertToVersion(version.id)}>
                        <RestoreIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                sx={{
                  cursor: 'pointer',
                  bgcolor: selectedVersions.includes(version.id) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                  '&:hover': {
                    bgcolor: selectedVersions.includes(version.id) 
                      ? 'rgba(25, 118, 210, 0.12)' 
                      : 'rgba(0, 0, 0, 0.04)'
                  },
                }}
                onClick={() => handleToggleVersionSelect(version.id)}
              >
                <ListItemIcon>
                  <Badge
                    color="primary"
                    variant="dot"
                    invisible={!selectedVersions.includes(version.id)}
                  >
                    <Box 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        bgcolor: version.major ? '#1976d2' : '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: version.major ? 'white' : 'rgba(0,0,0,0.87)'
                      }}
                    >
                      {version.id}
                    </Box>
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">
                        {version.changes}
                      </Typography>
                      {version.major && (
                        <Chip label="Major Version" size="small" color="primary" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {version.author}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(version.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      )}
      
      <Dialog 
        open={compareDialogOpen} 
        onClose={() => setCompareDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Version Comparison
        </DialogTitle>
        <DialogContent>
          {loadingComparison ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : comparisonResult ? (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">{comparisonResult.added}</Typography>
                  <Typography variant="body2">Added</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">{comparisonResult.removed}</Typography>
                  <Typography variant="body2">Removed</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">{comparisonResult.modified}</Typography>
                  <Typography variant="body2">Modified</Typography>
                </Box>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom>
                Changes by Section:
              </Typography>
              <List>
                {comparisonResult.sections.map((section, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={section.name}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Typography variant="body2" color="success.main">
                            +{section.added}
                          </Typography>
                          <Typography variant="body2" color="error.main">
                            -{section.removed}
                          </Typography>
                          <Typography variant="body2" color="primary.main">
                            ~{section.modified}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Typography>Select two versions to compare</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DocumentVersionHistory;