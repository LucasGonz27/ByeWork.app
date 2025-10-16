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

    static async CreateOffre(req, res) {
        const { idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min , salaire_max , date_publi , experience_requise , niveau_etude } = req.body;
        try {
            const newOffre = await Offre.create(idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min , salaire_max , date_publi , experience_requise , niveau_etude);
            res.status(201).json({
                success: true,
                data: newOffre,
                message: 'Offre créée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la création de l\'offre',
                error: error.message
            });
        }

    }

    static async DeleteOffre(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Offre.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Offre non trouvée'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Offre supprimée avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de l\'offre',
                error: error.message
            });
        }
    }

    static async UpdateOffre(req, res) {
        const { id } = req.params;
        const { idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min ,salaire_max , date_publi , experience_requise , niveau_etude, statut} = req.body;
        try {
            const updated = await Offre.update(id, idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min ,salaire_max , date_publi , experience_requise , niveau_etude, statut);
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: 'Offre non trouvée ou pas de modifications'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Offre mise à jour avec succès'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la mise à jour de l\'offre',
                error: error.message
            });
        }
    }

}

module.exports = OffreController;

        
