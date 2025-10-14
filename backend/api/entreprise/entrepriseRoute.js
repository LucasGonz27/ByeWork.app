const express = require('express');
const router = express.Router();
const EntrepriseController = require('./entrepriseController');

router.get("/", EntrepriseController.GetAllEntreprises);

router.get("/id/:id", EntrepriseController.GetEntrepriseById);

router.get("/offres/:id", EntrepriseController.GetOffresByEntreprise);
 

module.exports = router;