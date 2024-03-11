const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./app/routes');
const mongoose = require('mongoose');
const port = 3000;

//--------------------------------------------------------------------
//     Utiliser CORS pour toutes les routes
//--------------------------------------------------------------------

app.use(cors());

//--------------------------------------------------------------------
//     Récupérer les requêtes au format JSON
//--------------------------------------------------------------------

app.use(express.json({ limit: '50mb' }));

//--------------------------------------------------------------------
//      Connection à Mongodb
//--------------------------------------------------------------------

const uri =
  'mongodb+srv://Flo:16111988@cluster0.0rxry7j.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri)
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
