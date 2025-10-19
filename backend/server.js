const express = require('express');
const port = process.env.PORT ||5000

const server = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/auth');
const corsMiddleware = require('./middleware/cors');
const { generalLimiter } = require('./middleware/rateLimit');

// Middleware CORS personnalisé
server.use(corsMiddleware);

// Middleware pour parser le JSON et les cookies
server.use(express.json());
server.use(cookieParser());

// Middleware de rate limiting
server.use(generalLimiter);

// Middleware de logging
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


const usersRoute = require('./api/utilisateurs/usersRoute');
const adminRoute = require('./api/admin/adminRoute');
const candidatureRoute = require('./api/candidature/candidatureRoute');
const entrepriseRoute = require('./api/entreprise/entrepriseRoute');
const offreRoute = require('./api/offre/offreRoute');


// Routes publiques
server.use('/ApiByeWork/utilisateurs', usersRoute);
server.use('/ApiByeWork/offres', offreRoute);

// Routes protégées (nécessitent une authentification)
server.use('/ApiByeWork/admins', authMiddleware, adminRoute);
server.use('/ApiByeWork/candidatures', authMiddleware, candidatureRoute);
server.use('/ApiByeWork/entreprises', authMiddleware, entrepriseRoute);

server.listen(port, () => {
    console.log("Serveur en ligne sur le port : " + port)
})




