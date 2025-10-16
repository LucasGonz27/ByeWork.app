const db = require('../config/db');

class Admin {
    static async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM users WHERE role = 'admin'");
            return rows;
        } catch (error) {
            throw error;
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
    static async update(id, prenom, nom, email, mdp, telephone, ville, role = "admin"){
        try {
            const[result] = await db.query('UPDATE users SET prenom = ?, nom = ?, email = ?, mdp = ?, telephone = ?, ville = ?, role = ? WHERE idUtilisateur = ?', [prenom, nom, email, mdp, telephone, ville, role, id]);
            return result.affectedRows; // Retourne le nombre de lignes mises à jour
        } catch (err) {
            throw err;
        }
    }

     static async create(prenom, nom, email, mdp, telephone, ville, role = "admin" , idEntreprise) {
        try {
            const [rows] = await db.query(
                'INSERT INTO users (prenom, nom, email, mdp, telephone, ville, role, idEntreprise) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [prenom, nom, email, mdp, telephone, ville, role, idEntreprise]
            );
            return rows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Admin;
