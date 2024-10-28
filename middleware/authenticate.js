// authenticate.js
const jwt = require('jsonwebtoken');
const dataLogin = require('../utils/dataLogin');
const User = require('../models/User');

// Middleware d'authentification JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if (!token) {
        return res.status(400).json({ message: 'Token non fourni' });
    }

    const JWT_SECRET = process.env.JWT_SECRET; // Clé secrète depuis le fichier .env
    
    jwt.verify(token, JWT_SECRET, (err, decrypted) => {
        if (!err) {
            const idUser = decrypted.id;
            const user = User.findById(idUser);
            
            if (user) {
                req.user = user;
                return next();
            } 
            return res.status(400).json({ message: "L'utilisateur n'existe pas" });
        } else {
            return res.status(400).json({ message: 'Token invalide' });
        }
    });
};

module.exports = authenticateJWT;
