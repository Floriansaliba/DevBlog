const Article = require('../src/controllers/Article');
const User = require('../src/controllers/User');

const routes = (app) => {
  // Publication d'un article
  app.post('/new-article', new Article().postArticle);
  // Récupération de tous les articles
  app.get('/articles', new Article().getArticles);
  // Récupération d'un article
  app.get('/articles/:articleId', new Article().getArticle);
  // Ajout d'une vue à l'article
  app.get('/articles/:articleId/addView', new Article().addView);
  // Ajout d'un like à l'article
  app.get('/articles/:articleId/addLike', new Article().addLike);
  // Retrait d'un like à l'article
  app.get('/articles/:articleId/addDislike', new Article().addDislike);
  // Suppression d'un article
  app.delete('/articles/:articleId/delete', new Article().deleteArticle);
  // Modification d'un article
  app.put('/articles/:articleId/modify', new Article().modifyArticle);
  // Inscription d'un nouvel utilisateur
  app.post('/subscribe', new User().subscribe);
  // Connexion d'un utilisateur
  app.post('/login', new User().login);
  // Vérification de l'authentification
  app.post('/checkAuth', new User().checkAuth);
  // Enregistrement d'un article dans les préférencs d'un lecteur
  app.post('/saveArticle', new User().saveArticle);
  //Modification d'un profil utilisateur
  app.put('/user/update', new User().updateUser);
  // Suppression d'un utilisateur
  app.delete('/user/delete', new User().deleteUser);
  // Récupération des articles préférés d'un lecteur
  app.post('/user/preferences', new User().getUserPreferences);
  // Suppression d'un article des préférences d'un lecteur
  app.delete(
    '/user/preferences/deleteArticle',
    new User().deleteArticleFromPreferences
  );
  // Ajout d'un article dans les likes d'un lecteur
  app.put('/user/addLike', new User().addLike);
  // Retrait d'un article dans les likes d'un lecteur
  app.put('/user/dislike', new User().removeLike);
};

module.exports = routes;
