const conceptRepo = require('../repositories/conceptRepo');
const profileRepo = require('../repositories/profileRepo');
const sessionRepo = require('../repositories/sessionRepo');

const updateConceptsFromSession = (userId, conceptosDemostrados = []) => {
    const unique = [...new Set(conceptosDemostrados)];
    for (const concept of unique) {
        if (concept) conceptRepo.upsert(userId, concept);
    }
};

const refreshProfile = (userId) => {
    const sessions = sessionRepo.getHistory(userId, 1000);
    const totalSessions     = sessions.length;
    const totalTimeMinutes  = sessions.reduce((acc, s) => acc + (s.duration_minutes || 0), 0);

    const existing = profileRepo.get(userId);
    profileRepo.upsert(userId, {
        totalSessions,
        totalPrompts:       existing?.total_prompts       || 0,
        lastScaffoldLevel:  existing?.last_scaffold_level || null,
        lastStickyCount:    existing?.last_sticky_count   || 0,
        totalTimeMinutes:   parseFloat(totalTimeMinutes.toFixed(2))
    });
};

const buildProfileSummary = (userId) => {
    const profile  = profileRepo.get(userId);
    const concepts = conceptRepo.getByUser(userId);
    const history  = sessionRepo.getHistory(userId, 5);

    return {
        profile:  profile  || { total_sessions: 0, total_prompts: 0, total_time_minutes: 0, last_scaffold_level: null, last_sticky_count: 0 },
        concepts,
        recentSessions: history
    };
};

const updateProfileScaffold = (userId, scaffoldLevel, stickyCount) => {
    const existing = profileRepo.get(userId);
    if (!existing) return;
    profileRepo.upsert(userId, {
        totalSessions:     existing.total_sessions,
        totalPrompts:      existing.total_prompts + 1,
        lastScaffoldLevel: scaffoldLevel,
        lastStickyCount:   stickyCount,
        totalTimeMinutes:  existing.total_time_minutes
    });
};

module.exports = { updateConceptsFromSession, refreshProfile, buildProfileSummary, updateProfileScaffold };
