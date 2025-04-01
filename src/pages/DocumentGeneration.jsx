import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
  TextField
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TableChartIcon from '@mui/icons-material/TableChart';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ShareIcon from '@mui/icons-material/Share';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CollaborativeEditing from '../components/DocumentGeneration/CollaborativeEditing';
import DocumentComments from '../components/DocumentGeneration/DocumentComments';

// Mock data for requirements
const requirementsData = [
  {
    id: 1,
    text: 'The system shall allow users to login using email and password.',
    type: 'functional',
    priority: 'must-have',
    section: 'Authentication'
  },
  {
    id: 2,
    text: 'Users should be able to reset their password via email.',
    type: 'functional',
    priority: 'must-have',
    section: 'Authentication'
  },
  {
    id: 3,
    text: 'The system must provide a dashboard with recent activities.',
    type: 'functional',
    priority: 'should-have',
    section: 'Dashboard'
  },
  {
    id: 4,
    text: 'The application interface must be intuitive and follow standard UX patterns.',
    type: 'functional',
    priority: 'should-have',
    section: 'User Interface'
  },
  {
    id: 5,
    text: 'Users can upload documents for requirement extraction.',
    type: 'functional',
    priority: 'must-have',
    section: 'Document Management'
  },
  {
    id: 6,
    text: 'The system shall respond to user requests within 2 seconds.',
    type: 'non-functional',
    priority: 'should-have',
    section: 'Performance'
  },
  {
    id: 7,
    text: 'User data must be encrypted at rest and during transmission.',
    type: 'non-functional',
    priority: 'must-have',
    section: 'Security'
  },
  {
    id: 8,
    text: 'The application should have a 99.9% uptime guarantee.',
    type: 'non-functional',
    priority: 'should-have',
    section: 'Reliability'
  },
  {
    id: 9,
    text: 'The system should support speech-to-text for requirement input.',
    type: 'functional',
    priority: 'could-have',
    section: 'User Interface'
  },
  {
    id: 10,
    text: 'The application should integrate with Slack for notifications.',
    type: 'functional',
    priority: 'wont-have',
    section: 'Integrations'
  }
];

const DocumentGeneration = ({ onLogout }) => {
  const { id } = useParams();
  
  const [requirements] = useState(requirementsData);
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Banking App Requirements Specification');
  const [alert, setAlert] = useState(null);
  const [version, setVersion] = useState('1.0');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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

  const handleDownload = (format) => {
    setAlert({ 
      severity: 'success', 
      message: `Document downloaded in ${format.toUpperCase()} format.` 
    });
  };

  const handleEditToggle = () => {
    if (editing) {
      // Save changes
      setAlert({ 
        severity: 'success', 
        message: 'Document changes saved successfully.' 
      });
    }
    setEditing(!editing);
  };

  const handleShare = () => {
    setAlert({ 
      severity: 'success', 
      message: 'Document shared successfully. Recipients will receive an email with the link.' 
    });
  };

  // Group requirements by section for document view
  const groupedRequirements = requirements.reduce((acc, req) => {
    if (!acc[req.section]) {
      acc[req.section] = [];
    }
    acc[req.section].push(req);
    return acc;
  }, {});

  const documentContent = (
    <Box sx={{ p: 3, backgroundColor: 'white', minHeight: '500px' }}>
      {editing ? (
        <TextField
          fullWidth
          variant="standard"
          value={documentTitle}
          onChange={(e) => setDocumentTitle(e.target.value)}
          sx={{ mb: 2, fontSize: '24px', fontWeight: 'bold' }}
          InputProps={{
            style: { fontSize: '24px', fontWeight: 'bold' }
          }}
        />
      ) : (
        <Typography variant="h4" gutterBottom>
          {documentTitle}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Version: {version} | Date: {new Date().toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Generated by Req Extract
        </Typography>
      </Box>
      
      <Typography variant="h5" gutterBottom>
        1. Introduction
      </Typography>
      <Typography variant="body1" paragraph>
        This document outlines the requirements for the Banking App project. It captures both functional
        and non-functional requirements prioritized using the MoSCoW method.
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        2. Requirements
      </Typography>
      
      {Object.entries(groupedRequirements).map(([section, reqs], index) => (
        <Box key={section} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            2.{index + 1}. {section}
          </Typography>
          <Box sx={{ pl: 2 }}>
            {reqs.map(req => (
              <Box key={req.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight="medium">
                    REQ-{req.id.toString().padStart(3, '0')} 
                  </Typography>
                  <Chip 
                    label={req.priority} 
                    size="small" 
                    color={getPriorityColor(req.priority)}
                    sx={{ ml: 1 }}
                  />
                  <Chip 
                    label={req.type} 
                    size="small" 
                    color={req.type === 'functional' ? 'primary' : 'secondary'}
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                  {req.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      
      <Typography variant="h5" gutterBottom>
        3. Prioritization Summary
      </Typography>
      <Typography variant="body1" paragraph>
        <b>Must-Have:</b> {requirements.filter(r => r.priority === 'must-have').length} requirements<br />
        <b>Should-Have:</b> {requirements.filter(r => r.priority === 'should-have').length} requirements<br />
        <b>Could-Have:</b> {requirements.filter(r => r.priority === 'could-have').length} requirements<br />
        <b>Won't-Have:</b> {requirements.filter(r => r.priority === 'wont-have').length} requirements
      </Typography>
    </Box>
  );

  const spreadsheetContent = (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Requirement</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requirements.map((req) => (
            <TableRow key={req.id}>
              <TableCell>REQ-{req.id.toString().padStart(3, '0')}</TableCell>
              <TableCell>{req.text}</TableCell>
              <TableCell>
                <Chip 
                  label={req.type} 
                  size="small" 
                  color={req.type === 'functional' ? 'primary' : 'secondary'}
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={req.priority} 
                  size="small" 
                  color={getPriorityColor(req.priority)}
                />
              </TableCell>
              <TableCell>{req.section}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Document Generation" />
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
            <CardContent sx={{ pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">
                  Generated Document
                </Typography>
                <Box>
                  <IconButton 
                    color={editing ? "success" : "primary"} 
                    onClick={handleEditToggle}
                    sx={{ mr: 1 }}
                  >
                    {editing ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    onClick={handleShare}
                    sx={{ mr: 1 }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography variant="body2" color="textSecondary" paragraph>
                Your requirements have been formatted into a standardized document. You can edit, download, or share it.
              </Typography>
              
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab icon={<DescriptionIcon />} label="Document View" />
                  <Tab icon={<TableChartIcon />} label="Spreadsheet View" />
                </Tabs>
              </Box>
              
              {activeTab === 0 ? documentContent : spreadsheetContent}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Export Options
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<InsertDriveFileIcon />}
                    onClick={() => handleDownload('docx')}
                    sx={{ p: 1.5 }}
                  >
                    Download as DOCX
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<DescriptionIcon />}
                    onClick={() => handleDownload('pdf')}
                    sx={{ p: 1.5 }}
                  >
                    Download as PDF
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<TableChartIcon />}
                    onClick={() => handleDownload('excel')}
                    sx={{ p: 1.5 }}
                  >
                    Export to Excel
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<FileCopyIcon />}
                    onClick={() => handleDownload('jira')}
                    sx={{ p: 1.5 }}
                  >
                    Export to JIRA
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Paper elevation={2} sx={{ mt: 4, p: 3 }}>
          <DocumentComments documentId={id} />
        </Paper>
      </Box>
      <CollaborativeEditing documentId={id} />
    </Box>
  );
};

export default DocumentGeneration;