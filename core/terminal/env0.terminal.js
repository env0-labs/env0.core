import { createCanvas, redraw, canvas } from './canvasTerminal.js';
import { writeText, writeLine, clearBuffer } from './terminalBuffer.js';
import { startBlink } from './terminalCursor.js';

let containerEl = null;

export function initTerminal(container) {
  containerEl = container;
  console.log("[terminal] initTerminal called");
  createCanvas(containerEl);
}

export function print(text) {
  writeText(text);
  redraw();
}

export function println(text = '') {
  if (typeof text !== 'string') {
    console.warn('[println] Coerced non-string input:', text);
    text = text === undefined || text === null ? '' : String(text);
  }
  print(text + '\r\n');
}



export function clearTerminal() {
  clearBuffer();
  redraw();
}

export { redraw };

export function focusTerminal() {
  canvas.setAttribute('tabindex', 0);
  canvas.focus();
  }

  export function scrollToBottom() {
    // Not implemented yet — will hook into scrollback buffer later
  }
  