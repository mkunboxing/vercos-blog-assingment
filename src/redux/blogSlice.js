import { createSlice } from '@reduxjs/toolkit';
import dummyData from '../data/dummyData';

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('blogState');
    if (serializedState === null) {
      return { posts: dummyData, theme: 'light' };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { posts: dummyData, theme: 'light' };
  }
};

// Initial state with combined data from dummyData and localStorage
const initialState = loadState();

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
      saveState(state); // Save updated state to localStorage
    },
    editPost: (state, action) => {
      const { id, title, content, imageUrl, name, shortDescription, dateCreated } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.name = name;
        existingPost.shortDescription = shortDescription;
        existingPost.dateCreated = dateCreated;
        if (imageUrl) {
          existingPost.imageUrl = imageUrl; // Temporary URL for preview
        }
      }
      saveState(state); // Save updated state to localStorage
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId);
      saveState(state); // Save updated state to localStorage
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveState(state); // Save updated state to localStorage
    },
  },
});

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('blogState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

export const { addPost, editPost, deletePost, toggleTheme } = blogSlice.actions;
export default blogSlice.reducer;
