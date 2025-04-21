// terminalHandler.js

import { FitAddon } from 'https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/+esm';
import { scrollToBottom, print } from './xtermWrapper.js';
import state from './stateManager.js';

let _typingDelay = 20;

export function setTypingDelay(value) {
  _typingDelay = value;
}

export function getTypingDelay() {
  return _typingDelay;
}

let fitAddon;
let keyInputHandler = null;

// We no longer setup the terminal here — that's now in xtermWrapper.js

export function attachTerminalInput(handler) {
  keyInputHandler = handler;
  state.terminal?.onKey(e => {
    if (keyInputHandler) {
      handler(e);
    }
  });
}

export function refreshLine(mode, buffer, username, hostname, pathArray) {
  if (!state.terminal) return;

  // Clear line
  print('\x1b[2K\r');

  if (mode === 'username') {
    print('Username: ' + sanitize(buffer));
  } else if (mode === 'password') {
    print('Password: ' + '*'.repeat(buffer.length));
  } else {
    const prompt = `${username}@${hostname}:/${pathArray.join('/')}$ `;
    print(prompt + sanitize(buffer));
  }

  scrollToBottom();
}

// 👇 Helper: strip illegal control characters
function sanitize(str) {
  return str.replace(/[\x00-\x1F\x7F]/g, '');
}
