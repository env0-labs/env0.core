// terminalCursor.js
import { config } from './terminalConfig.js';
import { redraw } from './canvasTerminal.js';

let ctx = null;
let cursorX = 0;
let cursorY = 0;
let visible = true;
let blinkTimer = null;

export function setCursorContext(context) {
  ctx = context;
}

export function moveCursorTo(x, y) {
  cursorX = x;
  cursorY = y;
}

export function advanceCursor(chars = 1) {
  cursorX += chars;
  const cols = Math.floor(ctx.canvas.width / config.charWidth);
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

export function getCursorPosition() {
  return { x: cursorX, y: cursorY };
}

export function setCursorPosition(x, y) {
  cursorX = x;
  cursorY = y;
}

export function drawCursor() {
  if (!ctx || !visible) return;

  const px = Math.round(cursorX * config.charWidth);
  const py = Math.round(cursorY * config.charHeight);

  ctx.fillStyle = config.fgColor;
  ctx.fillRect(px, py, config.charWidth, config.charHeight);

}

export function showCursor() {
  visible = true;
  drawCursor();
}

export function startBlink(rate = 500) {
  if (blinkTimer) clearInterval(blinkTimer);

  blinkTimer = setInterval(() => {
    visible = !visible;
    redraw(); // will call drawCursor internally
  }, rate);
}