import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Paper,
  Collapse,
  CircularProgress,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const DocumentComments = () => {
  const [expanded, setExpanded] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Simulate loading comments with delay
    setLoading(true);
    
    setTimeout(() => {
      const demoComments = [
        {
          id: 1,
          author: 'John Doe',
          authorAvatar: 'J',
          date: '2025-04-01 14:30',
          text: 'I think we need more detail in the security requirements section. Can we specify the encryption standards?',
          likes: 2,
          replies: [
            {
              id: 101,
              author: 'Sarah Smith',
              authorAvatar: 'S',
              date: '2025-04-01 15:12',
              text: 'Agreed. I\'ve added AES-256 as the minimum standard.',
              likes: 1
            }
          ]
        },
        {
          id: 2,
          author: 'Mike Johnson',
          authorAvatar: 'M',
          date: '2025-03-31 09:45',
          text: 'The performance requirements look good. I\'ve shared this with the infrastructure team for their input.',
          likes: 0,
          replies: []
        }
      ];
      
      setComments(demoComments);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newCommentObj = {
        id: Date.now(),
        author: 'You',
        authorAvatar: 'U',
        date: new Date().toLocaleString(),
        text: newComment,
        likes: 0,
        replies: []
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setSubmitting(false);
    }, 1000);
  };

  const handleLike = (commentId, replyId = null) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (replyId) {
          // Like a reply
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            };
          }
        } else {
          // Like a comment
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
        }
        return comment;
      })
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{ 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        mt: 3,
        overflow: 'hidden'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#f5f5f5',
          cursor: 'pointer'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            Document Comments & Feedback
          </Typography>
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ ml: 2 }}
          >
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Box>
      
      <Collapse in={expanded}>
        <Box sx={{ p: 2, bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Add a comment or feedback..."
              variant="outlined"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
              onClick={handleAddComment}
              disabled={!newComment.trim() || submitting}
              sx={{ ml: 1, alignSelf: 'flex-end' }}
            >
              {submitting ? 'Posting...' : 'Post'}
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : comments.length > 0 ? (
            <List>
              {comments.map((comment) => (
                <Box key={comment.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: comment.author === 'You' ? '#1976d2' : '#9c27b0' }}>
                        {comment.authorAvatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2">
                            {comment.author}
                            {comment.author === 'You' && (
                              <Typography 
                                component="span" 
                                variant="caption" 
                                sx={{ ml: 1, color: 'primary.main' }}
                              >
                                (You)
                              </Typography>
                            )}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {comment.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textPrimary" paragraph>
                            {comment.text}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Like this comment">
                              <IconButton size="small" onClick={() => handleLike(comment.id)}>
                                <ThumbUpIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Typography variant="caption" sx={{ mr: 2 }}>
                              {comment.likes}
                            </Typography>
                            <Tooltip title="Reply to this comment">
                              <IconButton size="small">
                                <ReplyIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            {comment.author === 'You' && (
                              <Tooltip title="Delete comment">
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  
                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <List sx={{ pl: 6, pt: 0 }}>
                      {comment.replies.map((reply) => (
                        <ListItem key={reply.id} sx={{ px: 0, py: 1 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 30, height: 30, fontSize: '0.875rem', bgcolor: '#ff9800' }}>
                              {reply.authorAvatar}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle2" fontSize="0.875rem">
                                  {reply.author}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {reply.date}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 0.5 }}>
                                <Typography variant="body2" color="textPrimary">
                                  {reply.text}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <Tooltip title="Like this reply">
                                    <IconButton size="small" onClick={() => handleLike(comment.id, reply.id)}>
                                      <ThumbUpIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Typography variant="caption">
                                    {reply.likes}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                  
                  <Divider component="li" sx={{ my: 2 }} />
                </Box>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography variant="body2" color="textSecondary">
                No comments yet. Be the first to add a comment!
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default DocumentComments;