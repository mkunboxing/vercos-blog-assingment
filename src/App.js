import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';
import Header from './components/Header';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import './styles/global.css';

function App() {
  const theme = useSelector(state => state.blog.theme);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#121212';
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;