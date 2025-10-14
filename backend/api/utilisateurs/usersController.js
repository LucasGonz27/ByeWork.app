const Utilisateur = require('../../models/usersModel');

class UsersController {

    static async getAllUsers(req, res) {
        try {
            const users = await Utilisateur.getAll();
            res.status(200).json({
                success: true,
                data: users,
                message: 'Utilisateurs récupérés avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des utilisateurs',
                error: error.message
            });
        }
    }
    

    static async getUserByEmail(req, res) {
        try {
            const email = req.params.email;
            const user = await Utilisateur.getByEmail(email);
            if (user) {
                res.status(200).json({
                    success: true,
                    data: user,
                    message: 'Utilisateur récupéré avec succès'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Utilisateur non trouvé'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'utilisateur',
                error: error.message
            });
        }
    }

    static async createUser(req, res) {
        try {
            const {prenom,nom,email,mdp,telephone,ville,role} = req.body;
            const newUser = await Utilisateur.create(prenom, nom, email, mdp, telephone, ville, role);
            res.status(201).json({
                success: true,
                data: newUser,
                message: 'Utilisateur créé avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de l\'utilisateur',
                error: error.message
            });
        }
    }

    static async connexionUser(req, res) {
        try {
            const {email, mdp} = req.body;
            const user = await Utilisateur.connexion(email, mdp);
            if (user) {
                res.status(200).json({
                    success: true,
                    data: user,
                    message: 'Connexion réussie'
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Email ou mot de passe incorrect'
                });
            }   
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la connexion',
                error: error.message
            });
        }
    }

    static async deleteUser(req, res){
        try {
            const id = req.params.id;
            const result = await Utilisateur.delete(id);
            if(result){
                res.status(200).json({
                    success: true,
                    data: result,
                    message: 'Utilisateur supprimé avec succès'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Utilisateur non trouvé'
                });
            } 

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de l\'utilisateur',
                error: error.message
            });
        }
    }

    static async updateUser(req, res){
        try {
            const id = req.params.id;
            const {prenom, nom, email, mdp, telephone, ville, role} = req.body;
            const user = await Utilisateur.update(id, prenom, nom, email, mdp, telephone, ville, role);
            if(user){
                res.status(200).json({
                    success: true,
                    data: user,
                    message: 'Utilisateur mis à jour avec succès'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Utilisateur non trouvé'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de l\'utilisateur',
                error: error.message
            });
        }
    }

}

module.exports = UsersController;
