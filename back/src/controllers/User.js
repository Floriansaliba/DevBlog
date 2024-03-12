const NewUser = require('../repositories/NewUser');
const bcrypt = require('bcryptjs');
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
        console.error('Aucun utilisateur trouvé avec cet email');
        return res.redirect('/login');
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        console.log(user.firstName, user.lastName, user.email);
      }
      res.status(200).send('User successfully logged in');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while logging the user');
    }
  };
}

module.exports = User;
