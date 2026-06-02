const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const userRepo = require('../repositories/userRepo');

const JWT_SECRET  = process.env.JWT_SECRET || 'ucr-research-secret-2026';
const JWT_EXPIRES = '30d';

const register = (username, password) => {
    if (!username || !password) throw { status: 400, message: 'username y password requeridos' };
    if (password.length < 6)    throw { status: 400, message: 'La contraseña debe tener al menos 6 caracteres' };
    if (userRepo.findByUsername(username)) throw { status: 409, message: 'El usuario ya existe' };

    const hash   = bcrypt.hashSync(password, 10);
    const result = userRepo.create(username, hash, 0);
    return { id: result.lastInsertRowid, username };
};

const login = (username, password) => {
    const user = userRepo.findByUsername(username);
    if (!user) throw { status: 401, message: 'Usuario o contraseña incorrectos' };
    if (!user.password_hash) throw { status: 401, message: 'Este usuario fue migrado. Contactá al investigador para activar tu cuenta.' };
    if (!bcrypt.compareSync(password, user.password_hash)) throw { status: 401, message: 'Usuario o contraseña incorrectos' };

    userRepo.updateLastLogin(user.id);
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return { token, id: user.id, username: user.username };
};

const verify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
};

module.exports = { register, login, verify };
