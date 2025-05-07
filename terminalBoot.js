import state from './core/stateManager.js';
import { initTerminal, focusTerminal } from './core/xtermWrapper.js';
import { attachTerminalInput } from './core/terminalHandler.js';
import { handleKeyInput } from './core/inputManager.js';
import fs from './core/fs/filesystem.js';
import { setFileSystem } from './core/fs/filesystemManager.js';
import { initializeMenu } from './core/ui/menuManager.js';
import { redraw } from './core/terminal/canvasTerminal.js';
import { triggerGlitch } from './core/fx/canvasFXManager.js';
import { startBootSequence } from './core/startup/bootSequence.js';

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

  // ✅ Check Skip Intro Flag (Guaranteed Clean)
  const skipIntro = localStorage.getItem('skipIntro') === 'true';
  console.log('[Boot] Skip Intro:', skipIntro);

  if (skipIntro) {
    console.log('[Boot] Skipping Boot Sequence Immediately');
    startBootSequence({ skipIntro: true });
  } else {
    console.log('[Boot] Running Normal Boot Sequence');
    startBootSequence();
  }

  // 🎞 Redraw Loop (Optimized)
  function mainLoop() {
    if (state.FXActive) {
      redraw();
    }
    requestAnimationFrame(mainLoop);
  }

  requestAnimationFrame(mainLoop);
});
