// stateManager.js

import defaultFS from '../fs/filesystem.js';

const state = {
  // Core session state
  currentUser: null,
  currentMachine: 'localhost',
  currentPath: [],
  commandBuffer: '',
  cursorPosition: 0,
  loginComplete: false,
  terminal: null, // xterm.js instance (injected at runtime)
  commandHistory: [],
  historyIndex: 0,

  // Login state
  awaitingUsername: false,
  awaitingPassword: false,

  // Machine runtime map
  machines: {
    localhost: {
      fs: defaultFS,
      users: {
        root: 'toor'
      }
    }
  },

  // Network discovery
  discoveredHosts: [] // Filled by commands like nmap/ping
};

// --------------------
// Session Management
// --------------------

export function resetSessionState(username, machineName) {
  if (!username || typeof username !== 'string' || username.trim() === '') {
    console.error('[resetSessionState] Invalid username');
    return;
  }

  if (!machineName || typeof machineName !== 'string') {
    console.error('[resetSessionState] Invalid machine name');
    return;
  }

  state.currentUser = username;
  state.currentMachine = machineName;
  state.currentPath = [];
  state.commandBuffer = '';
  state.cursorPosition = 0;
  state.loginComplete = true;
  state.awaitingUsername = false;
  state.awaitingPassword = false;
}



export function logoutSession() {
  state.currentUser = null;
  state.currentMachine = null;
  state.currentPath = [];
  state.commandBuffer = '';
  state.cursorPosition = 0;
  state.loginComplete = false;
  state.awaitingUsername = false;
  state.awaitingPassword = false;
  state.discoveredHosts = [];
}

// --------------------
// Network Discovery
// --------------------

export function discoverHost(ip, hostname) {
  const exists = state.discoveredHosts.some(h => h.ip === ip);
  if (!exists) {
    state.discoveredHosts.push({ ip, hostname });
  }
}

export function isHostDiscovered(ip) {
  return state.discoveredHosts.some(h => h.ip === ip);
}

export function resetDiscoveredHosts() {
  state.discoveredHosts = [];
}

export default state;
