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

}

module.exports = Entreprise;
