const express = require('express');
const router = express.Router();
const AdminController = require('./adminController');

router.get("/", AdminController.GetAllAdmins);


module.exports = router;