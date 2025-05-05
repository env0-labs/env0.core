// inputManager.js
// Handles all keyboard input across modes (login, shell, future reader)
// Routes prompt drawing via TerminalOutputManager (mode-aware)

import state from './stateManager.js';
import { drawLoginPrompt, drawShellPrompt } from './terminal/terminalOutputManager.js';
import { handleLoginInput as processLoginInput } from './startup/loginManager.js';
import { getMode, setMode } from './sessionManager.js';
import sshCommand from '../cmds/ssh.js';

// Command Imports
import { lsCommand } from '../cmds/ls.js';
import { cdCommand } from '../cmds/cd.js';
import { catCommand } from '../cmds/cat.js';
import { clearCommand } from '../cmds/clear.js';
import { helpCommand } from '../cmds/help.js';
import { pingCommand } from '../cmds/ping.js';
import { ifconfigCommand } from '../cmds/ifconfig.js';
import { nmapCommand } from '../cmds/nmap.js';
import { read } from '../cmds/read.js';
import { exitCommand } from '../cmds/exit.js';

import { println, scrollToBottom } from './xtermWrapper.js';


// 🚪 Entry point: unified key handler for all terminal input
export function handleKeyInput(e) {
  const { key, domEvent } = e;
  const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

  domEvent.preventDefault(); // Block browser shortcuts and defaults

  const currentMode = getMode();

  if (key === 'Enter') {
    // 🟡 ENTER pressed
    if (currentMode === 'login') {
      processLoginInput(); // Login flow will decide next state
    } else if (currentMode === 'shell') {
      const input = state.commandBuffer.trim();
      state.commandBuffer = '';
      state.cursorPosition = 0;

      // println(input); // Uncomment to echo command before execution
      processShellCommand(input); // Route to command logic

      scrollToBottom(); // Scroll after output

      setTimeout(() => {
        println(''); // Always newline before prompt
        drawShellPrompt(''); // Empty buffer after command
        scrollToBottom(); // Minor correction scroll if needed
      }, 0);
    }
    return;
  }

  if (key === 'Backspace') {
    // ⌫ BACKSPACE logic
    if (state.cursorPosition > 0) {
      state.commandBuffer =
        state.commandBuffer.slice(0, state.cursorPosition - 1) +
        state.commandBuffer.slice(state.cursorPosition);
      state.cursorPosition--;
    }

    redrawPrompt(currentMode);
    return;
  }

  if (printable && key.length === 1) {
    // 🔤 Printable character typed
    state.commandBuffer =
      state.commandBuffer.slice(0, state.cursorPosition) +
      key +
      state.commandBuffer.slice(state.cursorPosition);
    state.cursorPosition++;

    redrawPrompt(currentMode);
    return;
  }

  // ⬆ Command history scrollback
  if (key === 'ArrowUp' && currentMode === 'shell') {
    if (state.commandHistory.length > 0 && state.historyIndex > 0) {
      state.historyIndex--;
      state.commandBuffer = state.commandHistory[state.historyIndex];
      state.cursorPosition = state.commandBuffer.length;
      drawShellPrompt(state.commandBuffer);
    }
    return;
  }

  if (key === 'ArrowDown' && currentMode === 'shell') {
    if (state.historyIndex < state.commandHistory.length - 1) {
      state.historyIndex++;
      state.commandBuffer = state.commandHistory[state.historyIndex];
    } else {
      state.historyIndex = state.commandHistory.length;
      state.commandBuffer = '';
    }
    state.cursorPosition = state.commandBuffer.length;
    drawShellPrompt(state.commandBuffer);
    return;
  }
}


// 🔁 Mode-aware prompt re-rendering after input updates
function redrawPrompt(mode) {
  if (mode === 'shell') {
    drawShellPrompt(state.commandBuffer);
  } else if (mode === 'login') {
    drawLoginPrompt(); // Determines username/password state internally
  }
}


// 📖 Placeholder: will handle key input in reader mode later
function handleReaderInput(key, printable) {
  // Not yet active — readerManager will handle session switch
}


// 🔧 Command dispatcher — routes validated shell input to appropriate handler
function processShellCommand(input) {
  if (input.trim() !== '') {
    state.commandHistory.push(input);
  }
  state.historyIndex = state.commandHistory.length;

  const args = input.trim().split(/\s+/);
  const cmd = args[0];
  const cmdArgs = args.slice(1); // Important: separates command from args

  switch (cmd) {
    case 'ls':
      lsCommand(cmdArgs);
      break;
    case 'cd':
      cdCommand(cmdArgs);
      break;
    case 'cat':
      catCommand(cmdArgs);
      break;
    case 'clear':
      clearCommand(cmdArgs);
      break;
    case 'help':
      helpCommand(cmdArgs);
      break;
    case 'ping':
      pingCommand(cmdArgs);
      break;
    case 'ifconfig':
      ifconfigCommand(cmdArgs);
      break;
    case 'nmap':
      nmapCommand(cmdArgs);
      break;
    case 'read':
      read(cmdArgs);
      break;
    case 'ssh':
      sshCommand(cmdArgs);
      break;
    case 'exit':
      exitCommand(cmdArgs);
      break;
    default:
      println(`Command not found: ${cmd}`);
  }
}
