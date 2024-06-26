import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

const Home = () => {
  const posts = useSelector((state) => state.blog.posts);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Container>
      <Typography
        sx={{ textAlign: "center", color: "orange" }}
        variant="h4"
        gutterBottom
      >
        Home
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ mb: 2 }}>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <CardContent>
                <Typography color="textSecondary" variant="subtitle1">By {post.name}</Typography>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.shortDescription}</Typography>
                <Typography variant="caption">
                  Posted on: {post.dateCreated}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/blog/${post.id}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Read More
                </Button>
                {isLoggedIn && (
                  <Button
                    component={Link}
                    to={`/edit/${post.id}`}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, ml: 2 }}
                  >
                    Edit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
