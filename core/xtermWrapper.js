import {
  initTerminal,
  print,
  writeLine,
  clearTerminal,
  scrollToBottom,
  focusTerminal,
  redraw
} from './terminal/env0.terminal.js'; // adjusted to real location

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
