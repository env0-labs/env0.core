import state from './core/stateManager.js';
import { initTerminal, focusTerminal } from './core/xtermWrapper.js';
import { refreshLine, attachTerminalInput } from './core/terminalHandler.js';
import { initLogin } from './core/startup/loginManager.js';
import { handleKeyInput } from './core/inputManager.js';
import fs from './core/fs/filesystem.js';
import { setFileSystem } from './core/fs/filesystemManager.js';
import { initializeMenu } from './core/ui/menuManager.js';
import { redraw } from './core/terminal/canvasTerminal.js';

import { triggerGlitch } from './core/fx/canvasFXManager.js';
window.triggerGlitch = triggerGlitch; // [DEV TOOL] Manual trigger for glitch effects during testing

window.DEBUG_MODE = window.DEBUG_MODE ?? false;

// 🧭 UI Initialization
initializeMenu();

// 🔧 Boot Sequence
document.addEventListener("DOMContentLoaded", () => {
  const terminalContainer = document.getElementById("terminal");

  // 🔌 Terminal Setup
  initTerminal(terminalContainer);
  focusTerminal();
  attachTerminalInput(handleKeyInput);

  // 📁 Filesystem Setup
  setFileSystem(fs);
  state.machines = {
    localhost: {
      fs: fs,
      users: {
        root: 'toor'
      }
    }
  };

  // 🧑‍💻 Bind login prompt logic
  initLogin(refreshLine);

  // 🔥 Start Boot Sequence
  setTimeout(async () => {
    try {
      const { startBootSequence } = await import('./core/startup/bootSequence.js');
      await startBootSequence();
  
      // Optional: one last redraw to flush canvas state
      redraw();
  
    } catch (err) {
      // console.error("Boot sequence failed:", err);
    }
  }, 200);
  

  // 🎞 Redraw Loop
  function mainLoop() {
    redraw();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
});
