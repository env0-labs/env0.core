// filesystemManager.js

import state from '../stateManager.js';
import { print } from '../xtermWrapper.js';


// Still used if you dynamically assign file systems
function setFileSystem(fs) {
  state.machines[state.currentMachine].fs = fs;
}

// This stays — modular commands depend on it
function getCurrentDir() {
  if (!Array.isArray(state.currentPath)) {
    console.error("DEBUG: currentPath is not an array");
    return null;
  }

  const machine = state.machines[state.currentMachine];
  if (!machine) {
    console.error(`DEBUG: Invalid currentMachine: ${state.currentMachine}`);
    return null;
  }

  let dir = machine.fs['/'];
  for (const part of state.currentPath) {
    dir = dir?.contents?.[part];
    if (!dir) {
      console.error(`DEBUG: Directory not found: ${part}`);
      return null;
    }
  }

  return dir;
}
// Resolves a file path into a file object or returns null
function resolveFile(pathParts) {
  if (!Array.isArray(pathParts)) {
    console.error("resolveFile: pathParts is not an array", pathParts);
    return null;
  }

  let current = state.machines[state.currentMachine]?.fs['/'];
  for (let i = 0; i < pathParts.length; i++) {
    if (!current?.contents?.[pathParts[i]]) {
      return null;
    }
    current = current.contents[pathParts[i]];
  }

  return current?.type === 'file' ? current : null;
}

// Prompt renderer — still needed
function prompt() {
  if (!Array.isArray(state.currentPath)) {
    console.warn("⚠️ state.currentPath was not an array. Resetting to root.");
    console.trace();
    state.currentPath = [];
  }

  const pathStr = state.currentPath.join('/');
  print(`\r\n${state.currentUser || 'user'}@${state.currentMachine || 'localhost'}:/${pathStr}$ `);
}

export { setFileSystem, getCurrentDir, prompt, resolveFile };
