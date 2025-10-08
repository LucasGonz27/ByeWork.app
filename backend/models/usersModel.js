const db = require('../config/db');

class Utilisateur {

    // Créer un nouvel utilisateur
    static async create(prenom, nom, email, mdp, telephone, ville, role = "user") {
        try {
            const [result] = await db.query(
                'INSERT INTO users (prenom, nom, email, mdp, telephone, ville, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [prenom, nom, email, mdp, telephone, ville, role]
            );
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Récupérer tous les utilisateurs
    static async getAll() {
        try {
            const [result] = await db.query('SELECT * FROM users');
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Récupérer un utilisateur par email
    static async getByEmail(email) {
        try {
            const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return result[0];
        } catch (err) {
            throw err;
        }
    }

   

  

    
}

module.exports = Utilisateur;