const Entreprise = require('../../models/entrepriseModel');

class EntrepriseController {

    static async GetAllEntreprises(req, res) {
        try {
            const entreprises = await Entreprise.getAll();
            res.status(200).json({
                success: true,
                data: entreprises,
                message: 'Entreprises récupérées avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des entreprises',
                error: error.message
            });
        }
    }

}

module.exports = EntrepriseController;
