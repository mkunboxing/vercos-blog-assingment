// src/redux/blogSlice.js

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
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(formData) {
        return {
          payload: {
            id: Date.now(),
            title: formData.get('title'),
            content: formData.get('content'),
            imageUrl: URL.createObjectURL(formData.get('image')),
          },
        };
      },
    },
    editPost: {
      reducer(state, action) {
        const { id, title, content, imageUrl } = action.payload;
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          if (imageUrl) {
            existingPost.imageUrl = URL.createObjectURL(imageUrl); // Temporary URL for preview
          }
        }
      },
      prepare(formData) {
        return {
          payload: {
            id: parseInt(formData.get('id')),
            title: formData.get('title'),
            content: formData.get('content'),
            imageUrl: formData.get('image'),
          },
        };
      },
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
