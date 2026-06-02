const db = require('../db/database');

const stateFromCount = (count) => {
    if (count >= 3) return 'dominado';
    if (count >= 1) return 'en_progreso';
    return 'requiere_apoyo';
};

const upsert = (userId, concept) => {
    const existing = db.prepare(
        'SELECT evidence_count FROM student_concepts WHERE user_id = ? AND concept = ?'
    ).get(userId, concept);

    if (existing) {
        const newCount = existing.evidence_count + 1;
        db.prepare(`
            UPDATE student_concepts
            SET evidence_count = ?, state = ?, last_updated = datetime('now')
            WHERE user_id = ? AND concept = ?
        `).run(newCount, stateFromCount(newCount), userId, concept);
    } else {
        db.prepare(`
            INSERT INTO student_concepts (user_id, concept, state, evidence_count)
            VALUES (?, ?, 'en_progreso', 1)
        `).run(userId, concept);
    }
};

const getByUser = (userId) =>
    db.prepare(
        'SELECT concept, state, evidence_count, last_updated FROM student_concepts WHERE user_id = ? ORDER BY last_updated DESC'
    ).all(userId);

module.exports = { upsert, getByUser, stateFromCount };
