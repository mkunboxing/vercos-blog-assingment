// src/pages/Home.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, CardActions, Button, Grid } from '@mui/material';

function Home() {
  const posts = useSelector(state => state.blog.posts);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      <Grid container spacing={3}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={post.imageUrl}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>{post.title}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/edit/${post.id}`}>Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
