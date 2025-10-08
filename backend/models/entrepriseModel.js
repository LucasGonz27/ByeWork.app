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
}

module.exports = Entreprise;
