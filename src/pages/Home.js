// Home.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Grid, Button } from '@mui/material';

function Home() {
  const posts = useSelector(state => state.blog.posts);

  console.log(posts); // Check the structure of posts and imageUrl

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ mb: 2 }}>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />} {/* Ensure imageUrl is valid */}
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="subtitle1">By {post.name}</Typography>
                <Typography variant="body2">{post.shortDescription}</Typography>
                <Typography variant="caption">Posted on: {post.dateCreated}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/blog/${post.id}`}>Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
