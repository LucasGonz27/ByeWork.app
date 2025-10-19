const express = require('express');
const router = express.Router();
const EntrepriseController = require('./entrepriseController');
const authMiddleware = require('../../middleware/auth');

// Routes publiques (lecture seule)
router.get("/", EntrepriseController.GetAllEntreprises);
router.get("/id/:id", EntrepriseController.GetEntrepriseById);
router.get("/offres/:id", EntrepriseController.GetOffresByEntreprise);

// Routes protégées (modification des données)
router.post("/create", authMiddleware, EntrepriseController.CreateEntreprise);
router.delete("/delete/:id", authMiddleware, EntrepriseController.DeleteEntreprise);
router.put("/update/:id", authMiddleware, EntrepriseController.UpdateEntreprise);

module.exports = router;