const Article = require('../src/controllers/Article');

const routes = (app) => {
  app.post('/new-article', new Article().postArticle);
};

module.exports = routes;
