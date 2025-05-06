// terminalOutputManager.js

import state from '../stateManager.js';
import { setCursorPosition, getCursorPosition } from './terminalCursor.js';
import { setLineAt, getVisibleBuffer } from './terminalBuffer.js';
import { redraw } from './canvasTerminal.js';
import { clearLine } from '../xtermWrapper.js';

// --- Cursor-aware buffer write ---
export function writeAtCursor(text) {
  const { y } = getCursorPosition();
  setLineAt(y, text);
  redraw();
}

// --- Mode-aware login prompt rendering ---
export function drawLoginPrompt() {
    const isUsernamePhase = !state.pendingUsername;
    const promptText = isUsernamePhase ? 'Username: ' : 'Password: ';
    const inputText = isUsernamePhase
      ? state.commandBuffer
      : '*'.repeat(state.commandBuffer.length);
  
    const row = isUsernamePhase
      ? state.loginUsernameRow
      : state.loginPasswordRow;
  
    clearLine(row);
    setCursorPosition(0, row);
    writeAtCursor(promptText + inputText);
    setCursorPosition(promptText.length + inputText.length, row);
  }
  
  
  
  

// --- Shell prompt rendering stub (if needed later) ---
export function drawShellPrompt(commandBuffer = '') {
    const prompt = `${state.currentUser}@${state.currentMachine}:${state.currentPath} $ `;
  
    // 🔹 Push empty line into buffer first
    const buffer = getVisibleBuffer();
    const row = buffer.length;
    buffer.push('');
  
    const fullLine = prompt + commandBuffer;
    setCursorPosition(0, row);
    writeAtCursor(fullLine);
    setCursorPosition(fullLine.length, row);
    state.cursorPosition = fullLine.length;
  }
  
