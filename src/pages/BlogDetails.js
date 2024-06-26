// BlogDetail.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function BlogDetail() {
  const { id } = useParams();
  const posts = useSelector(state => state.blog.posts);
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return <Typography variant="h4">Post not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>{post.title}</Typography>
      <Typography variant="subtitle1">By {post.name}</Typography>
      <Typography variant="caption">Posted on: {post.dateCreated}</Typography>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto' }} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Container>
  );
}

export default BlogDetail;
