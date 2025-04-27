// loginManager.js

import { getTypingDelay } from '../terminalHandler.js';
import systems from '../network/systems.js';
import state, { resetSessionState } from '../stateManager.js';
import fs from '../fs/filesystem.js';
import settings from '../settings.js';
import { initVisualFX } from '../fx/visualFXManager.js';
import { println } from '../xtermWrapper.js';
import { getMode, setMode } from '../sessionManager.js';
import { writeLine } from '../terminal/terminalBuffer.js';

initVisualFX();

let refreshLineFunc = null;

export function initLogin(refreshLineInstance) {
  console.warn('[loginManager] initLogin called');
  console.warn('[loginManager] received refreshLineInstance:', typeof refreshLineInstance);
  refreshLineFunc = refreshLineInstance;
}

export async function outputIntro(targetIP = null) {
  if (!targetIP) {
    println(`Welcome to SBC_1`);
    println(`Login hint: username 'root' / password 'toor'`);
    println('');
  }

  state.pendingUsername = null;
  state.commandBuffer = '';
  state.cursorPosition = 0;

  setMode('login');

  if (refreshLineFunc) {
    refreshLineFunc('username', '', '', '', []); // Force Username prompt
  } else {
    console.error('[loginManager] No refreshLineFunc bound.');
  }
}

export function handleLoginInput() {
  console.warn('[loginManager] handleLoginInput fired');
  console.warn('[loginManager] commandBuffer =', state.commandBuffer);
  console.warn('[loginManager] pendingUsername =', state.pendingUsername);

  const input = state.commandBuffer.trim();

  if (!state.pendingUsername || state.pendingUsername.trim() === '') {
    if (input === '') {
      println('Login error: username required.');
      refreshPromptLine('username');
      return;
    }
  
    writeLine(state.commandBuffer);
    state.pendingUsername = input;
    state.commandBuffer = '';
    state.cursorPosition = 0;
    
    // 🔥 Defer refresh to next tick
    setTimeout(() => {
      refreshPromptLine('password');
    }, 0);
    
    return;
  }
  

  // 🔐 Handling password input
  const enteredPassword = input;
  let target = null;

  if (state.pendingLogin) {
    target = systems.find(sys => sys.ip === state.pendingLogin);
  }
  console.warn('[loginManager] state.pendingLogin =', state.pendingLogin);

  if (!target && !state.pendingLogin) {
    if (DEBUG_MODE) {
      console.warn(`[loginManager] phase=${state.pendingUsername ? 'password' : 'username'}, buffer="${state.commandBuffer}"`);
    }
    

    const storedPass = state.machines.localhost?.users?.[state.pendingUsername];

    console.warn('[loginManager] storedPass =', storedPass);

    if (storedPass) {
      target = {
        hostname: 'localhost',
        username: state.pendingUsername,
        password: storedPass
      };
    }
  }

  console.warn('[loginManager] target =', target);
  console.warn('[loginManager] checking if', enteredPassword, '===', target?.password);

  if (target && enteredPassword === target.password) {
    if (!target.username || typeof target.username !== 'string' || target.username.trim() === '') {
      println('Login error: internal state invalid. Try again.');
      resetLoginPrompt();
      return;
    }

    println(`Welcome to ${target.hostname}!`);
    println(`Type 'read tutorial.txt' to begin.`);
    println('');

    const machineName = target.hostname.replace('.local', '');
    resetSessionState(target.username, machineName);

    if (!state.machines[machineName]) {
      state.machines[machineName] = {
        fs: fs,
        users: {
          [target.username]: target.password
        }
      };
    } else {
      state.machines[machineName].fs = state.machines.localhost.fs;
    }

    const fsRoot = state.machines[machineName].fs['/'];
    if (fsRoot?.contents?.['undefined']) {
      console.warn('[fs] Removed stray "undefined" entry from /');
      delete fsRoot.contents['undefined'];
    }

    setMode('shell');
    state.pendingUsername = null;
    state.commandBuffer = '';
    state.cursorPosition = 0;

    refreshPromptLine('shell');
    return;
  }

  // ❌ Password failed
  println('Access Denied.');
  println('Returning to login...');
  resetLoginPrompt();
}

function resetLoginPrompt() {
  setMode('login');
  state.pendingUsername = null;
  state.commandBuffer = '';
  state.cursorPosition = 0;
  refreshPromptLine('username');
}

function refreshPromptLine(forcedPhase = 'username') {
  if (refreshLineFunc) {
    refreshLineFunc(forcedPhase, state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
  }
}
