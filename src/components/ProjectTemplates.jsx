import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import PeopleIcon from '@mui/icons-material/People';

const ProjectTemplates = ({ open, onClose, onSelectTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setSearchQuery('');
      setSelectedTemplate(null);
      setLoading(true);
      
      // Simulate fetching templates
      setTimeout(() => {
        const templateData = [
          {
            id: 1,
            name: 'Banking Application',
            description: 'Complete template for financial applications with security, compliance, and user management requirements',
            category: 'Financial',
            requirementsCount: 45,
            image: 'banking',
            icon: <BusinessCenterIcon />,
            color: '#1565c0'
          },
          {
            id: 2,
            name: 'Mobile App',
            description: 'Template for mobile applications with focus on UI/UX, notifications, and offline functionality',
            category: 'Mobile',
            requirementsCount: 38,
            image: 'mobile',
            icon: <DevicesIcon />,
            color: '#00897b'
          },
          {
            id: 3,
            name: 'E-Commerce Platform',
            description: 'Complete template for online stores with payment processing, inventory, and customer management',
            category: 'Web',
            requirementsCount: 52,
            image: 'ecommerce',
            icon: <ShoppingCartIcon />,
            color: '#e65100'
          },
          {
            id: 4,
            name: 'Security Compliance',
            description: 'Security-focused template with requirements for authentication, data protection, and audit trails',
            category: 'Security',
            requirementsCount: 31,
            image: 'security',
            icon: <SecurityIcon />,
            color: '#d32f2f'
          },
          {
            id: 5,
            name: 'Cloud Service',
            description: 'Template for cloud-based applications with scalability, reliability, and monitoring requirements',
            category: 'Infrastructure',
            requirementsCount: 41,
            image: 'cloud',
            icon: <CloudIcon />,
            color: '#0277bd'
          },
          {
            id: 6,
            name: 'HR Management System',
            description: 'Complete template for HR applications with employee management, payroll, and reporting features',
            category: 'Enterprise',
            requirementsCount: 48,
            image: 'hr',
            icon: <PeopleIcon />,
            color: '#6a1b9a'
          }
        ];
        
        setTemplates(templateData);
        setFilteredTemplates(templateData);
        setLoading(false);
      }, 1500);
    }
  }, [open]);
  
  useEffect(() => {
    // Filter templates when search query changes
    if (templates.length) {
      const filtered = templates.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTemplates(filtered);
    }
  }, [searchQuery, templates]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    
    // Simulate loading template
    setTimeout(() => {
      onSelectTemplate(template);
      onClose();
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Project Templates
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search templates..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredTemplates.map((template) => (
              <Grid item xs={12} sm={6} key={template.id}>
                <Card 
                  variant="outlined"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => handleSelectTemplate(template)}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <Box
                      sx={{
                        height: 140,
                        background: `linear-gradient(120deg, ${template.color} 0%, ${template.color}99 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}
                    >
                      {React.cloneElement(template.icon, { style: { fontSize: 60 } })}
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" gutterBottom>
                          {template.name}
                        </Typography>
                        <Chip 
                          label={template.category} 
                          size="small" 
                          sx={{ bgcolor: `${template.color}22`, color: template.color }}
                        />
                      </Box>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {template.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="textSecondary">
                          {template.requirementsCount} requirements included
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            
            {filteredTemplates.length === 0 && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1">
                    No templates found matching "{searchQuery}"
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {selectedTemplate && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleSelectTemplate(selectedTemplate)}
          >
            Use Template
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProjectTemplates;