const express = require('express');
const router = express.Router();
const UsersController = require('./usersController');

// Routes pour les utilisateurs
router.get('/', UsersController.getAllUsers);

router.get('/email/:email', UsersController.getUserByEmail);

router.post('/newUser', UsersController.createUser);

router.post('/connexion', UsersController.connexionUser);

router.delete('/delete/:id', UsersController.deleteUser);

router.put('/update/:id', UsersController.updateUser);

module.exports = router;