//Déclaration des constantes pour récupèrer les plug-ins express, helemt et MongoDB
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

//On défini les routes en allant chercher dans le dossier routes les fichiers user et sauce
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//On déclare la constante app pour utiliser express
const app = express();

//On déclare la constante path pour rendre notre dossier images statiques est éviter une erreur 404
const path = require('path');

/* On déclare la constante pour aller chercher le fichier de configuration de dotenv(fichier .env) pour rendre les données de connexion MongoDB sécurisées
Puis on déclare la constante uri pour connecter le projet à la base de donnée MongoDB  */
const env = require('dotenv').config();
const uri = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@${process.env.ACCESSMONGO}/${process.env.DB}?retryWrites=true&w=majority`;

mongoose.connect(`${uri}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use(express.json());
  app.use(helmet({crossOriginResourcePolicy:{policy:"same-site"}}));
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;