// terminalOutputManager.js

import state from '../stateManager.js';
import { setCursorPosition, getCursorPosition } from './terminalCursor.js';
import { setLineAt, getVisibleBuffer, pushLine } from './terminalBuffer.js';
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
    const path = '/' + state.currentPath.join('/');
    const prompt = `${state.currentUser}@${state.currentMachine}:${path} $ `;
    const buffer = getVisibleBuffer();
    const row = buffer.length - 1;
  
    if (row < 0) {
      pushLine(''); // Ensure at least one line exists
    }
  
    const fullLine = prompt + commandBuffer;
  
    setLineAt(row, fullLine);                     
    setCursorPosition(prompt.length + commandBuffer.length, row); 
  
    redraw();
  }
  
  
