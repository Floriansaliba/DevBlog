import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newArticle: { title: '', imageName: '', content: [] },
  articleToModify: null,
};

const NewArticleSlice = createSlice({
  name: 'newArticle',
  initialState,
  reducers: {
    addTitle(state, action) {
      state.newArticle.title = action.payload;
    },
    addImage(state, action) {
      state.newArticle.imageName = action.payload;
    },
    addElement(state, action) {
      const element = action.payload;
      state.newArticle.content.push(element);
    },
    deleteElement(state, action) {
      const { index } = action.payload;
      if (state.articleToModify !== null) {
        state.articleToModify.content.splice(index, 1);
        return;
      }
      state.newArticle.content.splice(index, 1);
    },
    modifyElement(state, action) {
      const { index, type, content } = action.payload;
      const element = state.articleToModify.content[index];
      if (element && element.type === type) {
        element.content = content;
      }
    },
    saveArticleToModify(state, action) {
      const article = action.payload;
      state.articleToModify = article;
    },
    copyArticleToModifyAsNewArticle(state) {
      state.newArticle = state.articleToModify;
    },
  },
});

export const {
  addTitle,
  addImage,
  addElement,
  deleteElement,
  saveArticleToModify,
  copyArticleToModifyAsNewArticle,
  modifyElement,
} = NewArticleSlice.actions;
export default NewArticleSlice;
