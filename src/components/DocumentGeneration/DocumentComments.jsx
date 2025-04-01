import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, TextField, Button, 
  List, ListItem, ListItemText, ListItemAvatar, 
  Avatar, Divider, IconButton, Badge, Tooltip,
  Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ResolveIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const DocumentComments = ({ documentId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editText, setEditText] = useState('');
  
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockComments = [
        {
          id: 1,
          text: 'The security requirements need more detail about authentication mechanisms.',
          author: 'Alex Kim',
          avatar: 'A',
          timestamp: new Date('2025-03-30T14:22:10'),
          resolved: false,
          likes: 2,
          replies: [
            {
              id: 101,
              text: 'Added more details about OAuth2 and MFA requirements.',
              author: 'You',
              avatar: 'Y',
              timestamp: new Date('2025-03-30T15:10:45'),
            }
          ]
        },
        {
          id: 2,
          text: 'Performance requirement PR-003 is too vague. Needs more clarity.',
          author: 'John Doe',
          avatar: 'J',
          timestamp: new Date('2025-03-30T16:00:00'),
          resolved: false,
          likes: 5,
          replies: []
        }
      ];

      setComments(mockComments);
      setLoading(false);
    };

    fetchComments();
  }, [documentId]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleNewCommentSubmit = async () => {
    if (newComment.trim() !== '') {
      setSubmitting(true);
      // Simulate API call for adding a new comment
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        author: 'You',
        avatar: 'Y',
        timestamp: new Date(),
        resolved: false,
        likes: 0,
        replies: []
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setSubmitting(false);
    }
  };

  const handleEditDialogOpen = (comment) => {
    setSelectedComment(comment);
    setEditText(comment.text);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedComment(null);
    setEditText('');
  };

  const handleEditComment = async () => {
    if (editText.trim() !== '') {
      setSubmitting(true);
      // Simulate API call for editing comment
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedComments = comments.map(comment => 
        comment.id === selectedComment.id ? { ...comment, text: editText } : comment
      );
      setComments(updatedComments);
      handleEditDialogClose();
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setSubmitting(true);
    // Simulate API call for deleting comment
    await new Promise(resolve => setTimeout(resolve, 1000));
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    setSubmitting(false);
  };

  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleResolveComment = (commentId) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId ? { ...comment, resolved: !comment.resolved } : comment
    );
    setComments(updatedComments);
  };

  const maxSteps = comments.length;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Document Comments
      </Typography>

      {loading ? (
        <Typography>Loading comments...</Typography>
      ) : (
        <List>
          {comments.map(comment => (
            <React.Fragment key={comment.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{comment.avatar}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<strong>{comment.author}</strong>}
                  secondary={comment.text}
                />
                <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={selectedComment === comment}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleResolveComment(comment.id)}>
                    <ResolveIcon sx={{ marginRight: 1 }} />
                    {comment.resolved ? 'Unresolve' : 'Resolve'}
                  </MenuItem>
                  <MenuItem onClick={() => handleEditDialogOpen(comment)}>
                    <EditIcon sx={{ marginRight: 1 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteComment(comment.id)}>
                    <DeleteOutlineIcon sx={{ marginRight: 1 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </ListItem>
              <Divider />
              {comment.replies.length > 0 && (
                <List>
                  {comment.replies.map(reply => (
                    <ListItem key={reply.id}>
                      <ListItemAvatar>
                        <Avatar>{reply.avatar}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<strong>{reply.author}</strong>}
                        secondary={reply.text}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          ))}
        </List>
      )}

      <Box>
        <TextField
          label="Add a comment"
          value={newComment}
          onChange={handleNewCommentChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          disabled={submitting}
        />
        <Button
          onClick={handleNewCommentSubmit}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleEditComment}
            color="primary"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentComments;
