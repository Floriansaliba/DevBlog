const NewUser = require('../repositories/NewUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NewArticle = require('../repositories/NewArticle');
class User {
  subscribe = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Début de la validation des données
      const errors = [];
      const nameRegex = /^[a-zA-Z\s]+$/;

      // Validation du prénom
      if (
        !firstName ||
        firstName.length < 2 ||
        firstName.length > 20 ||
        !nameRegex.test(firstName)
      ) {
        errors.push(
          'Le prénom doit être compris entre 2 et 20 caractères, et ne doit pas contenir de caractères speciaux.'
        );
      }

      //Validation du nom
      if (
        !lastName ||
        lastName.length < 2 ||
        lastName.length > 20 ||
        !nameRegex.test(lastName)
      ) {
        errors.push(
          'Le nom doit être compris entre 2 et 20 caractères, et ne doit pas contenir de caractères speciaux.'
        );
      }

      // Validation de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errors.push("L'email n'est pas valide.");
      }

      //Validation de l'unicité de l'email
      const existingUser = await NewUser.findOne({
        email: email.toLowerCase().trim(),
      });

      if (existingUser) {
        errors.push('Cet email est déjà utilisé');
      }

      //Validation du mot de passe
      if (!password || password.length < 8) {
        errors.push('Le mot de passe doit contenir au moins 8 caractères.');
      }

      // Vérification des erreurs
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Fin de validation

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new NewUser();
      newUser.lastName = lastName.toLowerCase().trim();
      newUser.firstName = firstName.toLowerCase().trim();
      newUser.email = email.toLowerCase().trim();
      newUser.password = hash;

      await newUser.save();

      res.status(201).send('Votre compte a bien été créé');
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur interne est survenue');
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    // Validation des données

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      errors.push('Veuillez fournir un email valide.');
    }

    if (!password || typeof password !== 'string') {
      errors.push('Veuillez fournir un mot de passe valide.');
    }

    if (errors.length > 0) {
      return res.status(400).send({ errors });
    }

    try {
      const user = await NewUser.findOne({ email: email });

      if (!user) {
        errors.push('Utilisateur non reconnu ou mot de passe incorrect.');
        return res.status(401).send({ errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.push('Utilisateur non reconnu ou mot de passe incorrect.');
        return res.status(401).send({ errors });
      }
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      // Filtrer les informations du user à transmettre au front
      const userResponse = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
      res.status(200).send({
        message: 'Connexion réussie',
        token: token,
        user: userResponse,
      });
    } catch (error) {
      errors.push('Une erreur interne est survenue.');
      res.status(500).send({ errors });
    }
  };

  // Middleware permettant de vérifier si le user est bien admin

  checkAdminAuth = async (req, res, next) => {
    // Vérifier d'abord si l'en-tête Authorization existe et contenir 'Bearer '
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return res.status(401).send('Authentification requise');
    }
    // Récupérer le token
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).send('Authentification requise');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await NewUser.findOne({ email: decoded.email });
      if (user && user.role.includes('admin')) {
        next();
      } else {
        // Si aucun utilisateur n'est trouve ou que l'utilisateur n'est pas admin
        return res.status(401).send('Token invalide');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Une erreur interne est survenue');
    }
  };

  // Middleware permettant de vérifier si le user est bien connecté

  checkAuth = async (req, res, next) => {
    // Vérifier d'abord si l'en-tête Authorization existe et contenir 'Bearer '
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      return res.status(401).send('Authentification requise');
    }
    // Récupérer le token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send('Authentification requise');
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await NewUser.findOne({ email: decoded.email });
      if (user) {
        next();
      } else {
        // Si aucun utilisateur n'est trouvé
        return res.status(401).send('Token invalide');
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send('Une erreur interne est survenue');
    }
  };

  // Vérifier si l'utilisateur est admin ou non

  adminAccess = async (req, res) => {
    try {
      const headers = req.headers;
      if (
        !headers.authorization ||
        !headers.authorization.startsWith('Bearer ')
      ) {
        return res.status(401).send('Authentification requise');
      }
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).send('Authentification requise');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await NewUser.findOne({ email: decoded.email });

      if (!user) {
        return res.status(401).send('Utilisateur non reconnu');
      }
      if (!user.role.includes('admin')) {
        return res.status(401).send('Utilisateur non admin');
      }
      return res.status(200).send('Accès autorisé');
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur interne est survenue');
    }
  };

  saveArticle = async (req, res) => {
    try {
      const { email, articleId } = req.body;
      const user = await NewUser.findOne({ email: email });
      const article = await NewArticle.findById(articleId);
      if (!user) {
        return res.status(401).send('Utilisateur non reconnu');
      }
      if (!article) {
        return res.status(401).send('Article non reconnu');
      }
      if (!user.preferences.includes(articleId)) {
        user.preferences.push(articleId);
        await user.save();
        res.status(200).send('Article sauvegardé');
      } else {
        res.status(200).send('Article déjà enregistré');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur interne est survenue');
    }
  };

  updateUser = async (req, res) => {
    try {
      const { currentEmail, firstName, lastName, email, password } = req.body;

      // Début de la validation des données
      const errors = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!currentEmail || !emailRegex.test(currentEmail)) {
        errors.push("L'email actuel n'est pas valide.");
      }

      if (email && !emailRegex.test(email)) {
        errors.push("Le nouvel email n'est pas valide.");
      }

      if (firstName && (firstName.length < 2 || firstName.length > 20)) {
        errors.push('Le prénom doit être compris entre 2 et 20 caractères.');
      }

      if (lastName && (lastName.length < 2 || lastName.length > 20)) {
        errors.push('Le nom doit être compris entre 2 et 20 caractères.');
      }

      if (!password) {
        errors.push(
          'Le mot de passe est requis pour confirmer les changements.'
        );
      }
      // Vérifier si le nouvel email est déjà utilisé par un autre utilisateur
      if (email) {
        const emailExist = await NewUser.findOne({
          email: email.toLowerCase().trim(),
        });
        if (
          emailExist &&
          emailExist.email !== currentEmail.toLowerCase().trim()
        ) {
          errors.push('Cet email est déjà utilisé.');
        }
      }

      // Vérification des erreurs
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      // Fin de la validation

      // Recherche de l'utilisateur par currentEmail
      const user = await NewUser.findOne({
        email: currentEmail.toLowerCase().trim(),
      });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé avec cet email');
      }
      // Vérification du mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Mot de passe incorrect.');
      }

      // Mise à jour de l'utilisateur avec les nouvelles données
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email.toLowerCase().trim();

      await user.save(); // Sauvegarde des modifications

      // Filtrer les informations sensibles avant de renvoyer l'utilisateur mis à jour
      const userResponse = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      };

      res.status(200).send({
        user: userResponse,
        message: 'Profil utilisateur mis à jour avec succès.',
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(
          'Une erreur interne est survenue lors de la mise à jour du profil utilisateur.'
        );
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Début de la validation des données
      const errors = [];

      if (!email) {
        errors.push("L'email est requis.");
      }

      if (!password) {
        errors.push('Le mot de passe est requis.');
      }

      // Arrêter ici si des erreurs de validation sont trouvées
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      // Trouver l'utilisateur par email
      const user = await NewUser.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        errors.push('Utilisateur non trouvé avec cet email.');
        return res.status(404).json({ errors });
      }

      // Vérifier que le mot de passe est correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.push('Mot de passe incorrect.');
        return res.status(401).json({ errors });
      }

      // Supprimer l'utilisateur
      await NewUser.findOneAndDelete({ email: email.toLowerCase().trim() });
      res
        .status(200)
        .send({ message: 'Le compte utilisateur a été supprimé avec succès.' });
    } catch (error) {
      console.error(error);
      // En cas d'erreur serveur inattendue, renvoyer également un tableau d'erreurs
      res.status(500).json({
        errors: [
          'Une erreur interne est survenue lors de la tentative de suppression du compte utilisateur.',
        ],
      });
    }
  };

  getUserPreferences = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await NewUser.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé avec cet email');
      }
      res.status(200).send({ preferences: user.preferences });
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue.');
    }
  };

  deleteArticleFromPreferences = async (req, res) => {
    try {
      const { email, articleId } = req.body;

      const user = await NewUser.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé avec cet email');
      }
      user.preferences = user.preferences.filter((id) => id !== articleId);
      await user.save();
      res.status(200).send({ preferences: user.preferences });
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue.');
    }
  };

  addLike = async (req, res) => {
    try {
      const { articleId, userEmail } = req.body;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé avec cet identifiant');
      }

      const user = await NewUser.findOne({
        email: userEmail.toLowerCase().trim(),
      });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé avec cet email');
      }
      if (!user.likes.includes(articleId)) {
        user.likes.push(articleId);
        await user.save();
        return res.status(200).send('Un like ajouté');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`Une erreur est survenue lors de l'ajout du like`);
    }
  };

  removeLike = async (req, res) => {
    try {
      const { articleId, userEmail } = req.body;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé avec cet identifiant');
      }

      const user = await NewUser.findOne({
        email: userEmail.toLowerCase().trim(),
      });
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé avec cet email');
      }
      const index = user.likes.indexOf(articleId);
      if (index > -1) {
        user.likes.splice(index, 1); // Retire l'article des likes
        await user.save();
        return res.status(200).send('Un like retiré');
      } else {
        return res
          .status(404)
          .send("Cet article n'a pas été liké par l'utilisateur");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`Une erreur est survenue lors de la suppression du like`);
    }
  };
}

module.exports = User;
