// src/components/AIChatAssistant.jsx
import { useState, useEffect } from 'react';
import { 
  Box, Fab, Dialog, DialogTitle, DialogContent, 
  TextField, IconButton, Typography, Avatar, 
  List, ListItem, Paper, Zoom
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const AIChatAssistant = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { sender: 'ai', text: 'Hello! I\'m your Requirements Assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setConversation([...conversation, { sender: 'user', text: message }]);
    setMessage('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      setIsTyping(false);
      generateResponse(message);
    }, 1500);
  };

  const generateResponse = (userMessage) => {
    // Simple response logic - would be more sophisticated in a real app
    let response;
    
    if (userMessage.toLowerCase().includes('requirement')) {
      response = "Good requirements should be specific, measurable, achievable, relevant, and time-bound (SMART). Need help creating better requirements?";
    } else if (userMessage.toLowerCase().includes('priorit')) {
      response = "We use the MoSCoW method for prioritization: Must-Have, Should-Have, Could-Have, and Won't-Have. This helps teams focus on what's most important.";
    } else if (userMessage.toLowerCase().includes('extract')) {
      response = "Our AI can extract requirements from documents, web pages, or manual input. We then classify them as functional or non-functional and suggest priorities.";
    } else if (userMessage.toLowerCase().includes('help')) {
      response = "I can help you with creating requirements, extracting them from documents, prioritizing, and generating documentation. What do you need assistance with?";
    } else if (userMessage.toLowerCase().includes('template')) {
      response = "We offer various templates for different project types including banking applications, e-commerce websites, and mobile apps. Would you like to use one?";
    } else if (userMessage.toLowerCase().includes('export')) {
      response = "You can export your requirements as Word, PDF, or Excel formats. These formats maintain all prioritization and classification data.";
    } else {
      response = "I'm here to help with requirement extraction and management. Feel free to ask about creating, organizing, or exporting requirements!";
    }
    
    setConversation(prev => [...prev, { sender: 'ai', text: response }]);
  };

  return (
    <>
      <Zoom in={!open}>
        <Fab 
          color="primary" 
          aria-label="AI Assistant"
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
        >
          <SmartToyIcon />
        </Fab>
      </Zoom>
      
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <SmartToyIcon />
            </Avatar>
            <Typography variant="h6">Requirements Assistant</Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ height: 350, overflow: 'auto' }}>
            {conversation.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                  }}
                >
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
              </ListItem>
            ))}
            {isTyping && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: '20px 20px 20px 5px',
                  }}
                >
                  <Typography variant="body2">AI Assistant is typing...</Typography>
                </Paper>
              </ListItem>
            )}
          </List>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ask something about requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              disabled={!message.trim()}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIChatAssistant;