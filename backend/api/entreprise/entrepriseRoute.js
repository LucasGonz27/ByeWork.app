const express = require('express');
const router = express.Router();
const EntrepriseController = require('./entrepriseController');

router.get("/", EntrepriseController.GetAllEntreprises);

module.exports = router;