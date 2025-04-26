/**
 * env0.core Command Module
 * -------------------------
 * Command: cat
 *
 * 🧠 Type: Filesystem Interaction
 * 🛠️ Depends on: stateManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Outputs the contents of a specified file in the current directory.
 * Does not support full path resolution (filename only).
 */

import state from '../core/stateManager.js';
import { println } from '../core/xtermWrapper.js';

export function catCommand(args) {
  if (!args[1]) {
    println('Usage: cat <file>');
    return;
  }

  let dir = state.machines[state.currentMachine]?.fs['/'];
  for (const part of state.currentPath) {
    if (!dir?.contents?.[part]) {
      println('Invalid path.');
      return;
    }
    dir = dir.contents[part];
  }

  const file = dir.contents?.[args[1]];

  if (file?.type === 'file') {
    println(file.content);
  } else {
    println(`No such file: ${args[1]}`);
  }
}
