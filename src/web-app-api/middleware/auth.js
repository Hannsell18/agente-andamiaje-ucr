const authService = require('../services/authService');

const requireAuth = (req, res, next) => {
    const header = req.headers['authorization'] || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    const payload = authService.verify(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido o expirado' });

    req.user = payload;
    next();
};

// Middleware opcional: no bloquea si no hay token, pero parsea el usuario si viene
const optionalAuth = (req, res, next) => {
    const header = req.headers['authorization'] || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    req.user = token ? authService.verify(token) : null;
    next();
};

module.exports = { requireAuth, optionalAuth };
