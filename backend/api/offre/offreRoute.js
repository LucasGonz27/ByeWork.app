const express = require('express');
const router = express.Router();
const OffreController = require('./offreController');

router.get('/', OffreController.GetAllOffres);

router.get('/id/:id', OffreController.GetOffreById);

module.exports = router;