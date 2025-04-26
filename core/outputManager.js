// outputManager.js

import state from './stateManager.js';
import { print, println, clearTerminal } from './xtermWrapper.js';

/**
 * Write a single line to the terminal with a newline.
 */
export function termPrint(text) {
  if (typeof text !== 'string') {
    throw new Error(`[termPrint] Invalid input: ${text}`);
  }
  println(text);
}


/**
 * Write multiple lines to the terminal, one after the other.
 */
export function termPrintLines(lines = []) {
  lines.forEach(line => {
    if (typeof line !== 'string') {
      console.warn('[termPrintLines] Non-string line:', line);
      line = line === undefined || line === null ? '' : String(line);
    }
    println(line);
  });
}


/**
 * Clear the terminal screen.
 */
export function termClear() {
  clearTerminal();
}

// ⚠️ termTypeLine removed — legacy xterm reference
// If reimplemented, route through canvas renderer (print + redraw)
//
// export async function termTypeLine(line, delay = 10) {
//   for (let char of line) {
//     print(char);
//     await sleep(delay);
//   }
//   print('\r\n');
// }
//
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
