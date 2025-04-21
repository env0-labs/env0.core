// inputManager.js

import state from './stateManager.js';
import { refreshLine } from './terminalHandler.js';
import { handleLoginInput } from '../startup/loginManager.js';

// Modular command functions (now from /cmds/)
import { lsCommand } from '../cmds/ls.js';
import { cdCommand } from '../cmds/cd.js';
import { catCommand } from '../cmds/cat.js';
import { clearCommand } from '../cmds/clear.js';
import { helpCommand } from '../cmds/help.js';
import { pingCommand } from '../cmds/ping.js';
import { ifconfigCommand } from '../cmds/ifconfig.js';
import { nmapCommand } from '../cmds/nmap.js';
import { read } from '../cmds/read.js';
import { println } from './xtermWrapper.js';



export function handleKeyInput(e) {
  const { key, domEvent } = e;
  const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

  domEvent.preventDefault();

  if (domEvent.key === 'Enter') {
    println();

    if (state.loginComplete) {
      if (state.commandBuffer.trim() !== '') {
        state.commandHistory.push(state.commandBuffer);
      }
      state.historyIndex = state.commandHistory.length;

      const args = state.commandBuffer.trim().split(/\s+/);
      const cmd = args[0];

      switch (cmd) {
        case 'ls':
          lsCommand();
          break;
        case 'cd':
          cdCommand(args);
          break;
        case 'cat':
          catCommand(args);
          break;
        case 'clear':
          clearCommand();
          break;
        case 'help':
          helpCommand();
          break;
        case 'ping':
          pingCommand(args);
          break;
        case 'ifconfig':
          ifconfigCommand();
          break;
        case 'nmap':
          nmapCommand(args);
          break;
        case 'read':
          read(args.slice(1));
          break;
        default:
          println(`Command not found: ${cmd}`);
      }

      state.commandBuffer = '';
      state.cursorPosition = 0;
    } else {
      handleLoginInput();

      if (state.awaitingPassword && !state.loginComplete) {
        state.commandBuffer = '';
        state.cursorPosition = 0;
      }
    }

    refreshLine(getPromptMode(), state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
    return;
  }

  if (domEvent.key === 'Backspace') {
    if (state.cursorPosition > 0) {
      state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition - 1) + state.commandBuffer.slice(state.cursorPosition);
      state.cursorPosition--;
    }
    refreshLine(getPromptMode(), state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
    return;
  }

  if (domEvent.key === 'ArrowUp') {
    if (state.commandHistory.length > 0 && state.historyIndex > 0) {
      state.historyIndex--;
      state.commandBuffer = state.commandHistory[state.historyIndex];
      state.cursorPosition = state.commandBuffer.length;
      refreshLine(getPromptMode(), state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
    }
    return;
  }

  if (domEvent.key === 'ArrowDown') {
    if (state.historyIndex < state.commandHistory.length - 1) {
      state.historyIndex++;
      state.commandBuffer = state.commandHistory[state.historyIndex];
    } else {
      state.historyIndex = state.commandHistory.length;
      state.commandBuffer = '';
    }
    state.cursorPosition = state.commandBuffer.length;
    refreshLine(getPromptMode(), state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
    return;
  }

  if (printable && key.length === 1) {
    state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition) + key + state.commandBuffer.slice(state.cursorPosition);
    state.cursorPosition++;
    refreshLine(getPromptMode(), state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
  }
}

function getPromptMode() {
  if (state.awaitingUsername) return 'username';
  if (state.awaitingPassword && !state.loginComplete) return 'password';
  return 'shell';
}
