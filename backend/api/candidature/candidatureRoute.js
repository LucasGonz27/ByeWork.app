const express = require('express');
const router = express.Router();
const CandidatureController = require('./candidatureController');
router.get("/", CandidatureController.GetAllCandidatures);

module.exports = router;