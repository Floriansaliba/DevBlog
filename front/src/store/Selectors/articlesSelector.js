export const selectArticles = (state) => state.articles.articles;
export const selectLoading = (state) => state.articles.loading;
export const error = (state) => state.articles.error;
export const numberOfArticlesPerPage = (state) =>
  state.articles.numberOfArticlesPerPage;
export const currentPage = (state) => state.articles.currentPage;
export const sortArticlesBy = (state) => state.articles.sortBy;
