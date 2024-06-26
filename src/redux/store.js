import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
  },
  
});


store.subscribe(() => {
  
  try {
    const serializedState = JSON.stringify(store.getState().blog);
    localStorage.setItem('blogState', serializedState);
  } catch {
    
  }
});

export { store };