export const config = {
    MSG_DISPLAY_TIME: 5000,
    BASE_TIME_LIMIT: 60,
    MAX_HAMILTONIAN_ATTEMPTS: 25,
    MIN_MSG_INTERVAL: 1500,
    MIN_CELL_SIZE: 35,
    MAX_CELL_SIZE: 70,
    STORAGE_KEY_GAME_STATE: 'zipItGameState',
    STORAGE_KEY_LEVEL: 'zipItCurrentLevel',
    STORAGE_KEY_POINTS: 'zipItHighPoints',
    STORAGE_KEY_SOUND: 'zipItSoundMuted',
    RESET_PENALTY: 10,
    SVG_NS: "http://www.w3.org/2000/svg",
    ANIMATION_DURATION_CLICK: 100,
    MAX_XCELLS: 20,
    MAX_WALL_PERCENT: 0.4,
    GRADIENT_COLORS: [
        "#ff8a00", "#e52e71", "#873cff", "#00c6ff", "#00ff9d",
        "#ffe000", "#ff4e50", "#fc67fa", "#30cfd0", "#a3ff00"
    ]
};

export function getLevelParams(level) {
    // Support any level >= 1; JSON verisi gerçek boyutu belirlediği için burada sadece makul varsayılanlar döneriz.
    if (level < 1) level = 1;
    const params = { level, rows: 5, cols: 5, xCells: 6, baseCellSize: 65, timeAdd: 5, numWalls: 0, numWaypoints: 0 };
    params.timeLimit = config.BASE_TIME_LIMIT + params.timeAdd;
    return params;
}