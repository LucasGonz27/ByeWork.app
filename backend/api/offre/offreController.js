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

    static async GetOffreById(req, res) {
        const { id } = req.params;
        try {
            const offre = await Offre.getById(id);
            if (!offre) {
                return res.status(404).json({
                    success: false,
                    message: 'Offre non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                data: offre,
                message: 'Offre récupérée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'offre',
                error: error.message
            });
        }
    }

}

module.exports = OffreController;

        
