const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Accès refusé, token manquant' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Token invalide' 
    });
  }
};

module.exports = authMiddleware;
