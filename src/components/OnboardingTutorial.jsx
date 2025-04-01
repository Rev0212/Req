import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  MobileStepper,
  Typography,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const OnboardingTutorial = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTutorialButton, setShowTutorialButton] = useState(false);
  
  const tutorialSteps = [
    {
      label: 'Welcome to Req Extract',
      description: 'This AI-powered tool helps you extract, organize, and manage requirements. Let\'s take a quick tour!',
      image: <AutoAwesomeIcon sx={{ fontSize: 80, color: '#6200ea' }} />
    },
    {
      label: 'Create New Requirements',
      description: 'Upload documents or enter requirements manually. Our AI will help you extract and organize them.',
      image: <NoteAddIcon sx={{ fontSize: 80, color: '#00b0ff' }} />
    },
    {
      label: 'Review & Prioritize',
      description: 'Review AI-extracted requirements, verify them, and prioritize using the MoSCoW method.',
      image: <DescriptionIcon sx={{ fontSize: 80, color: '#00c853' }} />
    },
    {
      label: 'Analyze & Export',
      description: 'Get insights on your requirements and export them in multiple formats including Word, PDF, and JIRA.',
      image: <EqualizerIcon sx={{ fontSize: 80, color: '#ff6d00' }} />
    }
  ];

  const maxSteps = tutorialSteps.length;

  useEffect(() => {
    if (open) {
      setActiveStep(0);
    }
  }, [open]);

  const handleNext = () => {
    if (activeStep < maxSteps - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleClose = () => {
    setShowTutorialButton(true);
    onClose();
  };

  return (
    <>
      {showTutorialButton && (
        <Tooltip title="Help & Tutorial">
          <IconButton
            sx={{
              position: 'fixed',
              bottom: 24,
              left: 24,
              backgroundColor: '#6200ea',
              color: 'white',
              '&:hover': {
                backgroundColor: '#7c4dff',
              }
            }}
            onClick={() => onClose()} // Reopen tutorial
          >
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              height: 280,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5ff',
            }}
          >
            {tutorialSteps[activeStep].image}
          </Box>
          <Paper
            square
            elevation={0}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {tutorialSteps[activeStep].label}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {tutorialSteps[activeStep].description}
            </Typography>
          </Paper>
          
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ flexGrow: 1 }}
            nextButton={
              activeStep === maxSteps - 1 ? (
                <Button 
                  size="small" 
                  onClick={handleClose}
                  color="primary"
                  startIcon={<CheckCircleIcon />}
                >
                  Got it
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  endIcon={<KeyboardArrowRight />}
                >
                  Next
                </Button>
              )
            }
            backButton={
              <Button 
                size="small" 
                onClick={handleBack} 
                disabled={activeStep === 0}
                startIcon={<KeyboardArrowLeft />}
              >
                Back
              </Button>
            }
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {activeStep === maxSteps - 1 ? 'Get Started' : 'Skip Tour'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OnboardingTutorial;
