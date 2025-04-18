/**
 * env0.core Command Module
 * -------------------------
 * Command: ls
 *
 * 🧠 Type: Filesystem Interaction
 * 🛠️ Depends on: stateManager.js, outputManager.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Lists the contents of the current working directory.
 * Resolves full virtual path via state.currentPath.
 */

console.log('✅ lsCommand loaded');

import state from '../core/stateManager.js';
import { termPrint } from '../core/outputManager.js';

export function lsCommand() {
  let dir = state.machines[state.currentMachine]?.fs['/'];
  for (const part of state.currentPath) {
    if (!dir?.contents?.[part]) {
      termPrint('No such directory.');
      return;
    }
    dir = dir.contents[part];
  }

  if (dir.type !== 'dir') {
    termPrint('Not a directory.');
    return;
  }

  const entries = Object.keys(dir.contents || {});
  termPrint(entries.join('    ') || '[empty]');
}
