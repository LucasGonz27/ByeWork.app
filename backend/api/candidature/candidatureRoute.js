const express = require('express');
const router = express.Router();
const CandidatureController = require('./candidatureController');

router.get("/", CandidatureController.GetAllCandidatures);

router.get("/:id", CandidatureController.GetCandidatureById);

router.post("/create", CandidatureController.CreateCandidature);

module.exports = router;