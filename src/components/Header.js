import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/blogSlice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../redux/authSlice'; // Assuming logout action from authSlice
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.blog.theme);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const themeObj = useTheme();
  const isMobile = useMediaQuery(themeObj.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const menuItems = (
    <>
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
    </>
  );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Blog App</Link>
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List>
                {menuItems.props.children.map((item, index) => (
                  <ListItem button key={index} onClick={() => setDrawerOpen(false)}>
                    {item.type === Button ? (
                      <Button
                        color="inherit"
                        component={item.props.component}
                        to={item.props.to}
                        style={linkStyle(item.props.to)}
                        fullWidth
                      >
                        {item.props.children}
                      </Button>
                    ) : (
                      <ListItemText primary={item.props.children} />
                    )}
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          menuItems
        )}
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
