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
import { getCurrentDir } from '../fs/filesystemManager.js';
import { prompt } from '../fs/filesystemManager.js';


export function catCommand(args) {
  if (!args[1]) {
    println('Usage: cat <file>');
    return;
  }

  const dir = getCurrentDir();
  if (!dir) {
    println('Invalid path.');
    return;
  }
  
  const file = dir.contents?.[args[1]];
  

  if (file?.type === 'file') {
    println(file.content);
  } else {
    println(`No such file: ${args[1]}`);
  }
}
