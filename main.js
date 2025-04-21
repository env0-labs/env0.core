import state from './core/stateManager.js';
import { initTerminal } from './core/xtermWrapper.js'; // ⬅ new wrapper
import { refreshLine, attachTerminalInput } from './core/terminalHandler.js';
import { initLogin, outputIntro } from './startup/loginManager.js';
import { handleKeyInput } from './core/inputManager.js';
import fs from './fs/filesystem.js';
import { setFileSystem } from './fs/filesystemManager.js';
import { initializeMenu } from './ui/menuManager.js';

initializeMenu();

// 1. Set up the terminal using the wrapper
document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.getElementById("terminal");
  initTerminal(terminalContainer); // ⬅ uses DOM renderer, glow-safe
  attachTerminalInput(handleKeyInput);
  setFileSystem(fs);

  // 4. Start the login flow
  setTimeout(async () => {
    try {
      const { startBootSequence } = await import('./startup/bootSequence.js');
      await startBootSequence();
    } catch (err) {
      console.error("Boot sequence failed:", err);
    }
  }, 200);
});
