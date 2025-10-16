const db = require('../config/db');

class Entreprise {


    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM entreprise');
            return rows;
        } catch (err) {
            throw err;
        }
    }


    static async getById(id) {
        try {
            const [result] = await db.query('SELECT * from entreprise WHERE idEntreprise = ?', [id]);
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    static async getOffreByEntreprise(id) {
        try {
            const [rows] = await db.query('SELECT * from view_offres_entreprises WHERE idEntreprise = ?', [id]);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async create(nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone) {
        try {
            const [result] = await db.query(
                'INSERT INTO entreprise (nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [nom, image, description, avantages, email, domaine_activite, chiffre_affaire, mdp, taille, annee_fondation, adr_rue, adr_ville, adr_postal, telephone]
            );
            return result.affectedRows;
        } catch (err) {
            throw err;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM entreprise WHERE idEntreprise = ?', [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }

    static async update(idEntreprise, nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone){
        try {
            const[result] = await db.query('UPDATE entreprise SET nom = ?, image = ?, description = ?, avantages = ?, email = ?, domaine_activite = ?, chiffre_affaire = ?, mdp = ?, taille = ?, annee_fondation = ?, adr_rue = ?, adr_ville = ?, adr_postal = ?, telephone = ? WHERE idEntreprise = ?', [nom, image,description,avantages,email,domaine_activite,chiffre_affaire,mdp,taille, annee_fondation,adr_rue,adr_ville,adr_postal,telephone, idEntreprise]);
            return result.affectedRows; 
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Entreprise;
