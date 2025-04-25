// terminalHandler.js

import { scrollToBottom, print, println, clearTerminal, redraw } from './xtermWrapper.js';
import state from './stateManager.js';
import { canvas } from './terminal/canvasTerminal.js';
import { overwriteLastLine, getVisibleBuffer } from './terminal/terminalBuffer.js';
import {
  showCursor,
  setCursorPosition
} from './terminal/terminalCursor.js';

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


export function refreshLine(mode, buffer, username, hostname, pathArray) {
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
    line = prompt + sanitize(buffer);
    cursorOffset = prompt.length + buffer.length;
  }
  
  overwriteLastLine(line);
  const row = Math.max(getVisibleBuffer().length - 1, 0);
  setCursorPosition(cursorOffset, row);
    redraw();
}






// 👇 Helper: strip illegal control characters
function sanitize(str) {
  return str.replace(/[\x00-\x1F\x7F]/g, '');
}
