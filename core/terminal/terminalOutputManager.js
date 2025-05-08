// terminalOutputManager.js - Optimized, Stable, and Complete

import state from '../stateManager.js';
import { setCursorPosition, getCursorPosition } from './terminalCursor.js';
import { setLineAt, getVisibleBuffer, pushLine } from './terminalBuffer.js';
import { redraw } from './canvasTerminal.js';
import { clearLine } from '../xtermWrapper.js';
import { getTerminalCols } from './canvasTerminal.js';

// --- Cursor-aware buffer write (optimized, wrapping) ---
export function writeAtCursor(text, triggerRedraw = true) {
    const { y } = getCursorPosition();
    const maxCols = getTerminalCols();
    const wrappedLines = wrapText(text, maxCols);

    // Directly write the first line at the cursor row
    setLineAt(y, wrappedLines[0]);

    // Push any additional wrapped lines
    for (let i = 1; i < wrappedLines.length; i++) {
        pushLine(wrappedLines[i]);
    }

    // Move cursor to the end of the last wrapped line
    const cursorLine = y + wrappedLines.length - 1;
    const cursorCol = wrappedLines.at(-1)?.length || 0;
    setCursorPosition(cursorCol, cursorLine);

    if (triggerRedraw) redraw();
}

// --- Mode-aware login prompt rendering (optimized, untouched) ---
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
    redraw();
}

// --- Shell prompt rendering (stable, wrapping) ---
export function drawShellPrompt(commandBuffer = '', triggerRedraw = true) {
    const path = '/' + state.currentPath.join('/');
    const prompt = `${state.currentUser}@${state.currentMachine}:${path} $ `;
    const maxCols = getTerminalCols();
    const fullText = prompt + commandBuffer;
    const wrappedLines = wrapText(fullText, maxCols);

    const buffer = getVisibleBuffer();
    const row = buffer.length - 1;
  
    if (row < 0) pushLine(''); // Ensure at least one line exists

    // Clear existing line and write wrapped lines
    clearLine(row);
    setLineAt(row, wrappedLines[0]);
    for (let i = 1; i < wrappedLines.length; i++) {
        pushLine(wrappedLines[i]);
    }

    // Cursor positioning at the end of the last wrapped line
    const cursorLine = row + wrappedLines.length - 1;
    const cursorCol = wrappedLines.at(-1)?.length || 0;
    setCursorPosition(cursorCol, cursorLine);

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

// --- Text Wrapping Logic (Clean and Minimal) ---
function wrapText(text, maxCols) {
    const wrapped = [];
    let start = 0;

    while (start < text.length) {
        wrapped.push(text.slice(start, start + maxCols));
        start += maxCols;
    }

    return wrapped;
}
