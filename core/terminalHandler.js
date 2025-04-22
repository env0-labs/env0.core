// terminalHandler.js

import { FitAddon } from 'https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/+esm';
import { scrollToBottom, print } from './xtermWrapper.js';
import state from './stateManager.js';

// One declaration only
const fitAddon = new FitAddon();

// Load onto the terminal after it's initialized (assumes `state.terminal` exists)
setTimeout(() => {
  if (window.location.hostname.includes('github.io') && state.terminal) {
    state.terminal.loadAddon(fitAddon);
    fitAddon.fit();
  }
}, 100);

let _typingDelay = 20;

export function setTypingDelay(value) {
  _typingDelay = value;
}

export function getTypingDelay() {
  return _typingDelay;
}

let keyInputHandler = null;

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

function sanitize(str) {
  return str.replace(/[\x00-\x1F\x7F]/g, '');
}
