import state from '../core/stateManager.js';
import { println } from '../core/xtermWrapper.js';
import { getCurrentDir } from '../core/fs/filesystemManager.js';
import { getTerminalCols } from '../core/terminal/canvasTerminal.js';

export function catCommand(args) {
  if (!args[0]) {
    println('Usage: cat <file>');
    return;
  }

  const dir = getCurrentDir();
  if (!dir) {
    println('Invalid path.');
    return;
  }
  
  const file = dir.contents?.[args[0]];

  if (file?.type === 'file') {
    const terminalCols = getTerminalCols() || 80;
    const lines = file.content.split('\n');
    lines.forEach(line => {
      if (line.length <= terminalCols) {
        println(line);
      } else {
        for (let i = 0; i < line.length; i += terminalCols) {
          println(line.slice(i, i + terminalCols));
        }
      }
    });
  } else {
    println(`No such file: ${args[0]}`);
  }
}
