import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Tab,
  Tabs,
  IconButton,
  InputAdornment,
  Alert,
  Paper
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MicIcon from '@mui/icons-material/Mic';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const RequirementInput = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [manualText, setManualText] = useState('');
  const [fileUploaded, setFileUploaded] = useState(null);
  const [urlInput, setUrlInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleManualSubmit = () => {
    if (manualText.trim() === '') {
      setAlert({ severity: 'error', message: 'Please enter some text to process' });
      return;
    }
    
    // Simulate processing
    setAlert({ severity: 'success', message: 'Processing requirements...' });
    
    // Navigate to extraction review (simulating backend processing)
    setTimeout(() => {
      navigate('/extraction-review/999');
    }, 1500);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUploaded(file);
      setAlert({ severity: 'info', message: `File "${file.name}" ready for processing` });
    }
  };

  const handleFileSubmit = () => {
    if (!fileUploaded) {
      setAlert({ severity: 'error', message: 'Please select a file to upload' });
      return;
    }
    
    setAlert({ severity: 'success', message: 'Uploading and processing file...' });
    
    setTimeout(() => {
      navigate('/extraction-review/998');
    }, 1500);
  };

  const handleUrlSubmit = () => {
    if (!urlInput) {
      setAlert({ severity: 'error', message: 'Please enter a URL' });
      return;
    }
    
    setAlert({ severity: 'success', message: 'Extracting content from URL...' });
    
    setTimeout(() => {
      navigate('/extraction-review/997');
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      setAlert({ severity: 'info', message: 'Recording started. Speak your requirements...' });
    } else {
      setAlert({ severity: 'success', message: 'Recording stopped. Processing speech to text...' });
      
      // Simulate speech recognition result
      setTimeout(() => {
        setActiveTab(0);
        setManualText('This is the transcribed text from your speech. The system will automatically convert all spoken requirements into text format. You can edit this text before submitting for extraction.');
        setAlert({ severity: 'success', message: 'Speech converted to text successfully' });
      }, 1500);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="New Requirement Input" />
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Input Requirements
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Choose your preferred method to input requirements. Our AI will extract and organize them.
              </Typography>
              
              {alert && (
                <Alert 
                  severity={alert.severity} 
                  sx={{ mb: 2 }}
                  onClose={() => setAlert(null)}
                >
                  {alert.message}
                </Alert>
              )}
              
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange} 
                sx={{ mb: 3 }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab icon={<TextFieldsIcon />} label="Manual Entry" />
                <Tab icon={<AttachFileIcon />} label="File Upload" />
                <Tab icon={<InsertLinkIcon />} label="Web URL" />
                <Tab icon={<MicIcon />} label="Speech to Text" />
              </Tabs>
              
              {/* Manual Entry Tab */}
              {activeTab === 0 && (
                <Box>
                  <TextField
                    label="Enter Requirements"
                    multiline
                    rows={12}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your requirements here. Include as much detail as possible. Use clear language and structured format if possible."
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained"

                      color="primary" 
                      endIcon={<SendIcon />}
                      onClick={handleManualSubmit}
                    >
                      Extract Requirements
                    </Button>
                  </Box>
                </Box>
              )}
              
              {/* File Upload Tab */}
              {activeTab === 1 && (
                <Box>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 5, 
                      textAlign: 'center',
                      border: '2px dashed #ccc',
                      mb: 3,
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <input
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                      style={{ display: 'none' }}
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Choose File
                      </Button>
                    </label>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                      {fileUploaded 
                        ? `Selected: ${fileUploaded.name}`
                        : 'Supported formats: PDF, Word, Excel, Text'
                      }
                    </Typography>
                  </Paper>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained"
                      color="primary" 
                      endIcon={<SendIcon />}
                      onClick={handleFileSubmit}
                      disabled={!fileUploaded}
                    >
                      Process File
                    </Button>
                  </Box>
                </Box>
              )}
              
              {/* Web URL Tab */}
              {activeTab === 2 && (
                <Box>
                  <TextField
                    label="Enter Website URL"
                    fullWidth
                    variant="outlined"
                    placeholder="https://example.com/requirements"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <InsertLinkIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained"
                      color="primary" 
                      endIcon={<SendIcon />}
                      onClick={handleUrlSubmit}
                    >
                      Extract from URL
                    </Button>
                  </Box>
                </Box>
              )}
              
              {/* Speech to Text Tab */}
              {activeTab === 3 && (
                <Box sx={{ textAlign: 'center' }}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 5, 
                      textAlign: 'center',
                      border: '2px dashed #ccc',
                      mb: 3,
                      backgroundColor: isRecording ? '#fff8e1' : '#fafafa',
                      transition: 'all 0.3s'
                    }}
                  >
                    <IconButton 
                      color={isRecording ? "error" : "primary"}
                      sx={{ 
                        width: 80, 
                        height: 80,
                        animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0.4)' },
                          '70%': { boxShadow: '0 0 0 10px rgba(244, 67, 54, 0)' },
                          '100%': { boxShadow: '0 0 0 0 rgba(244, 67, 54, 0)' }
                        }
                      }}
                      onClick={toggleRecording}
                    >
                      <MicIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      {isRecording ? 'Recording...' : 'Click to Start Recording'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      {isRecording 
                        ? 'Speak clearly. Click again to stop.'
                        : 'Dictate your requirements and we\'ll convert them to text'
                      }
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tips for Good Requirements
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1">
                    Be Specific & Clear
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Avoid ambiguous language. Use precise terms.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1">
                    One Requirement Per Statement
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Avoid compound requirements to prevent confusion.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1">
                    Include Acceptance Criteria
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Define how to verify the requirement is met.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default RequirementInput;