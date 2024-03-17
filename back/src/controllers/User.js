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
      console.log(existingUser);
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
      console.log(user);
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

  checkAuth = async (req, res) => {
    const { email, token } = req.body;
    try {
      const user = await NewUser.findOne({ email: email });
      if (!user) {
        return res.status(401).send('Utilisateur non reconnu');
      }

      // Vérifier les informations du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      if (!decoded || decoded.email !== user.email) {
        return res.status(401).send('Token invalide');
      } else if (!decoded.role.includes('admin')) {
        return res.status(403).send(`Accès non authorisé`);
      }
      res.status(200).send('Token valide');
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
      const { currentEmail, firstName, lastName, email } = req.body;

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
        return res.status(404).send('Utilisateur non trouvé avec cet email.');
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
}

module.exports = User;
