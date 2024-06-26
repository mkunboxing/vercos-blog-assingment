import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import RichTextEditor from '../components/RichTextEditor';
import { editPost, deletePost } from '../redux/blogSlice';

function EditPost() {
  const { id } = useParams();
  const post = useSelector(state => state.blog.posts.find(p => p.id === parseInt(id)));
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setName(post.name);
      setShortDescription(post.shortDescription);
      setImage(post.image);
    }
  }, [post]);

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
    dispatch(editPost({
      id: parseInt(id),
      title,
      content,
      name,
      shortDescription,
      image,
      dateCreated: post.dateCreated
    }));
    navigate('/');
  };

  const handleDelete = () => {
    dispatch(deletePost(parseInt(id)));
    navigate('/');
  };

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
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
