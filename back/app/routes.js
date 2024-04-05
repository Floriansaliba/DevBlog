const Article = require('../src/controllers/Article');
const User = require('../src/controllers/User');

const routes = (app) => {
  app.post('/new-article', new Article().postArticle);
  app.get('/articles', new Article().getArticles);
  app.get('/articles/:articleId', new Article().getArticle);
  app.get('/articles/:articleId/addView', new Article().addView);
  app.get('/articles/:articleId/addLike', new Article().addLike);
  app.get('/articles/:articleId/addDislike', new Article().addDislike);
  app.delete('/articles/:articleId/delete', new Article().deleteArticle);
  app.put('/articles/:articleId/modify', new Article().modifyArticle);
  app.post('/subscribe', new User().subscribe);
  app.post('/login', new User().login);
  app.post('/checkAuth', new User().checkAuth);
  app.post('/saveArticle', new User().saveArticle);
  app.put('/user/update', new User().updateUser);
  app.delete('/user/delete', new User().deleteUser);
  app.post('/user/preferences', new User().getUserPreferences);
  app.delete(
    '/user/preferences/deleteArticle',
    new User().deleteArticleFromPreferences
  );
  app.put('/user/addLike', new User().addLike);
  app.put('/user/dislike', new User().removeLike);
};

module.exports = routes;
