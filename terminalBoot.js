import state from './core/stateManager.js';
import { initTerminal, focusTerminal } from './core/xtermWrapper.js'; // ✅ with focusTerminal
import { refreshLine, attachTerminalInput } from './core/terminalHandler.js';
import { initLogin, outputIntro } from './core/startup/loginManager.js';
import { handleKeyInput } from './core/inputManager.js';
import fs from './core/fs/filesystem.js';
import { setFileSystem } from './core/fs/filesystemManager.js';
import { initializeMenu } from './core/ui/menuManager.js';
import { redraw } from './core/terminal/canvasTerminal.js';

import { triggerGlitch } from './core/fx/canvasFXManager.js';
window.triggerGlitch = triggerGlitch; // [DEV TOOL] Manual trigger for glitch effects during testing



window.DEBUG_MODE = window.DEBUG_MODE ?? false;

initializeMenu();

// 1. Set up the terminal using the wrapper
document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.getElementById("terminal");
  
  // 🔥 Terminal Setup
  initTerminal(terminalContainer);
  focusTerminal();
  attachTerminalInput(handleKeyInput);

  // 🔥 Filesystem Setup
  setFileSystem(fs); // <-- fs is from filesystem.js

  // 🔥 Machines Setup
  state.machines = {
    localhost: {
      fs: fs,
      users: {
        root: 'toor'
      }
    }
  };
  console.warn('[main.js] State machines seeded:', JSON.stringify(state.machines, null, 2));

  // 🔥 Bind loginManager with terminal refreshLine
  console.warn('[main.js] Binding loginManager refreshLine');
  initLogin(refreshLine);

  // 🔥 Start Boot Sequence
  setTimeout(async () => {
    try {
      const { startBootSequence } = await import('./core/startup/bootSequence.js');
      await startBootSequence();
    } catch (err) {
      console.error("Boot sequence failed:", err);
    }
  }, 200);

  function mainLoop() {
    redraw();
    requestAnimationFrame(mainLoop); // [PHASE 3] Temporary main loop driving redraws until full system expansion
  }
  
  requestAnimationFrame(mainLoop);
  

}

);

