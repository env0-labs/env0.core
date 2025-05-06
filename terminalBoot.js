import state from './core/stateManager.js';
import { initTerminal, focusTerminal } from './core/xtermWrapper.js';
import { attachTerminalInput } from './core/terminalHandler.js';
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

  // 🔥 Start Boot Sequence
  setTimeout(async () => {
    console.log('[BOOT] About to import and run bootSequence.js');
    try {
      const { startBootSequence } = await import('./core/startup/bootSequence.js');
      await startBootSequence();
      console.log('[BOOT] Boot sequence complete');
  
      redraw();
    } catch (err) {
      console.error("[BOOT ERROR]", err);
    }
  }, 200);

  // 🎞 Redraw Loop
  function mainLoop() {
    redraw();
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
});
