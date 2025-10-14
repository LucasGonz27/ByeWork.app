const db = require('../config/db');

class Utilisateur {

    // Créer un nouvel utilisateur
    static async create(prenom, nom, email, mdp, telephone, ville, role = "user") {
        try {
            const [rows] = await db.query(
                'INSERT INTO users (prenom, nom, email, mdp, telephone, ville, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [prenom, nom, email, mdp, telephone, ville, role]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    }

    static async connexion(email, mdp) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM users WHERE email = ? AND mdp = ? AND role = "user"', [email, mdp]
            );
            return rows[0];
        } catch (err) {
            throw err;
        }
    }


    // Récupérer tous les utilisateurs
    static async getAll() {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE role = "user"');
            return rows;
        } catch (err) {
            throw err;
        }
    }

    // Récupérer un utilisateur par email
    static async getByEmail(email) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    }

    
    static async delete(id){
        try {
            const [result] = await db.query('DELETE FROM users WHERE idUtilisateur = ?', [id]);
            return result.affectedRows; // Retourne le nombre de lignes supprimées
        } catch (err) {
            throw err;
        }
    
    }
    static async update(id, prenom, nom, email, mdp, telephone, ville, role = "user"){
        try {
            const[result] = await db.query('UPDATE users SET prenom = ?, nom = ?, email = ?, mdp = ?, telephone = ?, ville = ?, role = ? WHERE idUtilisateur = ?', [prenom, nom, email, mdp, telephone, ville, role, id]);
            return result.affectedRows; // Retourne le nombre de lignes mises à jour
        } catch (err) {
            throw err;
        }
    }

}


module.exports = Utilisateur;