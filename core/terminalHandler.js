// terminalHandler.js

import { scrollToBottom, print, println, clearTerminal, redraw } from './xtermWrapper.js';
import state from './stateManager.js';
import { canvas, getTerminalCols } from './terminal/canvasTerminal.js';
import { writeLine, getVisibleBuffer, overwriteLastLine, getViewportStartRow } from './terminal/terminalBuffer.js';
import { showCursor, setCursorPosition } from './terminal/terminalCursor.js';



let _typingDelay = 20;

export function setTypingDelay(value) {
  _typingDelay = value;
}

export function getTypingDelay() {
  return _typingDelay;
}

let keyInputHandler = null;

export function attachTerminalInput(handler) {
  canvas.addEventListener('keydown', e => {
    const event = {
      key: e.key,
      domEvent: e
    };
    handler(event);
  });
}

export function refreshLine(mode, buffer, username, hostname, pathArray, forceNewLine = false) {
  if (typeof buffer !== 'string') buffer = ''; // ✅ Always sanitize early

  let line = '';
  let cursorOffset = 0;

  if (mode === 'username') {
    line = 'Username: ' + sanitize(buffer);
    cursorOffset = 'Username: '.length + buffer.length;
  } else if (mode === 'password') {
    line = 'Password: ' + '*'.repeat(buffer.length);
    cursorOffset = 'Password: '.length + buffer.length;
  } else {
    const prompt = `${username}@${hostname}:/${pathArray.join('/')}$ `;
    const fullLine = prompt + sanitize(buffer);
    line = fullLine;
    cursorOffset = Math.max(fullLine.length - 0.5, 0);
  }

  if (forceNewLine) {
    println('');  // <<< Push clean blank line if requested
  }

  overwriteLastLine(line);

  const lastRow = getVisibleBuffer().length - 1;

  const cols = getTerminalCols();
  const visualX = Math.floor(cursorOffset % cols);
  const visualY = lastRow - Math.floor(cursorOffset / cols);

  // 🛠️ Correct the Y position relative to the current viewport
  const screenY = visualY - getViewportStartRow();

  setCursorPosition(visualX, screenY);
  redraw();
}

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[\x00-\x1F\x7F]/g, '');
}
