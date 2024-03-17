const Article = require('../src/controllers/Article');
const User = require('../src/controllers/User');

const routes = (app) => {
  app.post('/new-article', new Article().postArticle);
  app.get('/articles', new Article().getArticles);
  app.get('/articles/:articleId/addView', new Article().addView);
  app.get('/articles/:articleId/addLike', new Article().addLike);
  app.post('/subscribe', new User().subscribe);
  app.post('/login', new User().login);
  app.post('/checkAuth', new User().checkAuth);
  app.post('/saveArticle', new User().saveArticle);
  app.put('/user/update', new User().updateUser);
};

module.exports = routes;
