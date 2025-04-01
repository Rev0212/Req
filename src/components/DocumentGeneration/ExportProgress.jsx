import React, { useState } from 'react';
import { 
  Box, Paper, Typography, Button, LinearProgress, 
  Grid, Card, CardContent, CardActions, Chip,
  Dialog, DialogTitle, DialogContent, CircularProgress,
  List, ListItem, ListItemIcon, ListItemText, Divider,
  Snackbar, Alert
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const ExportProgress = ({ documentId, documentTitle }) => {
  const [exportProgress, setExportProgress] = useState({ active: false, format: null, progress: 0 });
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportStatus, setExportStatus] = useState({ success: null, message: null });
  
  const exportFormats = [
    { 
      id: 'pdf', 
      name: 'PDF Document', 
      icon: <PictureAsPdfIcon sx={{ fontSize: 40 }} color="error" />,
      description: 'Export as a structured PDF document for sharing and printing'
    },
    { 
      id: 'docx', 
      name: 'Word Document', 
      icon: <DescriptionIcon sx={{ fontSize: 40 }} color="primary" />,
      description: 'Export as an editable Microsoft Word document'
    },
    { 
      id: 'excel', 
      name: 'Excel Spreadsheet', 
      icon: <TableChartIcon sx={{ fontSize: 40 }} color="success" />,
      description: 'Export as Excel for JIRA import or tabular analysis'
    },
    { 
      id: 'jira', 
      name: 'JIRA Import', 
      icon: <AssignmentIcon sx={{ fontSize: 40 }} color="secondary" />,
      description: 'Export directly to JIRA as epics and user stories'
    }
  ];
  
  const handleExportDocument = async (format) => {
    setExportDialogOpen(true);
    setExportProgress({ active: true, format, progress: 0 });
    setExportStatus({ success: null, message: null });
    
    // Simulate export progress with realistic steps
    try {
      // Step 1: Initialize export
      for (let i = 0; i <= 15; i++) {
        setExportProgress(prev => ({ ...prev, progress: i }));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Step 2: Generate document structure
      for (let i = 15; i <= 35; i++) {
        setExportProgress(prev => ({ ...prev, progress: i }));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Step 3: Format content
      for (let i = 35; i <= 65; i++) {
        setExportProgress(prev => ({ ...prev, progress: i }));
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      
      // Step 4: Apply formatting
      for (let i = 65; i <= 85; i++) {
        setExportProgress(prev => ({ ...prev, progress: i }));
        await new Promise(resolve => setTimeout(resolve, 60));
      }
      
      // Step 5: Finalize document
      for (let i = 85; i <= 100; i++) {
        setExportProgress(prev => ({ ...prev, progress: i }));
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      
      // Complete
      await new Promise(resolve => setTimeout(resolve, 500));
      setExportStatus({ 
        success: true, 
        message: `Successfully exported ${documentTitle || 'document'} as ${format.toUpperCase()}` 
      });
    } catch (error) {
      setExportStatus({ 
        success: false, 
        message: `Failed to export: ${error.message || 'Unknown error occurred'}` 
      });
    } finally {
      setExportProgress(prev => ({ ...prev, active: false }));
    }
  };
  
  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Export Document
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {exportFormats.map(format => (
          <Grid item xs={12} sm={6} md={3} key={format.id}>
            <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1 }}>
                {format.icon}
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {format.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {format.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<CloudDownloadIcon />}
                  onClick={() => handleExportDocument(format.id)}
                  disabled={exportProgress.active}
                >
                  Export
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Dialog open={exportDialogOpen} onClose={handleCloseExportDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {exportProgress.format && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Exporting as {exportFormats.find(f => f.id === exportProgress.format)?.name}
              {exportProgress.active && <CircularProgress size={20} sx={{ ml: 2 }} />}
            </Box>
          )}
        </DialogTitle>
        <DialogContent>
          {exportProgress.active && (
            <>
              <Box sx={{ mb: 3 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={exportProgress.progress}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
                  {exportProgress.progress}% Complete
                </Typography>
              </Box>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    {exportProgress.progress > 0 ? <DoneIcon color="success" /> : <HourglassEmptyIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Initializing export process" 
                    secondary={exportProgress.progress > 0 ? "Completed" : "Pending"}
                  />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    {exportProgress.progress > 15 ? <DoneIcon color="success" /> : <HourglassEmptyIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Generating document structure" 
                    secondary={exportProgress.progress > 15 ? "Completed" : "Pending"}
                  />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    {exportProgress.progress > 35 ? <DoneIcon color="success" /> : <HourglassEmptyIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Formatting content" 
                    secondary={exportProgress.progress > 35 ? "Completed" : "Pending"}
                  />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    {exportProgress.progress > 65 ? <DoneIcon color="success" /> : <HourglassEmptyIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Applying template and styling" 
                    secondary={exportProgress.progress > 65 ? "Completed" : "Pending"}
                  />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    {exportProgress.progress >= 100 ? <DoneIcon color="success" /> : <HourglassEmptyIcon />}
                  </ListItemIcon>
                  <ListItemText 
                    primary="Finalizing document" 
                    secondary={exportProgress.progress >= 100 ? "Completed" : "Pending"}
                  />
                </ListItem>
              </List>
            </>
          )}
          
          {!exportProgress.active && exportStatus.success !== null && (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              {exportStatus.success ? (
                <>
                  <DoneIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" gutterBottom color="success.main">
                    Export Complete!
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h6" gutterBottom color="error">
                    Export Failed
                  </Typography>
                </>
              )}
              
              <Typography variant="body1">
                {exportStatus.message}
              </Typography>
              
              {exportStatus.success && (
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  startIcon={<CloudDownloadIcon />}
                >
                  Download File
                </Button>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
      
      <Snackbar
        open={!exportDialogOpen && exportStatus.success !== null}
        autoHideDuration={6000}
        onClose={() => setExportStatus({ success: null, message: null })}
      >
        <Alert 
          severity={exportStatus.success ? "success" : "error"} 
          sx={{ width: '100%' }}
        >
          {exportStatus.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ExportProgress;