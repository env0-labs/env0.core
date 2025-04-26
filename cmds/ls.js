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
  let dir = getCurrentDir();
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

  const cols = getTerminalCols();
  let line = '';

  entries.forEach(name => {
    if (typeof name !== 'string' || name === 'undefined') {
      console.warn('[ls] Skipping invalid entry:', name);
      return;
    }

    const entry = name + '    ';
    if ((line.length + entry.length) >= cols) {
      if (line.trim().length > 0) println(line);
      line = entry;
    } else {
      line += entry;
    }
  });

  if (line && line.trim().length > 0) {
    println(line);
  } else {
    println('[empty]');
  }
}
