const db = require('../db/database');

const create = (sessionId, userId, mode, promptVersion, frictionCeiling, startedAt) =>
    db.prepare(`
        INSERT OR IGNORE INTO chat_sessions
            (id, user_id, mode, prompt_version, friction_ceiling, started_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(sessionId, userId, mode, promptVersion || null, frictionCeiling || 4, startedAt);

const close = (sessionId, endedAt, durationMinutes, totalEvents) =>
    db.prepare(`
        UPDATE chat_sessions
        SET ended_at = ?, duration_minutes = ?, total_events = ?
        WHERE id = ?
    `).run(endedAt, durationMinutes, totalEvents, sessionId);

const exists = (sessionId) =>
    !!db.prepare('SELECT 1 FROM chat_sessions WHERE id = ?').get(sessionId);

const appendEvent = (sessionId, timestamp, timeSinceStart, eventType, data = {}) =>
    db.prepare(`
        INSERT INTO chat_events (session_id, timestamp, time_since_start, event_type, data)
        VALUES (?, ?, ?, ?, ?)
    `).run(sessionId, timestamp, timeSinceStart || '0s', eventType, JSON.stringify(data));

const getHistory = (userId, limit = 10) =>
    db.prepare(`
        SELECT id, mode, started_at, ended_at, duration_minutes, total_events
        FROM chat_sessions
        WHERE user_id = ?
        ORDER BY started_at DESC
        LIMIT ?
    `).all(userId, limit);

module.exports = { create, close, exists, appendEvent, getHistory };
