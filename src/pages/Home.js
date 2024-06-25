
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

function Home() {
  const posts = useSelector(state => state.blog.posts);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      {posts.map(post => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/edit/${post.id}`}>Edit</Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default Home;