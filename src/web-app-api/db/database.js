const Database = require('better-sqlite3');
const path     = require('path');
const fs       = require('fs');

const DB_DIR  = path.join(__dirname);
const DB_PATH = path.join(DB_DIR, 'ucr-research.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    UNIQUE NOT NULL,
    password_hash TEXT,
    migrated      INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
    last_login    TEXT
  );

  CREATE TABLE IF NOT EXISTS chat_sessions (
    id               TEXT    PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES users(id),
    mode             TEXT    NOT NULL,
    prompt_version   TEXT,
    friction_ceiling INTEGER DEFAULT 4,
    started_at       TEXT    NOT NULL,
    ended_at         TEXT,
    duration_minutes REAL,
    total_events     INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS chat_events (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id       TEXT    NOT NULL REFERENCES chat_sessions(id),
    timestamp        TEXT    NOT NULL,
    time_since_start TEXT,
    event_type       TEXT    NOT NULL,
    data             TEXT    NOT NULL DEFAULT '{}'
  );

  CREATE TABLE IF NOT EXISTS student_concepts (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id        INTEGER NOT NULL REFERENCES users(id),
    concept        TEXT    NOT NULL,
    state          TEXT    NOT NULL DEFAULT 'en_progreso',
    evidence_count INTEGER NOT NULL DEFAULT 1,
    first_seen     TEXT    NOT NULL DEFAULT (datetime('now')),
    last_updated   TEXT    NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, concept)
  );

  CREATE TABLE IF NOT EXISTS student_profile (
    user_id              INTEGER PRIMARY KEY REFERENCES users(id),
    total_sessions       INTEGER NOT NULL DEFAULT 0,
    total_prompts        INTEGER NOT NULL DEFAULT 0,
    last_scaffold_level  INTEGER,
    last_sticky_count    INTEGER NOT NULL DEFAULT 0,
    total_time_minutes   REAL    NOT NULL DEFAULT 0,
    updated_at           TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;
