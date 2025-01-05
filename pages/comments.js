import { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container } from '@mui/material';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/comments');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments');
      }
    };
    fetchComments();

    socket.on('new-comment', (comment) => {
      setComments((prev) => [comment, ...prev]);
    });

    return () => socket.off('new-comment');
  }, []);

  const handlePostComment = async () => {
    const username = localStorage.getItem('username');
    if (!username || !newComment.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/comments', { username, comment: newComment });
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment');
    }
  };

  return (
    <Container>
      <h1>Comments</h1>
      <TextField
        label="Write a comment"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button variant="contained" onClick={handlePostComment} style={{ marginTop: '10px' }}>
        Post
      </Button>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={`${comment.username} - ${new Date(comment.createdAt).toLocaleString()}`}
              secondary={comment.comment}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Comments;
