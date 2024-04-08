import { createSlice } from '@reduxjs/toolkit';

/*
Le slice de Redux permettant de gérer le state d'un nouvel article ou d'un article en cours de modification
*/

const initialState = {
  newArticle: { title: '', imageName: '', content: [] },
  articleToModify: null,
};

const NewArticleSlice = createSlice({
  name: 'newArticle',
  initialState,
  reducers: {
    addTitle(state, action) {
      if (state.articleToModify !== null) {
        state.articleToModify.title = action.payload;
        return;
      }
      state.newArticle.title = action.payload;
    },
    addImage(state, action) {
      state.newArticle.imageName = action.payload;
    },
    modifyImage(state, action) {
      state.articleToModify.imageName = action.payload;
    },
    addElement(state, action) {
      if (state.articleToModify !== null) {
        state.articleToModify.content.push(action.payload);
        return;
      }
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
    clearNewArticle(state) {
      state.newArticle = { title: '', imageName: '', content: [] };
      state.articleToModify = null;
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
  modifyImage,
  clearNewArticle,
} = NewArticleSlice.actions;
export default NewArticleSlice;
