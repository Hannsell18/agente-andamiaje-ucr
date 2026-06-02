const db = require('../db/database');

const upsert = (userId, { totalSessions, totalPrompts, lastScaffoldLevel, lastStickyCount, totalTimeMinutes }) =>
    db.prepare(`
        INSERT INTO student_profile
            (user_id, total_sessions, total_prompts, last_scaffold_level, last_sticky_count, total_time_minutes, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
        ON CONFLICT(user_id) DO UPDATE SET
            total_sessions      = excluded.total_sessions,
            total_prompts       = excluded.total_prompts,
            last_scaffold_level = excluded.last_scaffold_level,
            last_sticky_count   = excluded.last_sticky_count,
            total_time_minutes  = excluded.total_time_minutes,
            updated_at          = datetime('now')
    `).run(userId, totalSessions, totalPrompts, lastScaffoldLevel ?? null, lastStickyCount ?? 0, totalTimeMinutes ?? 0);

const get = (userId) =>
    db.prepare('SELECT * FROM student_profile WHERE user_id = ?').get(userId);

module.exports = { upsert, get };
