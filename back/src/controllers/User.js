const NewUser = require('../repositories/NewUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class User {
  subscribe = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new NewUser();
      newUser.lastName = lastName.toLowerCase();
      newUser.firstName = firstName.toLowerCase();
      newUser.email = email.toLowerCase();
      newUser.password = hash;

      await newUser.save();

      res.status(200).send('User successfully registered');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while registering the user');
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await NewUser.findOne({ email: email });
      if (!user) {
        return res.status(401).send('Utilisateur non reconnu');
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .send({ message: 'Connexion réussie', token: token, user: user });
        console.log('logged');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur interne est survenue');
    }
  };
}

module.exports = User;
