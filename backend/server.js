const express = require('express');
const port = process.env.PORT ||5000

const server = express();

const usersRoute = require('./api/utilisateurs/usersRoute');
const adminRoute = require('./api/admin/adminRoute');
const candidatureRoute = require('./api/candidature/candidatureRoute');
const entrepriseRoute = require('./api/entreprise/entrepriseRoute');
const offreRoute = require('./api/offre/offreRoute');
const suivi_candidatureRoute = require('./api/suivi_candidature/suivi_candidatureRoute');

server.use('/ApiByeWork/utilisateurs', usersRoute);
server.use('/ApiByeWork/admin', adminRoute);
server.use('/ApiByeWork/candidature', candidatureRoute);
server.use('/ApiByeWork/entreprise', entrepriseRoute);
server.use('/ApiByeWork/offre', offreRoute);
server.use('/ApiByeWork/suivi_candidature', suivi_candidatureRoute);

server.listen(port, () => {
    console.log("Serveur en ligne sur le port : " + port)
})




