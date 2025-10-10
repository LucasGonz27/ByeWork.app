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
}

module.exports = Offre;