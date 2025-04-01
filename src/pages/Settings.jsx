import { useState } from 'react';
import {
  Box,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import PersonIcon from '@mui/icons-material/Person';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Settings = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [aiEnabled, setAiEnabled] = useState(true);
  const [jiraEnabled, setJiraEnabled] = useState(false);
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [templateFormat, setTemplateFormat] = useState('standard');
  const [alert, setAlert] = useState(null);
  const [currentUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    department: 'Engineering'
  });
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleSaveProfile = () => {
    setAlert({ 
      severity: 'success', 
      message: 'Profile information updated successfully.' 
    });
  };
  
  const handleSaveSettings = () => {
    setAlert({ 
      severity: 'success', 
      message: 'Settings saved successfully.' 
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header title="Settings & User Management" />
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
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab icon={<PersonIcon />} label="Profile" />
              <Tab icon={<PaletteIcon />} label="Preferences" />
              <Tab icon={<IntegrationInstructionsIcon />} label="Integrations" />
              <Tab icon={<NotificationsIcon />} label="Notifications" />
            </Tabs>
          </Box>
          
          {/* Profile Tab */}
          {activeTab === 0 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ width: 100, height: 100, bgcolor: '#1a237e', mr: 3 }}
                    alt={currentUser.name}
                  >
                    {currentUser.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5">{currentUser.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Role: {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Department: {currentUser.department}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      defaultValue={currentUser.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      defaultValue={currentUser.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Department"
                      fullWidth
                      defaultValue={currentUser.department}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        defaultValue={currentUser.role}
                        label="Role"
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="reviewer">Reviewer</MenuItem>
                        <MenuItem value="contributor">Contributor</MenuItem>
                        <MenuItem value="viewer">Viewer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Password"
                      fullWidth
                      type="password"
                      placeholder="Enter new password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Confirm Password"
                      fullWidth
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProfile}
                      >
                        Save Profile
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          
          {/* Preferences Tab */}
          {activeTab === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Application Preferences
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="AI Suggestions"
                      secondary="Enable AI-powered suggestions and improvements"
                    />
                    <Switch 
                      checked={aiEnabled} 
                      onChange={() => setAiEnabled(!aiEnabled)}
                    />
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Document Template"
                      secondary="Choose your preferred document template format"
                    />
                    <FormControl sx={{ width: 200 }}>
                      <Select
                        value={templateFormat}
                        onChange={(e) => setTemplateFormat(e.target.value)}
                        size="small"
                      >
                        <MenuItem value="standard">Standard Format</MenuItem>
                        <MenuItem value="agile">Agile User Stories</MenuItem>
                        <MenuItem value="ieee">IEEE 830 Standard</MenuItem>
                        <MenuItem value="custom">Custom Format</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Default Dashboard View"
                      secondary="Choose which view to show by default on dashboard"
                    />
                    <FormControl sx={{ width: 200 }}>
                      <Select
                        defaultValue="recent"
                        size="small"
                      >
                        <MenuItem value="recent">Recent Documents</MenuItem>
                        <MenuItem value="stats">Statistics</MenuItem>
                        <MenuItem value="quick">Quick Actions</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Language"
                      secondary="Choose the application language"
                    />
                    <FormControl sx={{ width: 200 }}>
                      <Select
                        defaultValue="en"
                        size="small"
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                        <MenuItem value="ja">Japanese</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
          
          {/* Integrations Tab */}
          {activeTab === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  External Integrations
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Jira Integration"
                      secondary="Connect with Jira to export requirements as tickets"
                    />
                    <Box>
                      <Switch 
                        checked={jiraEnabled} 
                        onChange={() => setJiraEnabled(!jiraEnabled)}
                      />
                      {jiraEnabled && (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          sx={{ ml: 2 }}
                        >
                          Configure
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Slack Integration"
                      secondary="Share requirements and receive notifications in Slack"
                    />
                    <Box>
                      <Switch 
                        checked={slackEnabled} 
                        onChange={() => setSlackEnabled(!slackEnabled)}
                      />
                      {slackEnabled && (
                        <Button 
                          variant="outlined" 
                          size="small" 
                          sx={{ ml: 2 }}
                        >
                          Configure
                        </Button>
                      )}
                    </Box>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Confluence Integration"
                      secondary="Publish requirements directly to Confluence pages"
                    />
                    <Box>
                      <Switch defaultChecked={false} />
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ ml: 2 }}
                        disabled
                      >
                        Configure
                      </Button>
                    </Box>
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Google Drive Integration"
                      secondary="Save and sync documents with Google Drive"
                    />
                    <Box>
                      <Switch defaultChecked={false} />
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ ml: 2 }}
                        disabled
                      >
                        Configure
                      </Button>
                    </Box>
                  </ListItem>
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<CloudSyncIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Integration Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
          
          {/* Notifications Tab */}
          {activeTab === 3 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Email Notifications"
                      secondary="Receive updates and alerts via email"
                    />
                    <Switch 
                      checked={emailNotifications} 
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Document Sharing Notifications"
                      secondary="Get notified when someone shares a document with you"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Requirement Updates"
                      secondary="Notifications when requirements are added or modified"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="System Announcements"
                      secondary="Important announcements about the system"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  
                  <ListItem>
                    <ListItemText 
                      primary="Weekly Summary"
                      secondary="Get a weekly summary of activities and new features"
                    />
                    <Switch defaultChecked={false} />
                  </ListItem>
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<SaveIcon />}
                    onClick={handleSaveSettings}
                  >
                    Save Notification Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;