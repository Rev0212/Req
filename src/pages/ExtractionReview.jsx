import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
  Paper,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Mock data for extracted requirements
const functionalRequirements = [
  {
    id: 1,
    text: 'The system shall allow users to login using email and password.',
    isVerified: true,
    type: 'functional',
    isAmbiguous: false
  },
  {
    id: 2,
    text: 'Users should be able to reset their password via email.',
    isVerified: true,
    type: 'functional',
    isAmbiguous: false
  },
  {
    id: 3,
    text: 'The system must provide a dashboard with recent activities.',
    isVerified: true,
    type: 'functional',
    isAmbiguous: false
  },
  {
    id: 4,
    text: 'The application will be nice and user-friendly.',
    isVerified: false,
    type: 'functional',
    isAmbiguous: true,
    ambiguousReason: 'Vague terminology: "nice" and "user-friendly" need specific criteria'
  },
  {
    id: 5,
    text: 'Users can upload documents for requirement extraction.',
    isVerified: true,
    type: 'functional',
    isAmbiguous: false
  }
];

const nonFunctionalRequirements = [
  {
    id: 6,
    text: 'The system shall respond to user requests within 2 seconds.',
    isVerified: true,
    type: 'non-functional',
    isAmbiguous: false
  },
  {
    id: 7,
    text: 'User data must be encrypted at rest and during transmission.',
    isVerified: true,
    type: 'non-functional',
    isAmbiguous: false
  },
  {
    id: 8,
    text: 'The application should be highly available.',
    isVerified: false,
    type: 'non-functional',
    isAmbiguous: true,
    ambiguousReason: 'Ambiguous term: "highly available" - needs specific uptime percentage'
  }
];

const ExtractionReview = ({ onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [functional, setFunctional] = useState(functionalRequirements);
  const [nonFunctional, setNonFunctional] = useState(nonFunctionalRequirements);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editType, setEditType] = useState('functional');
  const [newRequirement, setNewRequirement] = useState('');
  const [newType, setNewType] = useState('functional');
  const [alert, setAlert] = useState(null);

  const handleVerify = (id, reqType) => {
    if (reqType === 'functional') {
      setFunctional(functional.map(req => 
        req.id === id ? { ...req, isVerified: true } : req
      ));
    } else {
      setNonFunctional(nonFunctional.map(req => 
        req.id === id ? { ...req, isVerified: true } : req
      ));
    }
  };

  const handleEdit = (req) => {
    setEditingId(req.id);
    setEditText(req.text);
    setEditType(req.type);
  };

  const handleSaveEdit = () => {
    if (editType === 'functional') {
      setFunctional(functional.map(req => 
        req.id === editingId ? { ...req, text: editText, type: editType, isVerified: true, isAmbiguous: false } : req
      ));
    } else {
      // If the type was changed, move between arrays
      const oldReq = [...functional, ...nonFunctional].find(r => r.id === editingId);
      
      if (oldReq.type === 'functional' && editType === 'non-functional') {
        // Remove from functional and add to non-functional
        setFunctional(functional.filter(req => req.id !== editingId));
        setNonFunctional([...nonFunctional, { ...oldReq, text: editText, type: editType, isVerified: true, isAmbiguous: false }]);
      } else if (oldReq.type === 'non-functional' && editType === 'functional') {
        // Remove from non-functional and add to functional
        setNonFunctional(nonFunctional.filter(req => req.id !== editingId));
        setFunctional([...functional, { ...oldReq, text: editText, type: editType, isVerified: true, isAmbiguous: false }]);
      } else {
        // Just update non-functional
        setNonFunctional(nonFunctional.map(req => 
          req.id === editingId ? { ...req, text: editText, type: editType, isVerified: true, isAmbiguous: false } : req
        ));
      }
    }
    
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (id, reqType) => {
    if (reqType === 'functional') {
      setFunctional(functional.filter(req => req.id !== id));
    } else {
      setNonFunctional(nonFunctional.filter(req => req.id !== id));
    }
  };

  const handleAddRequirement = () => {
    if (!newRequirement.trim()) {
      setAlert({ severity: 'error', message: 'Please enter requirement text' });
      return;
    }
    
    const newId = Math.max(...[...functional, ...nonFunctional].map(r => r.id)) + 1;
    
    const newReq = {
      id: newId,
      text: newRequirement,
      isVerified: true,
      type: newType,
      isAmbiguous: false
    };
    
    if (newType === 'functional') {
      setFunctional([...functional, newReq]);
    } else {
      setNonFunctional([...nonFunctional, newReq]);
    }
    
    setNewRequirement('');
    setAlert({ severity: 'success', message: 'New requirement added successfully' });
  };

  const handleProceed = () => {
    // Check if all requirements are verified
    const allVerified = [...functional, ...nonFunctional].every(req => req.isVerified);
    
    if (!allVerified) {
      setAlert({ severity: 'warning', message: 'Some requirements are not verified. Please verify all requirements before proceeding.' });
      return;
    }
    
    // Navigate to prioritization page
    navigate(`/prioritization/${id}`);
  };

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setNewType(newType);
    }
  };

  const handleEditTypeChange = (event, newType) => {
    if (newType !== null) {
      setEditType(newType);
    }
  };

  const renderRequirementItem = (req, reqType) => (
    <ListItem 
      key={req.id}
      sx={{ 
        border: req.isAmbiguous ? '1px solid #ffeb3b' : '1px solid #e0e0e0',
        mb: 2,
        borderRadius: 1,
        backgroundColor: req.isAmbiguous ? '#fffde7' : (req.isVerified ? '#f1f8e9' : 'white')
      }}
    >
      {editingId === req.id ? (
        <Box sx={{ width: '100%' }}>
          <TextField
            fullWidth
            multiline
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ToggleButtonGroup
              value={editType}
              exclusive
              onChange={handleEditTypeChange}
              size="small"
            >
              <ToggleButton value="functional">Functional</ToggleButton>
              <ToggleButton value="non-functional">Non-Functional</ToggleButton>
            </ToggleButtonGroup>
            <Box>
              <Button 
                startIcon={<SaveIcon />} 
                onClick={handleSaveEdit}
                color="primary"
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button 
                startIcon={<CancelIcon />} 
                onClick={handleCancelEdit}
                color="error"
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1">{req.text}</Typography>
                {req.isVerified && (
                  <CheckCircleIcon color="success" sx={{ ml: 1, fontSize: 16 }} />
                )}
              </Box>
            }
            secondary={
              req.isAmbiguous && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <WarningIcon color="warning" sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="caption" color="warning.main">
                    {req.ambiguousReason}
                  </Typography>
                </Box>
              )
            }
          />
          <Box>
            {!req.isVerified && (
              <IconButton 
                color="success" 
                onClick={() => handleVerify(req.id, reqType)}
                size="small"
                sx={{ mr: 1 }}
              >
                <CheckCircleIcon />
              </IconButton>
            )}
            <IconButton 
              color="primary" 
              onClick={() => handleEdit(req)}
              size="small"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error" 
              onClick={() => handleDelete(req.id, reqType)}
              size="small"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </>
      )}
    </ListItem>
  );

  const ambiguousCount = [...functional, ...nonFunctional].filter(r => r.isAmbiguous).length;
  const verifiedCount = [...functional, ...nonFunctional].filter(r => r.isVerified).length;
  const totalCount = functional.length + nonFunctional.length;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Requirement Extraction & Review" />
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
                Extracted Requirements Review
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Our AI has extracted the following requirements. Please review, edit, and verify each one.
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e8f5e9' }}>
                    <Typography variant="h5" color="primary">
                      {verifiedCount}/{totalCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Verified Requirements
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#fff8e1' }}>
                    <Typography variant="h5" color="warning.main">
                      {ambiguousCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ambiguous Requirements
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#e3f2fd' }}>
                    <Typography variant="h5" color="info.main">
                      {totalCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Requirements
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    Functional Requirements
                    <Chip 
                      label={functional.length} 
                      color="primary" 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <List>
                    {functional.map(req => renderRequirementItem(req, 'functional'))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    Non-Functional Requirements
                    <Chip 
                      label={nonFunctional.length} 
                      color="secondary" 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <List>
                    {nonFunctional.map(req => renderRequirementItem(req, 'non-functional'))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add New Requirement
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="New Requirement"
                    fullWidth
                    multiline
                    rows={2}
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Enter a new requirement that was missed by our AI extraction"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <ToggleButtonGroup
                      value={newType}
                      exclusive
                      onChange={handleTypeChange}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      <ToggleButton value="functional">Functional</ToggleButton>
                      <ToggleButton value="non-functional">Non-Functional</ToggleButton>
                    </ToggleButtonGroup>
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      onClick={handleAddRequirement}
                      sx={{ flexGrow: 1 }}
                    >
                      Add Requirement
                    </Button>
                  </Box>
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
              Proceed to Prioritization
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ExtractionReview;