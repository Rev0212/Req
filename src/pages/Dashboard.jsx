import { useState } from 'react';
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
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Mock data for recent documents
const recentDocuments = [
  {
    id: 1,
    name: 'Banking App Requirements',
    date: '2025-03-30',
    status: 'Completed',
    type: 'PDF'
  },
  {
    id: 2,
    name: 'Trading Platform Features',
    date: '2025-03-28',
    status: 'In Review',
    type: 'Manual Entry'
  },
  {
    id: 3,
    name: 'Security Compliance Doc',
    date: '2025-03-25',
    status: 'Extracted',
    type: 'DOCX'
  },
  {
    id: 4,
    name: 'Mobile App Update Spec',
    date: '2025-03-20',
    status: 'Prioritized',
    type: 'Web URL'
  }
];

// Stats data
const statsData = [
  { title: 'Total Documents', count: 12, color: '#1565c0' },
  { title: 'Completed', count: 7, color: '#2e7d32' },
  { title: 'In Progress', count: 3, color: '#ed6c02' },
  { title: 'To Review', count: 2, color: '#d32f2f' }
];

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(recentDocuments);

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
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Dashboard" />
        <Toolbar /> {/* This gives space below the fixed header */}
        <Box sx={{ p: 3 }}>
          {/* Quick Actions */}
          <Card sx={{ mb: 4, p: 2, backgroundColor: '#f9faff', border: '1px dashed #1a237e' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle', color: '#ffc107' }} />
                Quick Actions
              </Typography>
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
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ bgcolor: 'white' }}>
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
            ))}
          </Grid>

          {/* Recent Documents */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Documents
              </Typography>
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
                        <Typography variant="body1" fontWeight="medium">
                          {doc.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                            {new Date(doc.date).toLocaleDateString()}
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
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
