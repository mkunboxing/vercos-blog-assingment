import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function CategoryPage() {
  const { category } = useParams();
  const posts = useSelector(state => state.blog.posts.filter(post => post.category.toLowerCase() === category.toLowerCase()));
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Container maxWidth="lg">
      <Typography sx={{textAlign: 'center',color: 'orange'}} variant="h4" gutterBottom>{category.charAt(0).toUpperCase() + category.slice(1)} Posts</Typography>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ mb: 2 }}>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="subtitle1">By {post.name}</Typography>
                <Typography variant="body2">{post.shortDescription}</Typography>
                <Typography variant="caption">Posted on: {post.dateCreated}</Typography>
              </CardContent>
              <CardActions>
              <Button component={Link} to={`/blog/${post.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>Read More</Button>
                {isLoggedIn && (
                  <Button component={Link} to={`/edit/${post.id}`} variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }}>Edit</Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CategoryPage;
