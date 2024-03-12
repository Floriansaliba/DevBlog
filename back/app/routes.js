const Article = require('../src/controllers/Article');

const routes = (app) => {
  app.post('/new-article', new Article().postArticle);
  app.get('/articles', new Article().getArticles);
};

module.exports = routes;
