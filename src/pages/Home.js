
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Grid, Button } from '@mui/material';

function Home() {
  const posts = useSelector(state => state.blog.posts);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  console.log(posts); 
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ mb: 2 }}>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
              <CardContent>
              <Typography color="blue" sx={{ fontFamily:'monospace', fontSize: 12 }} variant="subtitle1">By {post.name}</Typography>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.shortDescription}</Typography>
                <Typography variant="caption">Posted on: {post.dateCreated}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/blog/${post.id}`}>Read More</Button>
                {isLoggedIn && (
                  <Button size="small" component={Link} to={`/edit/${post.id}`}>Edit</Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
