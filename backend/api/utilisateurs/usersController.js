const Utilisateur = require('../../models/usersModel');

class UsersController {

    static async getAllUsers(req, res) {
        try {
            const users = await Utilisateur.getAll();
            res.status(200).json({
                success: true,
                data: users,
                count: users.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des utilisateurs',
                error: error.message
            });
        }
    }

}

module.exports = UsersController;
