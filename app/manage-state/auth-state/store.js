import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from './userAuthSlice';

export default configureStore({
  reducer: {
    authUser : userAuthSlice
  }
})