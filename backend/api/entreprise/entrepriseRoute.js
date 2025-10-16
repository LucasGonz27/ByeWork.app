const express = require('express');
const router = express.Router();
const EntrepriseController = require('./entrepriseController');

router.get("/", EntrepriseController.GetAllEntreprises);

router.get("/id/:id", EntrepriseController.GetEntrepriseById);

router.get("/offres/:id", EntrepriseController.GetOffresByEntreprise);

router.post("/create", EntrepriseController.CreateEntreprise);

router.delete("/delete/:id", EntrepriseController.DeleteEntreprise);

router.put("/update/:id", EntrepriseController.UpdateEntreprise);
 

module.exports = router;