import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import RichTextEditor from '../components/RichTextEditor';
import { addPost } from '../redux/blogSlice';

const categories = ["Technology", "Travel", "Food", "Lifestyle"]; // Add your categories here

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateCreated = new Date().toLocaleDateString();
    const post = {
      id: Date.now(),
      title,
      content,
      name,
      shortDescription,
      imageUrl: image || '', // Use empty string if no image is provided
      category,
      dateCreated
    };
    dispatch(addPost(post));
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Create New Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <RichTextEditor
          content={content}
          setContent={setContent}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2, mr: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageUpload}
          />
        </Button>
        {image && <img src={image} alt="Post" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Post
        </Button>
      </form>
    </Container>
  );
}

export default CreatePost;
