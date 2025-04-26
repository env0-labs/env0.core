import state from '../core/stateManager.js';
import { println } from '../core/xtermWrapper.js';

export function cdCommand(args) {
  if (!args[1]) {
    println('Usage: cd <directory>');
    return;
  }

  const inputPath = args[1];
  const parts = inputPath.split('/').filter(Boolean);
  let newPath = inputPath.startsWith('/') ? [] : [...state.currentPath];
  let dir = state.machines[state.currentMachine]?.fs['/'];

  for (const segment of newPath) {
    if (!dir?.contents?.[segment] || dir.contents[segment].type !== 'dir') {
      println(`${segment} is not a directory or doesn't exist`);
      return;
    }
    dir = dir.contents[segment];
  }

  for (const part of parts) {
    if (part === '..') {
      newPath.pop();
      dir = state.machines[state.currentMachine]?.fs['/'];
      for (const segment of newPath) {
        if (!dir?.contents?.[segment] || dir.contents[segment].type !== 'dir') {
          println(`${segment} is not a directory or doesn't exist`);
          return;
        }
        dir = dir.contents[segment];
      }
    } else {
      if (!dir?.contents?.[part] || dir.contents[part].type !== 'dir') {
        println(`${part} is not a directory or doesn't exist`);
        return;
      }
      newPath.push(part);
      dir = dir.contents[part];
    }
  }

  state.currentPath = newPath;
  // ✅ DO NOT CALL prompt() here
  // Let shell lifecycle (println + refreshShellPrompt) handle it naturally
}
