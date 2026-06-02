const db = require('../db/database');

const findByUsername = (username) =>
    db.prepare('SELECT * FROM users WHERE username = ?').get(username);

const findById = (id) =>
    db.prepare('SELECT * FROM users WHERE id = ?').get(id);

const create = (username, passwordHash, migrated = 0) =>
    db.prepare(
        'INSERT INTO users (username, password_hash, migrated) VALUES (?, ?, ?)'
    ).run(username, passwordHash, migrated);

const updateLastLogin = (id) =>
    db.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?").run(id);

module.exports = { findByUsername, findById, create, updateLastLogin };
