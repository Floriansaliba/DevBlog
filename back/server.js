const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./app/routes');
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');

//--------------------------------------------------------------------
//     Utiliser CORS pour toutes les routes
//--------------------------------------------------------------------
app.use(cors());

//--------------------------------------------------------------------
//     Récupérer les requêtes au format JSON
//--------------------------------------------------------------------
app.use(express.json({ limit: '50mb' }));

//--------------------------------------------------------------------
//      Création d'un répertoire static pour les images
//--------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------
//      Connection à Mongodb
//--------------------------------------------------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à la DB!'))
  .catch((err) => console.error(err));

//--------------------------------------------------------------------
//      Chargement des routes
//--------------------------------------------------------------------
routes(app);

//--------------------------------------------------------------------
//     Ecoute du serveur HTTP
//--------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
