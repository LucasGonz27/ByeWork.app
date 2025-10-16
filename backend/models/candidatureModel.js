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

    static async create(idUtilisateur , idOffre, date, message){
        try {
            const [rows] = await db.query('INSERT INTO candidature (idUtilisateur , idOffre, date, message) VALUES (?, ?, ?, ?)',
            [idUtilisateur , idOffre, date, message]);
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async getByIdUtilisateur(id) {
        try {
            const [rows] = await db.query('SELECT * FROM candidature WHERE idUtilisateur = ?', [id]);
            return rows;
        } catch (err) {
            throw err;
        }
    }
    
}

module.exports = Candidature;
