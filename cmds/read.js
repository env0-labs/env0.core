// read.js

import { enterReaderMode } from '../ui/readerManager.js';
import state from '../core/stateManager.js';
import { resolveFile } from '../fs/filesystemManager.js';

export function read(args) {
  if (!args || args.length === 0) {
    state.terminal.writeln("Usage: read <filename>");
    return;
  }

  const path = [...state.currentPath, args[0]];
  const file = resolveFile(path);

  if (!file || file.type !== 'file') {
    state.terminal.writeln(`read: no such file: ${args[0]}`);
    return;
  }

  enterReaderMode(file.content);
}
