const Article = require('../src/controllers/Article');
const User = require('../src/controllers/User');

const routes = (app) => {
  app.post('/new-article', new Article().postArticle);
  app.get('/articles', new Article().getArticles);
  app.post('/subscribe', new User().subscribe);
};

module.exports = routes;
