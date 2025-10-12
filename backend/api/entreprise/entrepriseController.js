const db = require('../../config/db');

class EntrepriseController {

  static async GetAllEntreprises(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM entreprise');
      res.status(200).json({
        success: true,
        count: rows.length,  
        data: rows
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des entreprises',
        error: error.message
      });
    }
  }

  
  
}

module.exports = EntrepriseController;
