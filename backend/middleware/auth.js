const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.cookies.authToken;

  if (!token) {
    token = req.header('Authorization')?.replace('Bearer ', '');
  }

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Accès refusé, token manquant' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clef_du_chef_super_secrete');
    req.user = decoded;

    // Bloquer les tricheurs
    if (req.baseUrl.includes('/admins') && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé : réservé aux administrateurs'
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      message: 'Token invalide' 
    });
  }
};

module.exports = authMiddleware;
