const Candidature = require('../../models/candidatureModel');

class CandidatureController {

    static async GetAllCandidatures(req, res) {
        try {
            const candidatures = await Candidature.getAll();
            res.status(200).json({
                success: true,
                data: candidatures,
                message: 'Candidatures récupérées avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des candidatures',
                error: error.message
            });
        }
    }

    static async GetCandidatureById(req, res) {
        try {
            const { id } = req.params;
            const candidature = await Candidature.getByIdUtilisateur(id);
            if (!candidature) {
                return res.status(404).json({
                    success: false,
                    message: 'Candidature non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                data: candidature,
                message: 'Candidature récupérée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de la candidature',
                error: error.message
            });
        }
    }

    static async CreateCandidature(req, res) {
        
        try {
            // Récupérer l'ID utilisateur depuis le token d'authentification
            const idUtilisateur = req.user.id;
            const { idOffre, date, message } = req.body;
            const newCandidature = await Candidature.create(idUtilisateur , idOffre, date, message);
            res.status(201).json({
                success: true,
                data: newCandidature,
                message: 'Candidature créée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de la candidature',
                error: error.message
            });
        }
    }

    static async DeleteCandidature(req, res) {
        try {
            const { id } = req.params;
            const result = await Candidature.delete(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Candidature non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Candidature supprimée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de la candidature',
                error: error.message
            });
        }   
    }

    static async UpdateCandidature(req, res) {
        try {
            const { id } = req.params;   
            const { idUtilisateur , idOffre, date, message } = req.body;
            const update = await Candidature.update(id, idUtilisateur , idOffre, date, message);
            if (!update) {
                return res.status(404).json({
                    success: false,
                    message: 'Candidature non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Candidature mise à jour avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de la candidature',
                error: error.message
            });
        }
    }

}

module.exports = CandidatureController;
