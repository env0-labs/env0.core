/**
 * env0.core Command Module
 * -------------------------
 * Command: read
 *
 * 🧠 Type: Filesystem Interaction / UI Trigger
 * 🛠️ Depends on: stateManager.js, filesystemManager.js, readerManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: Yes (activates reader mode)
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Opens a text file in fullscreen reader mode.
 */

import { enterReaderMode } from '../ui/readerManager.js';
import state from '../core/stateManager.js';
import { resolveFile } from '../fs/filesystemManager.js';
import { println } from '../core/xtermWrapper.js';

export function read(args) {
  if (!args || args.length === 0) {
    println("Usage: read <filename>");
    return;
  }

  const path = [...state.currentPath, args[0]];
  const file = resolveFile(path);

  if (!file || file.type !== 'file') {
    println(`read: no such file: ${args[0]}`);
    return;
  }

  enterReaderMode(file.content);
}
