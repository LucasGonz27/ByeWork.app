const express = require('express');
const router = express.Router();
const CandidatureController = require('./candidatureController');
const authMiddleware = require('../../middleware/auth');

router.get("/", CandidatureController.GetAllCandidatures);

router.get("/:id", CandidatureController.GetCandidatureById);

router.post("/create", authMiddleware, CandidatureController.CreateCandidature);

router.delete("/delete/:id", authMiddleware, CandidatureController.DeleteCandidature);

router.put("/update/:id", authMiddleware, CandidatureController.UpdateCandidature);

module.exports = router;