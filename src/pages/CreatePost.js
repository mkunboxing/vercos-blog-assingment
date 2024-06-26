// src/pages/CreatePost.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, CardMedia } from '@mui/material';
import RichTextEditor from '../components/RichTextEditor';
import { addPost } from '../redux/blogSlice';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData to include title, content, and image file
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    dispatch(addPost(formData));
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Create New Post</Typography>
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
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Post
        </Button>
      </form>
    </Container>
  );
}

export default CreatePost;
