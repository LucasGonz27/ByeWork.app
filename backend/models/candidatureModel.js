const db = require('../config/db');

class Candidature {

    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM candidature');
            return rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Candidature;
