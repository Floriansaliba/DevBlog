import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  articles: [],
  loading: false,
  error: null,
};

// Définition de l'action asynchrone pour fetch les artciles
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/articles');
      return response.data.articles;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ArticlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getArticles(state) {
      state.articles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload || 'Une erreur est survenue';
        state.loading = false;
      });
  },
});

export const { getArticles } = ArticlesSlice.actions;
export default ArticlesSlice;
