// loginManager.js

import { getTypingDelay } from '../core/terminalHandler.js';
import systems from '../network/systems.js';
import state, { resetSessionState } from '../core/stateManager.js';
import fsTemplates from '../fs/fsTemplates.js';
import settings from '../core/settings.js';
import { initVisualFX } from '../fx/visualFXManager.js';
import { print, println } from '../core/xtermWrapper.js';
import { overwriteLastLine } from '../core/terminal/terminalBuffer.js';

initVisualFX();

let refreshLineFunc = null;

export async function initLogin(termInstance, refreshLineInstance) {
  state.terminal = termInstance;
  refreshLineFunc = refreshLineInstance;
}

export async function outputIntro(targetIP = null) {
  if (!targetIP) {
    state.pendingLogin = null;
    println(`Welcome to SBC_1`);
    println(`Login hint: username 'root' / password 'toor'`);
    println('');
  }

  state.awaitingUsername = true;
  state.commandBuffer = '';
  state.cursorPosition = 0;

  refreshPromptLine('username');
}

export function handleLoginInput() {
  const input = state.commandBuffer.trim();

  if (state.awaitingUsername) {
    if (!input) {
      println('Login error: username required.');
      refreshPromptLine('username');
      return;
    }

    state.pendingUsername = input;
    state.commandBuffer = '';
    state.cursorPosition = 0;
    state.awaitingUsername = false;
    state.awaitingPassword = true;

    refreshPromptLine('password');
    return;
  }

  if (state.awaitingPassword) {
    let target = null;

    // Remote login
    if (state.pendingLogin) {
      target = systems.find(sys => sys.ip === state.pendingLogin);
    }

    // Localhost fallback
    if (!target && state.pendingLogin === null) {
      const storedPass = state.machines.localhost?.users?.[state.pendingUsername];
      if (storedPass) {
        target = {
          hostname: 'localhost',
          username: state.pendingUsername,
          password: storedPass
        };
      }
    }

    // ✅ Validate match
    if (target && input === target.password) {
      if (!target.username || typeof target.username !== 'string' || target.username.trim() === '') {
        println('Login error: internal state invalid. Try again.');
        resetToUsernamePrompt();
        return;
      }

      println(`Welcome to ${target.hostname}!`);
      println(`Type 'read tutorial.txt' to begin.`);
      println('');

      const machineName = target.hostname.replace('.local', '');
      resetSessionState(target.username, machineName);

      if (!state.machines[machineName]) {
        state.machines[machineName] = {
          fs: fsTemplates.default(),
          users: {
            [target.username]: target.password
          }
        };
      } else {
        state.machines[machineName].fs = fsTemplates.default();
      }

      const fsRoot = state.machines[machineName].fs['/'];
      if (fsRoot?.contents?.['undefined']) {
        console.warn('[fs] Removed stray "undefined" entry from /');
        delete fsRoot.contents['undefined'];
      }

      // Shell prompt
      refreshPromptLine('shell');
      return;
    }

    // ❌ Failure
    println('Access Denied.');
    println('Returning to login...');
    resetToUsernamePrompt();
  }
}

function resetToUsernamePrompt() {
  state.awaitingUsername = true;
  state.awaitingPassword = false;
  state.commandBuffer = '';
  state.cursorPosition = 0;
  refreshPromptLine('username');
}

function refreshPromptLine(mode) {
  if (refreshLineFunc) {
    refreshLineFunc(mode, state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
  }
}
