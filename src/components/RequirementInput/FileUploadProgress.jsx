import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, LinearProgress, Paper, 
  List, ListItem, ListItemIcon, ListItemText,
  Fade, Collapse, CircularProgress 
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const FileUploadProgress = ({ files }) => {
  const [uploadProgress, setUploadProgress] = useState({});
  const [processingStatus, setProcessingStatus] = useState({});
  const [analysisStage, setAnalysisStage] = useState({});

  const simulateFileUpload = async (fileId) => {
    // Reset status
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    setProcessingStatus(prev => ({ ...prev, [fileId]: 'uploading' }));

    // Simulate gradual upload progress
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }

    // Set as uploaded
    setProcessingStatus(prev => ({ ...prev, [fileId]: 'processing' }));
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    // Begin AI analysis with multiple stages
    setProcessingStatus(prev => ({ ...prev, [fileId]: 'analyzing' }));
    
    const analysisStages = [
      "Extracting text content", 
      "Identifying requirement patterns",
      "Classifying requirements", 
      "Detecting dependencies"
    ];
    
    for (const stage of analysisStages) {
      setAnalysisStage(prev => ({ ...prev, [fileId]: stage }));
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Complete the process
    setProcessingStatus(prev => ({ ...prev, [fileId]: 'completed' }));
  };

  useEffect(() => {
    // Start the upload simulation for each file
    files.forEach(file => {
      simulateFileUpload(file.id);
    });
  }, [files]);

  const getStatusIcon = (fileId) => {
    const status = processingStatus[fileId];
    
    if (status === 'uploading') {
      return <CircularProgress size={20} />;
    } else if (status === 'processing' || status === 'analyzing') {
      return <AnalyticsIcon color="primary" />;
    } else if (status === 'completed') {
      return <CheckCircleIcon color="success" />;
    } else if (status === 'error') {
      return <ErrorIcon color="error" />;
    }
    
    return <InsertDriveFileIcon />;
  };

  return (
    <Paper elevation={2} sx={{ p: 3, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Processing Files
      </Typography>
      <List>
        {files.map(file => (
          <ListItem key={file.id} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', mb: 1 }}>
              <ListItemIcon>
                {getStatusIcon(file.id)}
              </ListItemIcon>
              <ListItemText 
                primary={file.name} 
                secondary={
                  processingStatus[file.id] === 'analyzing' 
                    ? analysisStage[file.id] 
                    : processingStatus[file.id]
                } 
              />
            </Box>
            
            <Collapse in={processingStatus[file.id] !== 'completed'} timeout={300} sx={{ width: '100%' }}>
              <LinearProgress 
                variant={processingStatus[file.id] === 'analyzing' ? 'indeterminate' : 'determinate'} 
                value={uploadProgress[file.id] || 0} 
                sx={{ height: 8, borderRadius: 2 }}
              />
            </Collapse>
            
            <Fade in={processingStatus[file.id] === 'completed'}>
              <Typography variant="caption" color="success.main" sx={{ mt: 1, alignSelf: 'flex-end' }}>
                Ready for review
              </Typography>
            </Fade>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FileUploadProgress;