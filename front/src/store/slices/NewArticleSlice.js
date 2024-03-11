import { createSlice } from '@reduxjs/toolkit';

const initialState = { newArticle: { title: '', image: '', elements: [] } };

const NewArticleSlice = createSlice({
  name: 'newArticle',
  initialState,
  reducers: {
    addTitle(state, action) {
      state.newArticle.title = action.payload;
    },
    addImage(state, action) {
      state.newArticle.image = action.payload;
    },
    addElement(state, action) {
      const element = action.payload;
      state.newArticle.elements.push(element);
    },
  },
});

export const { addTitle, addImage, addElement } = NewArticleSlice.actions;
export default NewArticleSlice;
