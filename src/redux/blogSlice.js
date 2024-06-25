import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('blogState');
    if (serializedState === null) {
      return { posts: [], theme: 'light' };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { posts: [], theme: 'light' };
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState: loadState(),
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { addPost, editPost, deletePost, toggleTheme } = blogSlice.actions;
export default blogSlice.reducer;