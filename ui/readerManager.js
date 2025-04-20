import state from '../core/stateManager.js';
import { refreshLine } from '../core/terminalHandler.js';

let active = false;

export function enterReaderMode(content) {
    active = true;
  
    // Fully clear terminal including prompt artifacts
    state.terminal.clear();
  
    // Add a tiny delay to ensure clear completes before writing
    setTimeout(() => {
      state.terminal.write('\r\n\r\n');
      printLines(content);
    }, 10); // 10ms is usually enough
  }
  

function printLines(text) {
    const lines = [
        '', // blank line before
        ...text.split('\n'),
        '', '', // two blank lines after
      ];
        const delay = state.settings?.instantText ? 0 : 50;

  let index = 0;
  const printNext = () => {
    if (index < lines.length) {
      state.terminal.writeln(lines[index]);
      index++;
      setTimeout(printNext, delay);
    } else {
      state.terminal.write('\r\n[Press any key to return to shell]');
      waitForKey();
    }
  };

  printNext();
}

function waitForKey() {
  const listener = () => {
    if (!active) return;
    active = false;
    document.removeEventListener('keydown', listener);
    state.terminal.clear();
    refreshLine('shell', state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
  };
  document.addEventListener('keydown', listener);
}
