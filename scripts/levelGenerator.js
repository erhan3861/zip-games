import { getState, updateState, setWorker, terminateWorker } from './state.js';
import { config } from './config.js';
import * as ui from './ui.js';
import * as logic from './logic.js';
import * as timer from './timer.js';

export function generateLevelAsync(gridRows, gridCols, onComplete) {
    updateState({ isGenerating: true });
    ui.showGeneratingText();
    ui.disableAllInput();

    // For version1, load fixed level data instead of generating
    const currentLevel = getState().level;
    loadFixedLevel(currentLevel, onComplete);
}

async function loadFixedLevel(level, onComplete) {
    try {
        const response = await fetch(`levels/${level}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load level ${level}`);
        }
        
        const levelData = await response.json();
        
        // Convert fixed level data to the format expected by the game
        const hamiltonianPath = convertLevelDataToPath(levelData);
        
        updateState({ isGenerating: false });
        onComplete(hamiltonianPath);
        
    } catch (error) {
        console.error("Error loading fixed level:", error);
        updateState({ isGenerating: false });
        ui.showMessage(`Error loading level ${level}.`, "gen_error");
        ui.showGenerationErrorText('Level Load Failed!');
        ui.disableAllInput();
    }
}

function convertLevelDataToPath(levelData) {
    // Build a simple covering path using the grid size from JSON (snake pattern)
    const path = [];
    const rows = levelData?.grid?.length || 7;
    const cols = levelData?.grid?.[0]?.length || 7;

    for (let r = 0; r < rows; r++) {
        if (r % 2 === 0) {
            for (let c = 0; c < cols; c++) path.push(`${r}-${c}`);
        } else {
            for (let c = cols - 1; c >= 0; c--) path.push(`${r}-${c}`);
        }
    }
    return path;
}