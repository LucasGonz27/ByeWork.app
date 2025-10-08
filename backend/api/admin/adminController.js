const Admin = require('../../models/adminModel');

class AdminController {

    static async GetAllAdmins(req, res) {
        try {
            const admins = await Admin.getAll();
            res.status(200).json({
                success: true,
                data: admins,
                message: 'Admins récupérés avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des admins',
                error: error.message
            });
        }
    }

}

module.exports = AdminController;
