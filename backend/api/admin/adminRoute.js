const express = require('express');
const router = express.Router();
const AdminController = require('./adminController');

router.get("/", AdminController.GetAllAdmins);

router.delete("/delete/:id", AdminController.DeleteAdmin);

router.put("/update/:id", AdminController.UpdateAdmin);

router.post("/create", AdminController.CreateAdmin);


module.exports = router;