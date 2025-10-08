const express = require('express');
const router = express.Router();
const OffreController = require('./offreController');

router.get('/', OffreController.GetAllOffres);

module.exports = router;