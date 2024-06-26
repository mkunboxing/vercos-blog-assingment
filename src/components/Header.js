import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/blogSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { logout } from '../redux/authSlice'; // Assuming logout action from authSlice

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.blog.theme);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreatePostClick = () => {
    if (isLoggedIn) {
      navigate('/create');
    } else {
      localStorage.setItem('intendedLocation', location.pathname);
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'white' : 'inherit',
    textDecoration: location.pathname === path ? 'underline' : 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Typography>Blog App</Typography>
        </Typography>
        <Button color="inherit" component={Link} to="/" style={linkStyle('/')}>Home</Button>
        <Button color="inherit" component={Link} to="/category/technology" style={linkStyle('/category/technology')}>Technology</Button>
        <Button color="inherit" component={Link} to="/category/travel" style={linkStyle('/category/travel')}>Travel</Button>
        <Button color="inherit" component={Link} to="/category/food" style={linkStyle('/category/food')}>Food</Button>
        <Button color="inherit" component={Link} to="/category/lifestyle" style={linkStyle('/category/lifestyle')}>Lifestyle</Button>
        
        {isLoggedIn ? (
          <>
          <Button color="inherit" onClick={handleCreatePostClick}>Create Post</Button>
          <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
          </>
          
        ) : (
          <Button component={Link} to="/login" color="inherit" style={linkStyle('/login')}>Login</Button>
        )}
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
