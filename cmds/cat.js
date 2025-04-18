/**
 * env0.core Command Module
 * -------------------------
 * Command: cat
 *
 * 🧠 Type: Filesystem Interaction
 * 🛠️ Depends on: stateManager.js, outputManager.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Outputs the contents of a specified file in the current directory.
 * Does not support full path resolution (filename only).
 */

import state from '../core/stateManager.js';
import { termPrint } from '../core/outputManager.js';

export function catCommand(args) {
  if (!args[1]) {
    termPrint('Usage: cat <file>');
    return;
  }

  let dir = state.machines[state.currentMachine]?.fs['/'];
  for (const part of state.currentPath) {
    if (!dir?.contents?.[part]) {
      termPrint('Invalid path.');
      return;
    }
    dir = dir.contents[part];
  }

  const file = dir.contents?.[args[1]];

  if (file?.type === 'file') {
    termPrint(file.content);
  } else {
    termPrint(`No such file: ${args[1]}`);
  }
}
