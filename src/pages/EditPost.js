// src/pages/EditPost.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, CardMedia } from '@mui/material';
import RichTextEditor from '../components/RichTextEditor';
import { editPost, deletePost } from '../redux/blogSlice';

function EditPost() {
  const { id } = useParams();
  const post = useSelector(state => state.blog.posts.find(p => p.id === parseInt(id)));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData to include title, content, and optionally image file
    const formData = new FormData();
    formData.append('id', parseInt(id));
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    dispatch(editPost(formData));
    navigate('/');
  };

  const handleDelete = () => {
    dispatch(deletePost(parseInt(id)));
    navigate('/');
  };

  if (!post) return <Typography variant="h6">Post not found</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <RichTextEditor
          content={content}
          setContent={setContent}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '10px' }}
        />
        {image && (
          <CardMedia
            component="img"
            height="200"
            image={URL.createObjectURL(image)}
            alt="Selected Image"
            style={{ marginTop: '10px' }}
          />
        )}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>
          Update Post
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
          Delete Post
        </Button>
      </form>
    </Container>
  );
}

export default EditPost;
