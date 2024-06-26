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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog App Assignment</Link>
        </Typography>
        <Button color="inherit" onClick={handleCreatePostClick}>Create Post</Button>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
        ) : (
          <Button component={Link} to="/login" color="inherit">Login</Button>
        )}
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
