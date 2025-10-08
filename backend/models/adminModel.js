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
}

module.exports = Admin;
