import { createCanvas, redraw, canvas, getTerminalRows } from './canvasTerminal.js';
import { writeText, writeLine, clearBuffer, getVisibleBuffer, setViewportStartRow } from './terminalBuffer.js';
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
  writeLine(text);  // <-- not print(text + '\r\n') anymore
  scrollToBottom();
  redraw();
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
    const buffer = getVisibleBuffer();
    const maxVisibleRows = getTerminalRows(); // however you calculate terminal viewport height
    const totalRows = buffer.length;
  
    const startRow = Math.max(0, totalRows - maxVisibleRows);
  
    setViewportStartRow(startRow);  // <- you'd implement this
    redraw();
  }
  
  export {
       writeLine,   // <-- ✅ now available to xtermWrapper
      };
  