// Middleware permettant de sauvegarder les articles dans le localStorage

const saveArticlesMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'articles/fetchArticles/fulfilled') {
    const currentArticles = store.getState().articles;
    localStorage.setItem('articles', JSON.stringify(currentArticles));
  }
  return result;
};

export default saveArticlesMiddleware;
