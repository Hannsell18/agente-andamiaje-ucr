/**
 * Migración de logs JSON → SQLite
 * Uso: node scripts/migrate-logs.js
 */
const fs   = require('fs');
const path = require('path');

require('../db/database'); // inicializa esquema
const userRepo    = require('../repositories/userRepo');
const sessionRepo = require('../repositories/sessionRepo');
const conceptRepo = require('../repositories/conceptRepo');
const profileRepo = require('../repositories/profileRepo');

const LOG_DIR = path.join(__dirname, '..', 'logs');

const files = fs.readdirSync(LOG_DIR).filter(f => f.endsWith('.json'));
console.log(`\nMigrando ${files.length} archivos de logs...\n`);

let ok = 0; let skipped = 0; let errors = 0;

for (const file of files) {
    const filePath = path.join(LOG_DIR, file);
    let raw;
    try { raw = JSON.parse(fs.readFileSync(filePath, 'utf-8')); }
    catch { console.warn(`  ⚠ No se pudo leer: ${file}`); errors++; continue; }

    const meta = raw.metadata;
    if (!meta?.participantId || !meta?.sessionId) { skipped++; continue; }

    // 1. Buscar o crear usuario (sin password → migrated=1)
    let user = userRepo.findByUsername(meta.participantId);
    if (!user) {
        try {
            const r = userRepo.create(meta.participantId, null, 1);
            user    = userRepo.findById(r.lastInsertRowid);
        } catch (e) {
            user = userRepo.findByUsername(meta.participantId);
        }
    }
    if (!user) { console.warn(`  ⚠ No se pudo crear usuario para: ${meta.participantId}`); errors++; continue; }

    // 2. Crear sesión (INSERT OR IGNORE)
    try {
        sessionRepo.create(
            meta.sessionId, user.id, meta.mode || 'libre',
            meta.promptVersion || null, meta.frictionCeiling || 4,
            meta.startTime || new Date().toISOString()
        );
    } catch (e) { /* ya existe */ }

    // 3. Insertar eventos
    const events = raw.events || [];
    for (const ev of events) {
        const { timestamp, timeSinceStart, eventType, ...rest } = ev;
        try {
            sessionRepo.appendEvent(meta.sessionId, timestamp, timeSinceStart, eventType, rest);
        } catch { /* duplicado */ }
    }

    // 4. Cerrar sesión si hay SESSION_END
    const endEv = events.find(e => e.eventType === 'SESSION_END');
    if (endEv) {
        try {
            sessionRepo.close(
                meta.sessionId,
                endEv.timestamp,
                parseFloat(endEv.durationMinutes || 0),
                meta.totalEvents || events.length
            );
        } catch { /* ya cerrada */ }
    }

    // 5. Upsert conceptos
    const conceptos = meta.conceptosDemostrados || [];
    for (const c of [...new Set(conceptos)]) {
        if (c) try { conceptRepo.upsert(user.id, c); } catch { /* ok */ }
    }

    // 6. Upsert profile
    const allSessions = sessionRepo.getHistory(user.id, 1000);
    const totalTime   = allSessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0);
    const prompts     = events.filter(e => e.eventType === 'AI_PROMPT').length;
    const lastLevel   = [...events].reverse().find(e => e.eventType === 'SCAFFOLD_LEVEL')?.nivel ?? null;

    try {
        profileRepo.upsert(user.id, {
            totalSessions:    allSessions.length,
            totalPrompts:     prompts,
            lastScaffoldLevel: lastLevel,
            lastStickyCount:  meta.stickyCount || 0,
            totalTimeMinutes: parseFloat(totalTime.toFixed(2))
        });
    } catch { /* ok */ }

    console.log(`  ✓ ${file}  →  usuario: ${meta.participantId}  (${events.length} eventos)`);
    ok++;
}

console.log(`\nMigración completada: ${ok} exitosos · ${skipped} omitidos · ${errors} errores\n`);
