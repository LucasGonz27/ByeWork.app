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

}

module.exports = CandidatureController;
