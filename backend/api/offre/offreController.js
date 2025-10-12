const Offre = require('../../models/offreModel');

class OffreController {

    static async GetAllOffres(req, res) {
        try {
            const offres = await Offre.getAll();
            res.status(200).json({
                success: true,
                data: offres,
                count : offres.length,
                message: 'Offres récupérées avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des offres',
                error: error.message
            });
        }
    }

}

module.exports = OffreController;

        
