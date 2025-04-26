// inputManager.js

import state from './stateManager.js';
import { refreshLine } from './terminalHandler.js';
import { handleLoginInput as processLoginInput } from '../startup/loginManager.js';
import { getMode, setMode } from './sessionManager.js';

// Commands
import { lsCommand } from '../cmds/ls.js';
import { cdCommand } from '../cmds/cd.js';
import { catCommand } from '../cmds/cat.js';
import { clearCommand } from '../cmds/clear.js';
import { helpCommand } from '../cmds/help.js';
import { pingCommand } from '../cmds/ping.js';
import { ifconfigCommand } from '../cmds/ifconfig.js';
import { nmapCommand } from '../cmds/nmap.js';
import { read } from '../cmds/read.js';

import { println, scrollToBottom } from './xtermWrapper.js';

export function handleKeyInput(e) {
  const { key, domEvent } = e;
  const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

  domEvent.preventDefault();

  const currentMode = getMode();

  if (key === 'Enter') {
    if (currentMode === 'login') {
      processLoginInput();
    } else if (currentMode === 'shell') {
      const input = state.commandBuffer.trim();
      state.commandBuffer = '';
      state.cursorPosition = 0;

      // DO NOT REMOVE THESE COMMENTED LINES, AS PER YOUR NOTES
      // println(input);
      processShellCommand(input); // Run command output
      
      scrollToBottom(); // <<< scroll immediately after command output

      setTimeout(() => {
        println('');
        refreshShellPrompt();
        scrollToBottom(); // <<< optional, minor correction scroll
      }, 0);
    }
    return;
  }
  
  

  if (key === 'Backspace') {
    if (state.cursorPosition > 0) {
      state.commandBuffer =
        state.commandBuffer.slice(0, state.cursorPosition - 1) +
        state.commandBuffer.slice(state.cursorPosition);
      state.cursorPosition--;
    }

    // 🔄 Mode-aware redraw
    redrawPrompt(currentMode);
    return;
  }

  if (printable && key.length === 1) {
    state.commandBuffer =
      state.commandBuffer.slice(0, state.cursorPosition) +
      key +
      state.commandBuffer.slice(state.cursorPosition);
    state.cursorPosition++;

    // 🔄 Mode-aware redraw
    redrawPrompt(currentMode);
    return;
  }
}

function redrawPrompt(mode) {
  if (mode === 'shell') {
    refreshShellPrompt();
  } else if (mode === 'login') {
    // determine which phase: username or password
    const phase = state.pendingUsername ? 'password' : 'username';

    // safe fallback to blank prompt if refreshLineFunc isn't bound
    if (typeof refreshLine === 'function') {
      refreshLine(phase, state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
    }
  }
}




function handleBootInput(key, printable) {
  // During boot, ignore keys unless triggering 'continue'
  // Optional: listen for "Press any key to continue..." if you want
}

function handleLoginInput(key, printable) {
  if (key === 'Enter') {
    processLoginInput();
    refreshShellPrompt();
    return;
  }

  if (key === 'Backspace') {
    if (state.cursorPosition > 0) {
      state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition - 1) + state.commandBuffer.slice(state.cursorPosition);
      state.cursorPosition--;
      refreshShellPrompt();
    }
    return;
  }

  if (printable && key.length === 1) {
    state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition) + key + state.commandBuffer.slice(state.cursorPosition);
    state.cursorPosition++;
    refreshShellPrompt();
  }
}

function handleShellInput(key, printable) {
  if (key === 'Enter') {
    println();
    processShellCommand();
    refreshShellPrompt();
    return;
  }

  if (key === 'Backspace') {
    if (state.cursorPosition > 0) {
      state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition - 1) + state.commandBuffer.slice(state.cursorPosition);
      state.cursorPosition--;
      refreshShellPrompt();
    }
    return;
  }

  if (key === 'ArrowUp') {
    if (state.commandHistory.length > 0 && state.historyIndex > 0) {
      state.historyIndex--;
      state.commandBuffer = state.commandHistory[state.historyIndex];
      state.cursorPosition = state.commandBuffer.length;
      refreshShellPrompt();
    }
    return;
  }

  if (key === 'ArrowDown') {
    if (state.historyIndex < state.commandHistory.length - 1) {
      state.historyIndex++;
      state.commandBuffer = state.commandHistory[state.historyIndex];
    } else {
      state.historyIndex = state.commandHistory.length;
      state.commandBuffer = '';
    }
    state.cursorPosition = state.commandBuffer.length;
    refreshShellPrompt();
    return;
  }

  if (printable && key.length === 1) {
    state.commandBuffer = state.commandBuffer.slice(0, state.cursorPosition) + key + state.commandBuffer.slice(state.cursorPosition);
    state.cursorPosition++;
    refreshShellPrompt();
  }
}

function handleReaderInput(key, printable) {
  // Will be implemented later when readerManager properly mode-switches
  // For now, assume any key exits reader mode
}

function refreshShellPrompt(forceNewLine = false) {
  refreshLine('shell', state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath, forceNewLine);
}


function processShellCommand(input) {
  if (input.trim() !== '') {
    state.commandHistory.push(input);
  }
  state.historyIndex = state.commandHistory.length;

  const args = input.trim().split(/\s+/);
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

  // REMOVE scrollToBottom() and redraw() from here
  // Let printlns inside commands handle visual updates
}
