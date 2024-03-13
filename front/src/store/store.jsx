import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';
import NewArticleSlice from './slices/NewArticleSlice';
import ArticlesSlice from './slices/ArticlesSlice';

console.log(UserSlice);

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    newArticle: NewArticleSlice.reducer,
    articles: ArticlesSlice.reducer,
  },
});

export default store;
