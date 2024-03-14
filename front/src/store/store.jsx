import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './slices/UserSlice';
import NewArticleSlice from './slices/NewArticleSlice';
import ArticlesSlice from './slices/ArticlesSlice';
import saveUserMiddleware from './middleware/saveUserMiddleware';
import saveArticlesMiddleware from './middleware/saveArticlesMiddleware';

console.log(UserSlice);

const store = configureStore({
  reducer: {
    user: UserSlice.reducer,
    newArticle: NewArticleSlice.reducer,
    articles: ArticlesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveUserMiddleware, saveArticlesMiddleware),
});

export default store;
