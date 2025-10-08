const express = require('express');
const router = express.Router();
const UsersController = require('./usersController');

// Routes pour les utilisateurs
router.get('/', UsersController.getAllUsers);
  

module.exports = router;