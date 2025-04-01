import { useState } from 'react';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip
} from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Analytics = ({ onLogout }) => {
  const [timeframe] = useState('last30days');
  
  // Mock data for charts
  const requirementByTypeData = {
    labels: ['Functional', 'Non-Functional'],
    datasets: [
      {
        label: 'Requirements by Type',
        data: [45, 18],
        backgroundColor: ['#1a237e', '#7986cb'],
        borderWidth: 1,
      },
    ],
  };
  
  const requirementByPriorityData = {
    labels: ['Must-Have', 'Should-Have', 'Could-Have', 'Won\'t-Have'],
    datasets: [
      {
        label: 'Requirements by Priority',
        data: [25, 18, 12, 8],
        backgroundColor: ['#d32f2f', '#ff9800', '#2196f3', '#9e9e9e'],
        borderWidth: 1,
      },
    ],
  };
  
  const requirementTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Requirements',
        data: [12, 19, 15, 22, 30, 25],
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Completed Requirements',
        data: [8, 15, 12, 18, 25, 22],
        borderColor: '#388e3c',
        backgroundColor: 'rgba(56, 142, 60, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Mock potential issues
  const potentialIssues = [
    {
      id: 1,
      text: 'Multiple performance requirements without specific metrics',
      severity: 'high',
      recommendation: 'Add specific metrics to performance requirements (response time, throughput, etc.)'
    },
    {
      id: 2,
      text: 'Security requirements are lacking details about implementation',
      severity: 'high',
      recommendation: 'Add details on encryption standards, access control, and authentication methods'
    },
    {
      id: 3,
      text: 'User interface requirements are vague',
      severity: 'medium',
      recommendation: 'Define UI standards, accessibility requirements, and specific interactions'
    },
    {
      id: 4,
      text: 'Missing requirements for error handling',
      severity: 'medium',
      recommendation: 'Add requirements for how the system should handle various error conditions'
    }
  ];

  // Requirement stats
  const stats = [
    { label: 'Total Requirements', value: 63 },
    { label: 'Functional', value: 45 },
    { label: 'Non-Functional', value: 18 },
    { label: 'Ambiguous Requirements', value: 7 },
    { label: 'Average Quality Score', value: '87%' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <ErrorIcon color="error" />;
      case 'medium':
        return <WarningIcon color="warning" />;
      case 'low':
        return <PriorityHighIcon color="info" />;
      default:
        return <PriorityHighIcon />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Analytics & Insights" />
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Requirements Overview
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Overview of all requirements extracted and processed in your system.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={index}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center', 
                        backgroundColor: index === 0 ? '#e8f5e9' : 'white'
                      }}
                    >
                      <Typography variant="h5" color={index === 0 ? 'primary' : 'textPrimary'}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Requirements by Type
                    </Typography>
                    <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                      <Doughnut data={requirementByTypeData} />
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Requirements by Priority
                    </Typography>
                    <Box sx={{ height: 250, display: 'flex', justifyContent: 'center' }}>
                      <Doughnut data={requirementByPriorityData} />
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Project Stats
                    </Typography>
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Completed Projects:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          8
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Active Projects:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          4
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Total Documents:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          24
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Documents this month:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium" color="primary">
                          6 <TrendingUpIcon sx={{ fontSize: 16, verticalAlign: 'middle' }} />
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Ambiguous Requirements Rate:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium" color="success.main">
                          11% <TrendingDownIcon sx={{ fontSize: 16, verticalAlign: 'middle' }} />
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Requirements Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Line data={requirementTrendData} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Potential Issues & Recommendations
                  </Typography>
                  <List>
                    {potentialIssues.map((issue) => (
                      <ListItem 
                        key={issue.id}
                        sx={{ 
                          borderLeft: `4px solid ${
                            issue.severity === 'high' ? '#f44336' : 
                            issue.severity === 'medium' ? '#ff9800' : '#2196f3'
                          }`,
                          mb: 2,
                          backgroundColor: '#f5f5f5',
                          borderRadius: '0 4px 4px 0'
                        }}
                      >
                        <ListItemIcon>
                          {getSeverityIcon(issue.severity)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body1">{issue.text}</Typography>
                              <Chip 
                                label={issue.severity} 
                                size="small" 
                                color={getSeverityColor(issue.severity)}
                                sx={{ ml: 1 }}
                              />
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              <b>Recommendation:</b> {issue.recommendation}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;