import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, CircularProgress, 
  Card, CardContent, Grid, Divider,
  List, ListItem, ListItemText, ListItemIcon, Chip
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const DataDrivenInsights = () => {
  const [loading, setLoading] = useState(true);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [data, setData] = useState(null);
  const [insights, setInsights] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockData = {
        requirementsByType: [
          { name: 'Functional', value: 42 },
          { name: 'Performance', value: 18 },
          { name: 'Security', value: 15 },
          { name: 'Usability', value: 12 },
          { name: 'Compatibility', value: 8 }
        ],
        requirementsByPriority: [
          { name: 'Must Have', value: 35 },
          { name: 'Should Have', value: 25 },
          { name: 'Could Have', value: 20 },
          { name: 'Won\'t Have', value: 10 },
          { name: 'Nice to Have', value: 10 }
        ],
        weeklyActivity: [
          { name: 'Week 1', created: 12, completed: 5 },
          { name: 'Week 2', created: 18, completed: 10 },
          { name: 'Week 3', created: 15, completed: 18 },
          { name: 'Week 4', created: 25, completed: 20 }
        ],
        completionStats: {
          total: 95,
          complete: 68,
          incomplete: 27,
          withIssues: 12
        },
        growthRate: 18.5,
        qualityScore: 84
      };
      
      setData(mockData);
      setLoading(false);
      
      // After data loads, simulate AI-generated insights with additional delay
      setLoadingInsights(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setInsights([
        {
          id: 1,
          type: 'alert',
          message: 'Security requirements (15%) are below industry average (25%)',
          severity: 'warning'
        },
        {
          id: 2,
          type: 'trend',
          message: 'Requirement completion rate increased by 8% this month',
          trend: 'up'
        },
        {
          id: 3,
          type: 'insight',
          message: 'Consider adding compatibility requirements for mobile platforms',
          severity: 'info'
        },
        {
          id: 4,
          type: 'quality',
          message: '12 requirements need more details to meet quality standards',
          severity: 'error'
        }
      ]);
      
      setLoadingInsights(false);
    };
    
    fetchDashboardData();
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const getInsightIcon = (insight) => {
    switch (insight.type) {
      case 'alert':
        return insight.severity === 'warning' ? 
          <WarningAmberIcon color="warning" /> : 
          <ErrorOutlineIcon color="error" />;
      case 'trend':
        return insight.trend === 'up' ? 
          <TrendingUpIcon color="success" /> : 
          <TrendingDownIcon color="error" />;
      case 'quality':
        return insight.severity === 'error' ? 
          <ErrorOutlineIcon color="error" /> : 
          <CheckCircleOutlineIcon color="success" />;
      case 'insight':
        return <AutoAwesomeIcon color="primary" />;
      default:
        return <AutoAwesomeIcon />;
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data-Driven Requirements Insights
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : data ? (
        <Grid container spacing={3}>
          {/* Requirements Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Requirements by Type
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.requirementsByType}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.requirementsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Requirements by Priority */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Requirements by Priority
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.requirementsByPriority}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Weekly Activity */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Weekly Activity
                </Typography>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.weeklyActivity}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Bar dataKey="created" fill="#8884d8" name="Created" />
                      <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Key Stats */}
          <Grid item xs={12} md={5}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Requirement Status
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {data.completionStats.total}
                    </Typography>
                    <Typography variant="body2">Total</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {data.completionStats.complete}
                    </Typography>
                    <Typography variant="body2">Complete</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {data.completionStats.incomplete}
                    </Typography>
                    <Typography variant="body2">Incomplete</Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1">
                      Quality Score
                    </Typography>
                    <Typography 
                      variant="h4" 
                      color={data.qualityScore >= 80 ? 'success.main' : 'warning.main'}
                    >
                      {data.qualityScore}%
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1">
                      Growth Rate
                    </Typography>
                    <Typography variant="h4" color="primary">
                      {data.growthRate}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* AI-Generated Insights */}
          <Grid item xs={12} md={7}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
                  AI-Generated Insights
                  {loadingInsights && (
                    <CircularProgress size={20} sx={{ ml: 2 }} />
                  )}
                </Typography>
                
                {!loadingInsights && insights.length > 0 ? (
                  <List dense>
                    {insights.map(insight => (
                      <ListItem key={insight.id}>
                        <ListItemIcon>
                          {getInsightIcon(insight)}
                        </ListItemIcon>
                        <ListItemText primary={insight.message} />
                        {insight.severity && (
                          <Chip 
                            size="small" 
                            label={insight.severity} 
                            color={
                              insight.severity === 'error' ? 'error' :
                              insight.severity === 'warning' ? 'warning' : 'info'
                            }
                          />
                        )}
                      </ListItem>
                    ))}
                  </List>
                ) : !loadingInsights ? (
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                      No insights available
                    </Typography>
                  </Box>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography color="textSecondary">No data available</Typography>
      )}
    </Paper>
  );
};

export default DataDrivenInsights;