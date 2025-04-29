const DEBUG_MODE = false;


import { println } from '../core/xtermWrapper.js';
import { redraw } from '../core/terminal/canvasTerminal.js';
import { createCanvas } from '../core/terminal/canvasTerminal.js';
import { setContext } from '../core/terminal/terminalRenderer.js';
import { handleKeyInput } from '../core/inputManager.js';
import { attachTerminalInput } from '../core/terminalHandler.js';
import { setMode, getMode } from '../core/sessionManager.js';
import { setCursorContext } from '../core/terminal/terminalCursor.js';
import { initLogin, outputIntro } from '../startup/loginManager.js';
import state from '../core/stateManager.js';
import { refreshLine } from '../core/terminalHandler.js';
import fs from '../fs/filesystem.js';

// Grab container and create canvas properly
const terminalContainer = document.getElementById('terminalContainer');
createCanvas(terminalContainer);

// Manual context settings (canvasTerminal.js creates the canvas, so we grab context after)
import { canvas } from '../core/terminal/canvasTerminal.js';
const realCtx = canvas.getContext('2d');

// Link the canvas to state (optional if other systems expect state.terminalElement)
state.terminalElement = canvas;

// Manual context setup
realCtx.setTransform(1, 0, 0, 1, 0, 0);
realCtx.imageSmoothingEnabled = false;
realCtx.font = '16px courier, monospace';
realCtx.fillStyle = '#FFFFFF';
realCtx.textBaseline = 'top';
realCtx.textAlign = 'left';

// Manual cell size
const charWidth = 10;
const charHeight = 21;
setContext(realCtx, charWidth, charHeight);
setCursorContext(realCtx, charWidth, charHeight);

// Dummy refreshLine function for login prompts
function dummyRefreshLine(mode, buffer, user, machine, path) {
  refreshLine(mode, buffer, user, machine, path);
}

// Seed initial system
state.machines = {
    localhost: {
      fs: fs,
      users: {
        root: 'toor'
      }
    }
  };

// Initialize login system
initLogin(dummyRefreshLine);
outputIntro();

// ✅ Now login system can be safely initialized
initLogin(dummyRefreshLine);
outputIntro();

// Bind key handler
attachTerminalInput(handleKeyInput);

