import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Divider
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LowPriorityIcon from '@mui/icons-material/LowPriority';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Mock data for requirements to prioritize
const requirementsData = [
  {
    id: 1,
    text: 'The system shall allow users to login using email and password.',
    type: 'functional',
    priority: 'must-have'
  },
  {
    id: 2,
    text: 'Users should be able to reset their password via email.',
    type: 'functional',
    priority: 'must-have'
  },
  {
    id: 3,
    text: 'The system must provide a dashboard with recent activities.',
    type: 'functional',
    priority: 'should-have'
  },
  {
    id: 4,
    text: 'The application interface must be intuitive and follow standard UX patterns.',
    type: 'functional',
    priority: 'should-have'
  },
  {
    id: 5,
    text: 'Users can upload documents for requirement extraction.',
    type: 'functional',
    priority: 'must-have'
  },
  {
    id: 6,
    text: 'The system shall respond to user requests within 2 seconds.',
    type: 'non-functional',
    priority: 'should-have'
  },
  {
    id: 7,
    text: 'User data must be encrypted at rest and during transmission.',
    type: 'non-functional',
    priority: 'must-have'
  },
  {
    id: 8,
    text: 'The application should have a 99.9% uptime guarantee.',
    type: 'non-functional',
    priority: 'should-have'
  },
  {
    id: 9,
    text: 'The system should support speech-to-text for requirement input.',
    type: 'functional',
    priority: 'could-have'
  },
  {
    id: 10,
    text: 'The application should integrate with Slack for notifications.',
    type: 'functional',
    priority: 'wont-have'
  }
];

const Prioritization = ({ onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [requirements, setRequirements] = useState(requirementsData);
  const [alert, setAlert] = useState(null);

  const handlePriorityChange = (id, newPriority) => {
    setRequirements(requirements.map(req => 
      req.id === id ? { ...req, priority: newPriority } : req
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'must-have':
        return 'error';
      case 'should-have':
        return 'warning';
      case 'could-have':
        return 'info';
      case 'wont-have':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityDescription = (priority) => {
    switch (priority) {
      case 'must-have':
        return 'Essential for project success. Project cannot go live without these.';
      case 'should-have':
        return 'Important but not vital. Project success would be affected without these.';
      case 'could-have':
        return 'Desirable features that would be nice to have if time and resources permit.';
      case 'wont-have':
        return 'Features that will not be implemented in the current release but may be considered for future.';
      default:
        return '';
    }
  };

  const priorityCounts = {
    'must-have': requirements.filter(r => r.priority === 'must-have').length,
    'should-have': requirements.filter(r => r.priority === 'should-have').length,
    'could-have': requirements.filter(r => r.priority === 'could-have').length,
    'wont-have': requirements.filter(r => r.priority === 'wont-have').length
  };
  
  const handleProceed = () => {
    // Check if all requirements have a priority
    if (requirements.some(req => !req.priority)) {
      setAlert({ severity: 'warning', message: 'Please assign a priority to all requirements before proceeding.' });
      return;
    }
    
    // Navigate to document generation page
    navigate(`/document-generation/${id}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Requirement Prioritization" />
        <Toolbar />
        <Box sx={{ p: 3 }}>
          {alert && (
            <Alert 
              severity={alert.severity} 
              sx={{ mb: 3 }}
              onClose={() => setAlert(null)}
            >
              {alert.message}
            </Alert>
          )}
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Prioritize Requirements (MoSCoW Method)
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Classify each requirement's importance using the MoSCoW method to help development teams understand what to build first.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffebee' }}>
                    <Typography variant="h5" color="error.main">
                      {priorityCounts['must-have']}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Must-Have
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff8e1' }}>
                    <Typography variant="h5" color="warning.main">
                      {priorityCounts['should-have']}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Should-Have
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                    <Typography variant="h5" color="info.main">
                      {priorityCounts['could-have']}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Could-Have
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#eeeeee' }}>
                    <Typography variant="h5" color="text.secondary">
                      {priorityCounts['wont-have']}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Won't Have
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <List>
                {requirements.map((req) => (
                  <ListItem
                    key={req.id}
                    sx={{ 
                      border: '1px solid #e0e0e0',
                      mb: 2,
                      borderRadius: 1,
                      backgroundColor: 'white'
                    }}
                  >
                    <DragIndicatorIcon sx={{ color: '#9e9e9e', mr: 1 }} />
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="body1">{req.text}</Typography>
                          <Chip 
                            label={req.type === 'functional' ? 'Functional' : 'Non-Functional'} 
                            size="small" 
                            color={req.type === 'functional' ? 'primary' : 'secondary'}
                            sx={{ mt: 1, mr: 1 }}
                          />
                        </Box>
                      }
                    />
                    <FormControl sx={{ width: 150 }}>
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={req.priority}
                        onChange={(e) => handlePriorityChange(req.id, e.target.value)}
                        label="Priority"
                        size="small"
                      >
                        <MenuItem value="must-have">Must-Have</MenuItem>
                        <MenuItem value="should-have">Should-Have</MenuItem>
                        <MenuItem value="could-have">Could-Have</MenuItem>
                        <MenuItem value="wont-have">Won't Have</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                MoSCoW Priority Guide
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle1" color="error">
                    <b>Must-Have</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getPriorityDescription('must-have')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle1" color="warning.dark">
                    <b>Should-Have</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getPriorityDescription('should-have')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle1" color="info.dark">
                    <b>Could-Have</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getPriorityDescription('could-have')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="subtitle1" color="text.secondary">
                    <b>Won't-Have</b>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getPriorityDescription('wont-have')}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleProceed}
            >
              Generate Document
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Prioritization;