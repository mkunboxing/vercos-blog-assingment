import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogSlice';

const store = configureStore({
  reducer: {
    blog: blogReducer,
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