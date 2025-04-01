import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button,
  Chip
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ErrorIcon from '@mui/icons-material/Error';
import RecommendIcon from '@mui/icons-material/Recommend';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RefreshIcon from '@mui/icons-material/Refresh';

const DashboardInsights = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadInsights = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const demoInsights = [
        {
          id: 1,
          type: 'improvement',
          text: 'Adding more detailed security requirements would improve your document completeness score by 15%',
          icon: <RecommendIcon color="primary" />,
          action: 'Add Security Requirements'
        },
        {
          id: 2,
          type: 'warning',
          text: '3 requirements have vague language that may lead to implementation issues',
          icon: <ErrorIcon color="warning" />,
          action: 'Review Flagged Requirements'
        },
        {
          id: 3,
          type: 'trend',
          text: 'Your requirements completeness score has improved by 8% in the last 30 days',
          icon: <TrendingUpIcon color="success" />,
          action: 'View Analytics'
        },
        {
          id: 4,
          type: 'suggestion',
          text: 'Try using project templates to streamline your requirement creation process',
          icon: <LightbulbIcon color="info" />,
          action: 'Explore Templates'
        }
      ];
      
      setInsights(demoInsights);
      setLoading(false);
      setRefreshing(false);
    }, 1800);
  };
  
  useEffect(() => {
    loadInsights();
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    loadInsights();
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoAwesomeIcon sx={{ mr: 1, color: '#6200ea' }} />
            <Typography variant="h6">
              AI-Generated Insights
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={refreshing ? <CircularProgress size={16} /> : <RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading || refreshing}
          >
            Refresh
          </Button>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {insights.map((insight) => (
              <ListItem 
                key={insight.id}
                sx={{ 
                  backgroundColor: '#f5f8ff',
                  borderRadius: 1,
                  mb: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <ListItemIcon>
                  {insight.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={insight.text}
                  secondary={
                    <Button 
                      size="small" 
                      sx={{ mt: 1, textTransform: 'none' }}
                    >
                      {insight.action} →
                    </Button>
                  }
                />
                {insight.type === 'trend' && (
                  <Chip 
                    icon={<TrendingUpIcon />} 
                    label="Trending" 
                    size="small" 
                    color="success" 
                    variant="outlined" 
                  />
                )}
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardInsights;