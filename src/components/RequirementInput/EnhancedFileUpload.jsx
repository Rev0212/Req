import React, { useState } from 'react';
import { 
  Box, Button, Typography, LinearProgress, Paper, 
  List, ListItem, ListItemIcon, ListItemText, Chip
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const EnhancedFileUpload = ({ onFileProcessed }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingFile, setProcessingFile] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setUploading(false);
    
    // Process each file with a realistic delay
    for (const file of files) {
      setProcessingFile(file);
      setProcessingProgress(0);
      
      // Simulate AI processing with progress
      for (let progress = 0; progress <= 100; progress += 5) {
        setProcessingProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Simulate completing file processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onFileProcessed) {
        onFileProcessed(file);
      }
    }
    
    setProcessingFile(null);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Requirements Documents
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <input
          accept=".pdf,.doc,.docx,.xlsx,.txt"
          style={{ display: 'none' }}
          id="file-upload-button"
          multiple
          type="file"
          onChange={handleFileChange}
          disabled={uploading || processingFile}
        />
        <label htmlFor="file-upload-button">
          <Button
            component="span"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            disabled={uploading || processingFile}
            fullWidth
            sx={{ height: 100, border: '2px dashed #aaa' }}
          >
            Select Files or Drop Here
          </Button>
        </label>
      </Box>
      
      {files.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {files.length} file(s) selected:
          </Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={file.name}
                  secondary={`${(file.size / 1024).toFixed(1)} KB`} 
                />
                {processingFile && processingFile.name === file.name && (
                  <Chip 
                    label="Processing" 
                    color="primary" 
                    size="small" 
                    variant="outlined"
                  />
                )}
              </ListItem>
            ))}
          </List>
          
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleUpload}
            disabled={uploading || processingFile}
            sx={{ mt: 1 }}
          >
            Upload & Process
          </Button>
        </Box>
      )}
      
      {uploading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Uploading: {uploadProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}
      
      {processingFile && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Processing {processingFile.name}: {processingProgress}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={processingProgress} 
            color="secondary" 
          />
        </Box>
      )}
    </Paper>
  );
};

export default EnhancedFileUpload;