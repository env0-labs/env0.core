import {
  initTerminal,
  print,
  writeLine,
  clearTerminal,
  scrollToBottom,
  focusTerminal,
  redraw
} from './terminal/env0.terminal.js';

import { clearCurrentLine as rendererClearLine } from './terminal/canvasTerminal.js';

export {
  initTerminal,
  print,
  clearTerminal,
  scrollToBottom,
  focusTerminal,
  redraw
};

export function println(text = '') {
  writeLine(text);
  scrollToBottom();
  redraw();
}

export function clearLine(row = null) {
  rendererClearLine(row);
}
