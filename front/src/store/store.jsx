import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';

console.log(UserSlice);

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
  },
});

export default store;
