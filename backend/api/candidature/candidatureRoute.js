const express = require('express');
const router = express.Router();
const CandidatureController = require('./candidatureController');

router.get("/", CandidatureController.GetAllCandidatures);

router.get("/:id", CandidatureController.GetCandidatureById);

router.post("/create", CandidatureController.CreateCandidature);

router.delete("/delete/:id", CandidatureController.DeleteCandidature);

router.put("/update/:id", CandidatureController.UpdateCandidature);

module.exports = router;