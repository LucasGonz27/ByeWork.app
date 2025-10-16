const express = require('express');
const router = express.Router();
const OffreController = require('./offreController');

router.get('/', OffreController.GetAllOffres);

router.get('/id/:id', OffreController.GetOffreById);

router.post('/create', OffreController.CreateOffre);

router.post('/delete/:id', OffreController.DeleteOffre);

router.put('/update/:id', OffreController.UpdateOffre);

module.exports = router;