const rateLimit = require('express-rate-limit');

// Limite de taux pour l'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives par IP
  message: {
    success: false,
    message: 'Trop de tentatives de connexion, réessayez dans 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limite de taux générale
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requêtes par IP 
  message: {
    success: false,
    message: 'Trop de requêtes, réessayez plus tard'
  }
});

module.exports = {
  authLimiter,
  generalLimiter
};
