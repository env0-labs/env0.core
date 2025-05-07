
// terminalOutputManager.js - Optimized

import state from '../stateManager.js';
import { setCursorPosition, getCursorPosition } from './terminalCursor.js';
import { setLineAt, getVisibleBuffer, pushLine } from './terminalBuffer.js';
import { redraw } from './canvasTerminal.js';
import { clearLine } from '../xtermWrapper.js';

// --- Cursor-aware buffer write (optimized) ---
export function writeAtCursor(text, triggerRedraw = true) {
    const { y } = getCursorPosition();
    setLineAt(y, text);
    if (triggerRedraw) redraw();
}

// --- Mode-aware login prompt rendering (optimized) ---
export function drawLoginPrompt() {
    const isUsernamePhase = !state.pendingUsername;
    const promptText = isUsernamePhase 
        ? (state.loginPromptText || 'Username: ') 
        : (state.passwordPromptText || 'Password: ');
    
    const maskChar = state.passwordMask || '*';
    const inputText = isUsernamePhase 
        ? state.commandBuffer 
        : maskChar.repeat(state.commandBuffer.length);

    const row = isUsernamePhase ? state.loginUsernameRow : state.loginPasswordRow;
    clearLine(row);
    setCursorPosition(0, row);
    writeAtCursor(promptText + inputText, false); // No immediate redraw
    setCursorPosition(promptText.length + inputText.length, row);
    redraw(); // One efficient redraw after all changes
}

// --- Shell prompt rendering (optimized) ---
export function drawShellPrompt(commandBuffer = '', triggerRedraw = true) {
    const path = '/' + state.currentPath.join('/');
    const prompt = `${state.currentUser}@${state.currentMachine}:${path} $ `;
    const buffer = getVisibleBuffer();
    const row = buffer.length - 1;
  
    if (row < 0) pushLine(''); // Ensure at least one line exists

    clearLine(row);
    const fullLine = prompt + commandBuffer;
    setLineAt(row, fullLine);
    setCursorPosition(prompt.length + commandBuffer.length, row);

    if (triggerRedraw) redraw();
}

// --- Error-safe cursor positioning (prevents silent failures) ---
export function setSafeCursorPosition(x, y) {
    const buffer = getVisibleBuffer();
    if (y < 0 || y >= buffer.length) {
        console.error(`[TerminalOutputManager] Invalid cursor Y position: ${y}`);
        return;
    }
    if (x < 0) {
        console.error(`[TerminalOutputManager] Invalid cursor X position: ${x}`);
        return;
    }
    setCursorPosition(x, y);
}
