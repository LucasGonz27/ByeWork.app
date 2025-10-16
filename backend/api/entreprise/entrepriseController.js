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

    static async CreateEntreprise(req, res) {
        const { nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone } = req.body;
        try {
            const newEntreprise = await Entreprise.create(nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone);
            res.status(201).json({
                success: true,
                data: newEntreprise,
                message: 'Entreprise créée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de l\'entreprise',
                error: error.message
            });
        }
    }

    static async DeleteEntreprise(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Entreprise.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Entreprise non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Entreprise supprimée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de l\'entreprise',
                error: error.message
            });
        }
    }

    static async UpdateEntreprise(req, res) {
        const { id } = req.params;
        const { nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone } = req.body;        
        try {
            const updated = await Entreprise.update(id, nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone);
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Entreprise non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Entreprise mise à jour avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de l\'entreprise',
                error: error.message
            });
        }
    }
}

module.exports = EntrepriseController;
