const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // go recuperer le token depuis les cookies
  let token = req.cookies.authToken;
  
  // Si le cookie pas la il est pas la, essayer l'en-tête Authorization
  if (!token) {
    token = req.header('Authorization')?.replace('Bearer ', '');
  }
  
  console.log('Auth middleware - Token from cookie:', req.cookies.authToken ? 'present' : 'missing');
  console.log('Auth middleware - Token from header:', req.header('Authorization') ? 'present' : 'missing');
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Accès refusé, token manquant' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clef_du_chef_super_secrete');
    console.log('Auth middleware - Token decoded successfully for user:', decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Auth middleware - Token verification failed:', error.message);
    res.status(401).json({ 
      success: false,
      message: 'Token invalide' 
    });
  }
};

module.exports = authMiddleware;
