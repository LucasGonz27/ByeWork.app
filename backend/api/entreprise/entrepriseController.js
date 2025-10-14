const db = require('../../config/db');
const Entreprise = require('../../models/entrepriseModel');

class EntrepriseController {

  static async GetAllEntreprises(req, res) {
    try {
      const rows = await Entreprise.getAll();
      res.status(200).json({
        success: true,
        count: rows.length,  
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des entreprises',
        error: error.message
      });
    }
  }

  static async GetEntrepriseById(req, res) {
        const { id } = req.params;
        try {
            const entreprise = await Entreprise.getById(id);
            if (!entreprise) {
                return res.status(404).json({
                    success: false,
                    message: 'Entreprise non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                data: entreprise,
                message: 'Entreprise récupérée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de l\'entreprise',
                error: error.message
            });
        }
    }

    static async GetOffresByEntreprise(req, res) {
        const { id } = req.params;
        try {
            const offres = await Entreprise.getOffreByEntreprise(id);
            res.status(200).json({
                success: true,
                count: offres.length,
                data: offres
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

module.exports = EntrepriseController;
