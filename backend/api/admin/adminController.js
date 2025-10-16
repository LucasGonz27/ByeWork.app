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

    static async DeleteAdmin(req, res) {
        const id = req.params.id;
        try {
            const deleted = await Admin.delete(id);
            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Admin non trouvé'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Admin supprimé avec succès'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de l\'admin',
                error: error.message
            });
        }
    }

    static async UpdateAdmin(req, res) {
        const id = req.params.id;
        const { prenom, nom, email, mdp, telephone, ville } = req.body;
        try {
            const updated = await Admin.update(id, prenom, nom, email, mdp, telephone, ville);
            if (!updated) {
                res.status(404).json({
                    success: false,
                    message: 'Admin non trouvé'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Admin mis à jour avec succès'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de l\'admin',
                error: error.message
            });
        }
    }

    static async CreateAdmin(req, res) {
        const { prenom, nom, email, mdp, telephone, ville, idEntreprise } = req.body;
        try {
            const created = await Admin.create(prenom, nom, email, mdp, telephone, ville, "admin", idEntreprise);
            res.status(201).json({
                success: true,
                message: 'Admin créé avec succès',
                data: created
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de l\'admin',
                error: error.message
            });
        }
    }

}

module.exports = AdminController;
