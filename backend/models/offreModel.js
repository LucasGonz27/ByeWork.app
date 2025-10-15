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

  
}

module.exports = Offre;