import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Toolbar,
  Tooltip,
  Skeleton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Backdrop,
  LinearProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Mock data for recent documents
const recentDocumentsData = [
  {
    id: 1,
    name: 'Banking App Requirements',
    date: '2025-03-30',
    status: 'Completed',
    type: 'PDF',
    lastModified: '2 hours ago'
  },
  {
    id: 2,
    name: 'Trading Platform Features',
    date: '2025-03-28',
    status: 'In Review',
    type: 'Manual Entry',
    lastModified: '1 day ago'
  },
  {
    id: 3,
    name: 'Security Compliance Doc',
    date: '2025-03-25',
    status: 'Extracted',
    type: 'DOCX',
    lastModified: '4 days ago'
  },
  {
    id: 4,
    name: 'Mobile App Update Spec',
    date: '2025-03-20',
    status: 'Prioritized',
    type: 'Web URL',
    lastModified: '1 week ago'
  }
];

// Stats data
const statsDataInitial = [
  { title: 'Total Documents', count: 12, color: '#1565c0' },
  { title: 'Completed', count: 7, color: '#2e7d32' },
  { title: 'In Progress', count: 3, color: '#ed6c02' },
  { title: 'To Review', count: 2, color: '#d32f2f' }
];

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [realTimeUpdate, setRealTimeUpdate] = useState(null);
  const [showRealTimeBackdrop, setShowRealTimeBackdrop] = useState(false);

  useEffect(() => {
    // Load user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    
    // Simulate fetching data from API with a delay
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setDocuments(recentDocumentsData);
        setStatsData(statsDataInitial);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotification({
          severity: 'error',
          message: 'Failed to load dashboard data. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Simulate real-time updates
    const realTimeUpdateInterval = setInterval(() => {
      const updates = [
        {
          type: 'document_updated',
          message: 'A team member updated "Trading Platform Features"',
          important: false
        },
        {
          type: 'new_document',
          message: 'New document "Customer Onboarding Flow" was created',
          important: true
        },
        {
          type: 'ai_suggestion',
          message: 'AI detected missing security requirements in your recent document',
          important: true
        }
      ];
      
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      
      // Only show updates occasionally (1 in 3 chance)
      if (Math.random() > 0.66) {
        setRealTimeUpdate(randomUpdate);
        setShowRealTimeBackdrop(true);
        
        // Hide after 5 seconds
        setTimeout(() => {
          setShowRealTimeBackdrop(false);
          // And completely remove after animation
          setTimeout(() => setRealTimeUpdate(null), 500);
        }, 5000);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(realTimeUpdateInterval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Review':
        return 'warning';
      case 'Extracted':
        return 'info';
      case 'Prioritized':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <DescriptionIcon sx={{ color: '#f44336' }} />;
      case 'DOCX':
        return <DescriptionIcon sx={{ color: '#2196f3' }} />;
      case 'Manual Entry':
        return <EditIcon sx={{ color: '#4caf50' }} />;
      case 'Web URL':
        return <DescriptionIcon sx={{ color: '#ff9800' }} />;
      default:
        return <DescriptionIcon />;
    }
  };

  const handleDelete = (id) => {
    setDocumentToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    setDeleting(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentToDelete));
      
      // Update stats
      setStatsData(prevStats => {
        const newStats = [...prevStats];
        newStats[0].count = newStats[0].count - 1; // Decrease total
        
        // Find document status and decrease corresponding count
        const doc = recentDocumentsData.find(d => d.id === documentToDelete);
        if (doc) {
          if (doc.status === 'Completed') newStats[1].count -= 1;
          else if (doc.status === 'In Review' || doc.status === 'Extracted') newStats[2].count -= 1;
          else if (doc.status === 'Prioritized') newStats[3].count -= 1;
        }
        
        return newStats;
      });
      
      setNotification({
        severity: 'success',
        message: 'Document deleted successfully'
      });
    } catch (error) {
      setNotification({
        severity: 'error',
        message: 'Failed to delete document. Please try again.'
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate getting a new document
      const newDocument = {
        id: Math.floor(Math.random() * 1000) + 10,
        name: `New Requirements Doc ${Math.floor(Math.random() * 100)}`,
        date: new Date().toISOString().slice(0, 10),
        status: ['In Review', 'Extracted'][Math.floor(Math.random() * 2)],
        type: ['PDF', 'DOCX', 'Manual Entry'][Math.floor(Math.random() * 3)],
        lastModified: 'Just now'
      };
      
      setDocuments(prev => [newDocument, ...prev].slice(0, 5));
      
      // Update stats
      setStatsData(prevStats => {
        const newStats = [...prevStats];
        newStats[0].count = newStats[0].count + 1; // Increase total
        newStats[2].count = newStats[2].count + 1; // Increase in progress
        return newStats;
      });
      
      setNotification({
        severity: 'success',
        message: 'Dashboard refreshed with latest data'
      });
    } catch (error) {
      setNotification({
        severity: 'error',
        message: 'Failed to refresh data. Please try again.'
      });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Dashboard" />
        <Toolbar /> {/* This gives space below the fixed header */}
        <Box sx={{ p: 3 }}>
          {/* Welcome Message */}
          {userData && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Welcome back, {userData.name || 'User'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last login: {new Date(userData.lastLogin || Date.now()).toLocaleString()}
              </Typography>
            </Box>
          )}
          
          {/* Quick Actions */}
          <Card sx={{ mb: 4, p: 2, backgroundColor: '#f9faff', border: '1px dashed #1a237e' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#ffab00' }} />
                  Quick Actions
                </Typography>
                <Tooltip title="Refresh Dashboard">
                  <IconButton 
                    size="small" 
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{ 
                      animation: refreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' }
                      }
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/requirement-input')}
                    color="primary"
                    sx={{ py: 1.5 }}
                  >
                    Upload Document
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<EditIcon />}
                    onClick={() => navigate('/requirement-input')}
                    sx={{ py: 1.5 }}
                  >
                    Manual Entry
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Stats Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {loading ? (
              // Skeleton loading state for stats
              Array(4).fill(0).map((_, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ bgcolor: 'white' }}>
                    <CardContent sx={{ height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Skeleton variant="text" width="60%" height={20} />
                      <Skeleton variant="text" width="40%" height={40} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              statsData.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      bgcolor: 'white',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" component="div" sx={{ color: stat.color }}>
                        {stat.count}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          {/* Recent Documents */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Documents
              </Typography>
              {loading ? (
                // Skeleton loading state for documents
                Array(4).fill(0).map((_, index) => (
                  <ListItem
                    key={index}
                    sx={{ 
                      borderBottom: '1px solid #eee',
                      py: 2
                    }}
                  >
                    <ListItemAvatar>
                      <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Skeleton variant="text" width="60%" />}
                      secondary={<Skeleton variant="text" width="40%" />}
                    />
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </ListItem>
                ))
              ) : documents.length > 0 ? (
                <List>
                  {documents.map((doc) => (
                    <ListItem
                      key={doc.id}
                      secondaryAction={
                        <Box>
                          <Tooltip title="Continue Working">
                            <IconButton 
                              edge="end" 
                              onClick={() => {
                                if (doc.status === 'Extracted') {
                                  navigate(`/prioritization/${doc.id}`);
                                } else if (doc.status === 'In Review') {
                                  navigate(`/extraction-review/${doc.id}`);
                                } else if (doc.status === 'Prioritized') {
                                  navigate(`/document-generation/${doc.id}`);
                                } else {
                                  navigate(`/extraction-review/${doc.id}`);
                                }
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton edge="end" onClick={() => handleDelete(doc.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <IconButton edge="end">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      }
                      sx={{ 
                        borderBottom: '1px solid #eee',
                        '&:hover': { backgroundColor: '#f9faff' }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {getTypeIcon(doc.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body1" fontWeight="medium">
                              {doc.name}
                            </Typography>
                            {doc.lastModified === 'Just now' && (
                              <Chip 
                                label="NEW" 
                                size="small" 
                                color="success"
                                sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                              {new Date(doc.date).toLocaleDateString()} · {doc.lastModified}
                            </Typography>
                            <Chip 
                              label={doc.status} 
                              size="small" 
                              color={getStatusColor(doc.status)}
                            />
                            <Chip 
                              label={doc.type} 
                              size="small" 
                              variant="outlined"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="textSecondary">
                    No documents found. Upload a document or create a new one to get started.
                  </Typography>
                  <Button 
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/requirement-input')}
                    startIcon={<AddIcon />}
                  >
                    Create New Document
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => !deleting && setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this document? This action cannot be undone.
          </Typography>
          {deleting && <LinearProgress sx={{ mt: 2 }} />}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            disabled={deleting}
            variant="contained"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
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
      
      {/* Real-time update backdrop */}
      <Backdrop
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          transition: 'opacity 0.3s',
          opacity: showRealTimeBackdrop ? 1 : 0,
          pointerEvents: showRealTimeBackdrop ? 'auto' : 'none'
        }}
        open={!!realTimeUpdate}
      >
        <Card sx={{ 
          maxWidth: 400, 
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderLeft: realTimeUpdate?.important ? '4px solid #ff3d00' : undefined
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <NotificationsIcon 
                color={realTimeUpdate?.important ? "error" : "primary"}
                sx={{ mr: 1 }}
              />
              <Typography variant="subtitle1">
                Real-time Update
              </Typography>
            </Box>
            <Typography variant="body2">
              {realTimeUpdate?.message}
            </Typography>
          </CardContent>
        </Card>
      </Backdrop>
    </Box>
  );
};

export default Dashboard;
