/**
 * env0.core Command Module
 * -------------------------
 * Command: ls
 *
 * 🧠 Type: Filesystem Interaction
 * 🛠️ Depends on: stateManager.js, filesystemManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Lists the contents of the current working directory.
 */

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
  const colWidth = 20; // Each filename block is 20 characters wide
  const itemsPerLine = Math.floor(terminalCols / colWidth) || 1;

  let line = '';


  entries.forEach((name, index) => {
    if (typeof name !== 'string' || name === 'undefined') {
      console.warn('[ls] Skipping invalid entry:', name);
      return;
    }

    const paddedName = (name + ' '.repeat(colWidth)).slice(0, colWidth);
    line += paddedName;

    if ((index + 1) % itemsPerLine === 0) {
      println(line.trimEnd());
      line = '';
    }
  });

  if (line.trim().length > 0) {
    println(line.trimEnd());
  }
}
