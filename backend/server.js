const express = require('express');
const port = process.env.PORT ||5000

const server = express();
const cors = require('cors');

server.use(cors({
  origin: 'http://localhost:5173'
}));


const usersRoute = require('./api/utilisateurs/usersRoute');
const adminRoute = require('./api/admin/adminRoute');
const candidatureRoute = require('./api/candidature/candidatureRoute');
const entrepriseRoute = require('./api/entreprise/entrepriseRoute');
const offreRoute = require('./api/offre/offreRoute');


server.use('/ApiByeWork/utilisateurs', usersRoute);
server.use('/ApiByeWork/admins', adminRoute);
server.use('/ApiByeWork/candidatures', candidatureRoute);
server.use('/ApiByeWork/entreprises', entrepriseRoute);
server.use('/ApiByeWork/offres', offreRoute);

server.listen(port, () => {
    console.log("Serveur en ligne sur le port : " + port)
})




