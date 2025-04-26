import state from '../core/stateManager.js';
import { println } from '../core/xtermWrapper.js';
import { getTerminalCols } from '../core/terminal/canvasTerminal.js';
import { getCurrentDir } from '../fs/filesystemManager.js';

export function lsCommand() {
  const dir = getCurrentDir();
  if (!dir) {
    println('No such directory.');
    return;
  }

  if (dir.type !== 'dir') {
    println('Not a directory.');
    return;
  }

  const entries = Object.keys(dir.contents || {});
  if (entries.length === 0) {
    println('[empty]');
    return;
  }

  const terminalCols = getTerminalCols();
  const colWidth = 16; // Tighter default width
  const itemsPerRow = Math.floor(terminalCols / colWidth) || 1;

  let row = '';

  entries.forEach((name, index) => {
    const padded = (name + ' '.repeat(colWidth)).slice(0, colWidth);
    row += padded;

    if ((index + 1) % itemsPerRow === 0) {
      println(row.trimEnd());
      row = '';
    }
  });

  if (row.trim().length > 0) {
    println(row.trimEnd());
  }
}
