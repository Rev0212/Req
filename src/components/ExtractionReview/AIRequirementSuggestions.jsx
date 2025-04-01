import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, List, ListItem, ListItemText, 
  ListItemIcon, Chip, Button, CircularProgress, Collapse,
  Card, CardContent, Divider, IconButton 
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AIRequirementSuggestions = ({ requirements, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);
  
  useEffect(() => {
    const analyzeSuggestions = async () => {
      setLoading(true);
      
      // Simulate delay for AI analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockSuggestions = [
        {
          id: 1,
          type: 'clarity',
          original: 'System should be fast and responsive',
          improved: 'System should respond to user interactions within 300ms',
          reasoning: 'The original requirement is vague. Specifying measurable performance metrics makes this requirement testable.',
          confidence: 94
        },
        {
          id: 2,
          type: 'missing',
          improved: 'The system shall support data export in CSV and JSON formats',
          reasoning: 'Based on similar requirements for data import, an export requirement is likely needed for completeness.',
          confidence: 78
        },
        {
          id: 3,
          type: 'security',
          original: 'Users must log in to access the system',
          improved: 'Users must authenticate using multi-factor authentication and sessions should expire after 30 minutes of inactivity',
          reasoning: 'Enhanced security practice recommends MFA and session timeout policies for sensitive applications.',
          confidence: 88
        }
      ];
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    };
    
    analyzeSuggestions();
  }, [requirements]);
  
  const handleReanalyze = async () => {
    setAnalyzing(true);
    
    // Simulate analysis process with steps
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuggestions([]);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSuggestions([
      {
        id: 4,
        type: 'clarity',
        original: 'System should handle large files',
        improved: 'System should process files up to 500MB in size with no more than 10% increase in response time',
        reasoning: 'The original requirement lacks specific size limitations and performance expectations.',
        confidence: 91
      },
      {
        id: 5,
        type: 'conflict',
        original: 'The system must auto-delete user data after 30 days',
        improved: 'The system must archive user data after 30 days of inactivity and provide admin option to restore or permanently delete',
        reasoning: 'This conflicts with the data retention policy mentioned in REQ-042 which requires keeping user data for 1 year.',
        confidence: 95
      }
    ]);
    
    setAnalyzing(false);
  };
  
  const handleToggleExpand = (suggestionId) => {
    setExpandedSuggestion(expandedSuggestion === suggestionId ? null : suggestionId);
  };
  
  const getChipColor = (type) => {
    switch (type) {
      case 'clarity': return 'primary';
      case 'missing': return 'success';
      case 'security': return 'error';
      case 'conflict': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">AI Requirement Suggestions</Typography>
        </Box>
        
        <Button 
          variant="outlined" 
          startIcon={analyzing ? <CircularProgress size={20} /> : <BoltIcon />}
          onClick={handleReanalyze}
          disabled={analyzing || loading}
        >
          {analyzing ? 'Analyzing...' : 'Re-Analyze'}
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="body2" color="textSecondary">
            AI is analyzing your requirements...
          </Typography>
        </Box>
      ) : (
        <List>
          {suggestions.map(suggestion => (
            <Card key={suggestion.id} sx={{ mb: 2 }}>
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LightbulbIcon color="warning" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                      {suggestion.type === 'clarity' ? 'Clarity Improvement' : 
                       suggestion.type === 'missing' ? 'Missing Requirement' :
                       suggestion.type === 'security' ? 'Security Enhancement' :
                       suggestion.type === 'conflict' ? 'Requirement Conflict' : 
                       'Suggestion'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Chip 
                      label={`${suggestion.confidence}% confidence`}
                      size="small"
                      color={suggestion.confidence > 90 ? "success" : "primary"}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={suggestion.type}
                      size="small"
                      color={getChipColor(suggestion.type)}
                    />
                  </Box>
                </Box>
                
                {suggestion.original && (
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Original: <span style={{ fontStyle: 'italic' }}>{suggestion.original}</span>
                  </Typography>
                )}
                
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Suggested: <span style={{ color: '#1976d2' }}>{suggestion.improved}</span>
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Button
                    size="small"
                    onClick={() => handleToggleExpand(suggestion.id)}
                    endIcon={expandedSuggestion === suggestion.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  >
                    {expandedSuggestion === suggestion.id ? 'Hide Details' : 'Show Details'}
                  </Button>
                  
                  <Box>
                    <IconButton 
                      size="small" 
                      color="success"
                      onClick={() => onApplySuggestion && onApplySuggestion(suggestion)}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Collapse in={expandedSuggestion === suggestion.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>AI Reasoning:</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {suggestion.reasoning}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
      
      {!loading && suggestions.length === 0 && !analyzing && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="textSecondary">
            No suggestions available at this time.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default AIRequirementSuggestions;