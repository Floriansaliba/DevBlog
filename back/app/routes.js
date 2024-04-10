const Article = require('../src/controllers/Article');
const User = require('../src/controllers/User');

const routes = (app) => {
  app.get('/test', new User().checkAuth);
  app.get('/test2', new User().checkAdminAuth);
  // Publication d'un article
  app.post(
    '/new-article',
    new User().checkAdminAuth,
    new Article().postArticle
  );
  // Récupération de tous les articles
  app.get('/articles', new Article().getArticles);
  // Récupération d'un article
  app.get('/articles/:articleId', new Article().getArticle);
  // Ajout d'une vue à l'article
  app.get('/articles/:articleId/addView', new Article().addView);
  // Ajout d'un like à l'article
  app.get(
    '/articles/:articleId/addLike',
    new User().checkAuth,
    new Article().addLike
  );
  // Retrait d'un like à l'article
  app.get(
    '/articles/:articleId/addDislike',
    new User().checkAuth,
    new Article().addDislike
  );
  // Suppression d'un article
  app.delete(
    '/articles/:articleId/delete',
    new User().checkAdminAuth,
    new Article().deleteArticle
  );
  // Modification d'un article
  app.put(
    '/articles/:articleId/modify',
    new User().checkAdminAuth,
    new Article().modifyArticle
  );
  // Inscription d'un nouvel utilisateur
  app.post('/subscribe', new User().subscribe);
  // Connexion d'un utilisateur
  app.post('/login', new User().login);

  // Vérification de l'authentification de l'admin
  app.get('/adminAccess', new User().adminAccess);
  // Enregistrement d'un article dans les préférences d'un lecteur
  app.post('/saveArticle', new User().checkAuth, new User().saveArticle);
  //Modification d'un profil utilisateur
  app.put('/user/update', new User().checkAuth, new User().updateUser);
  // Suppression d'un utilisateur
  app.delete('/user/delete', new User().checkAuth, new User().deleteUser);
  // Récupération des articles préférés d'un lecteur
  app.post(
    '/user/preferences',
    new User().checkAuth,
    new User().getUserPreferences
  );
  // Suppression d'un article des préférences d'un lecteur
  app.delete(
    '/user/preferences/deleteArticle',
    new User().checkAuth,
    new User().deleteArticleFromPreferences
  );
  // Ajout d'un article dans les likes d'un lecteur
  app.put('/user/addLike', new User().checkAuth, new User().addLike);
  // Retrait d'un article dans les likes d'un lecteur
  app.put('/user/dislike', new User().checkAuth, new User().removeLike);
};

module.exports = routes;
