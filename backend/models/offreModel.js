const db = require('../config/db');

class Offre {
    static async getAll() {
        try {
            const [result] = await db.query('SELECT * FROM view_offres_entreprises');
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async getById(id) {
        try {
            const [result] = await db.query('SELECT * from view_offres_entreprises WHERE idOffre = ?', [id]);
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    static async create(idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min , salaire_max , date_publi , experience_requise , niveau_etude, statut = 'publiée') {
        try {
            const [result] = await db.query(
                'INSERT INTO offres (idEntreprise, titre, lieu, description, mission_offre, profil_recherch, description_poste, type_contrat, salaire_min, salaire_max, date_publi, experience_requise, niveau_etude, statut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min , salaire_max , date_publi , experience_requise , niveau_etude, statut]
            );
            return { id: result.insertId, idEntreprise, titre , lieu ,description , mission_offre , profil_recherch , description_poste , type_contrat , salaire_min , salaire_max , date_publi , experience_requise , niveau_etude, statut };
        } catch (err) {
            throw err;
        }
    }

  
}

module.exports = Offre;