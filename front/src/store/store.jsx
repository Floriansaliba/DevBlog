import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';
import NewArticleSlice from './slices/NewArticleSlice';

console.log(UserSlice);

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    newArticle: NewArticleSlice.reducer,
  },
});

export default store;
