// loginManager.js
// Manages login state and credential validation
// Prompt rendering now handled by drawLoginPrompt() from terminalOutputManager

import { getTypingDelay } from '../terminalHandler.js';
import systems from '../network/systems.js';
import state, { resetSessionState } from '../stateManager.js';
import fs from '../fs/filesystem.js';
import settings from '../settings.js';
import { initVisualFX } from '../fx/visualFXManager.js';
import { println } from '../xtermWrapper.js';
import { getMode, setMode } from '../sessionManager.js';
import { drawLoginPrompt, drawShellPrompt } from '../terminal/terminalOutputManager.js';
import { pushLine, getVisibleBuffer } from '../terminal/terminalBuffer.js'; // if not already

initVisualFX();


// 🟡 Called by bootSequence — outputs welcome and forces login mode
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

  // Preallocate login rows and store their indices
  pushLine(''); // Username line
  pushLine(''); // Password line
  state.loginUsernameRow = getVisibleBuffer().length - 2;
  state.loginPasswordRow = getVisibleBuffer().length - 1;

  drawLoginPrompt();
}



// 🔐 Handles both username and password input flows
export function handleLoginInput() {
  console.warn('[loginManager] handleLoginInput fired');
  console.warn('[loginManager] commandBuffer =', state.commandBuffer);
  console.warn('[loginManager] pendingUsername =', state.pendingUsername);

  const input = state.commandBuffer.trim();

  if (!state.pendingUsername || state.pendingUsername.trim() === '') {
    // Phase: USERNAME
    if (input === '') {
      println('Login error: username required.');
      drawLoginPrompt();
      return;
    }

    // Accept username, switch to password input
  state.pendingUsername = input;
  setTimeout(() => {
  drawLoginPrompt();
  }, 0);

    state.commandBuffer = ''; // ← move AFTER drawLoginPrompt
    state.cursorPosition = 0;


    return;
  }

  // Phase: PASSWORD
  const enteredPassword = input;
  let target = null;

  // Check pending login target (if SSH or external system)
  if (state.pendingLogin) {
    target = systems.find(sys => sys.ip === state.pendingLogin);
  }

  // Localhost fallback
  if (!target && !state.pendingLogin) {
    const storedPass = state.machines.localhost?.users?.[state.pendingUsername];
    if (storedPass) {
      target = {
        hostname: 'localhost',
        username: state.pendingUsername,
        password: storedPass
      };
    }
  }

  if (target && enteredPassword === target.password) {
    // ✅ Login Success
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

    // Transition to shell
    setMode('shell');
    state.pendingUsername = null;
    state.commandBuffer = '';
    state.cursorPosition = 0;

    drawShellPrompt();

return;
  }

  // ❌ Login failed
  println('Access Denied.');
  println('Returning to login...');
  resetLoginPrompt();
}


// 🔁 Return to username input after failed login
function resetLoginPrompt() {
  setMode('login');
  state.pendingUsername = null;
  state.commandBuffer = '';
  state.cursorPosition = 0;
  drawLoginPrompt();
}
