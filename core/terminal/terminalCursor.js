// terminalCursor.js

import { config } from './terminalConfig.js';
import { redraw } from './canvasTerminal.js'; // add this at top
import { getTerminalCols } from './canvasTerminal.js'; // add this

let blinkInterval = null;
let cursorX = 0;
let cursorY = 0;
let charWidth = 0;
let charHeight = 0;
let ctx = null;
let visible = true;

export function setCursorContext(context, cw, ch) {
  ctx = context;
  charWidth = cw;
  charHeight = ch;
}

export function moveCursorTo(x, y) {
  cursorX = x;
  cursorY = y;
}

export function advanceCursor(chars = 1) {
  cursorX += chars;
  const cols = getTerminalCols(); // safe global reader

  if (cursorX >= cols) {
    cursorX = 0;
    cursorY += 1;
  }
}

export function newlineCursor() {
  cursorX = 0;
  cursorY += 1;
}

export function resetCursor() {
    cursorX = 0;
    cursorY = 0;
  }

export function drawCursor() {
  if (!ctx || !visible) return;

  const x = cursorX * charWidth + config.cursorOffsetX;
  const y = cursorY * charHeight + config.cursorOffsetY;
  

  ctx.fillStyle = config.fgColor;
  ctx.fillRect(x, y, charWidth, charHeight);
}

export function showCursor() {
  visible = true;
  drawCursor();
}

export function startBlink(rate = 500) {
    if (blinkInterval) clearInterval(blinkInterval);
  
    blinkInterval = setInterval(() => {
      visible = !visible;
      redraw(); // redraw clears canvas, redraws text + cursor
    }, rate);
  }
  export function getCursorPosition() {
    return { x: cursorX, y: cursorY };
  }
  
  export function setCursorPosition(x, y) {
    cursorX = x;
    cursorY = y;
  }
  