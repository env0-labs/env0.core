import state from '../core/stateManager.js';
import { refreshLine } from '../core/terminalHandler.js';
import { print, println, clearTerminal } from '../core/xtermWrapper.js';


let active = false;

export function enterReaderMode(content) {
    active = true;
  
    // Fully clear terminal including prompt artifacts
    clearTerminal();
  
    // Add a tiny delay to ensure clear completes before writing
    setTimeout(() => {
      print('\r\n\r\n');
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
      println(lines[index]);
      index++;
      setTimeout(printNext, delay);
    } else {
      print('\r\n[Press any key to return to shell]');
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
    clearTerminal();
    refreshLine('shell', state.commandBuffer, state.currentUser, state.currentMachine, state.currentPath);
  };
  document.addEventListener('keydown', listener);
}
