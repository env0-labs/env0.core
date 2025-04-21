// /core/xtermWrapper.js

import { Terminal } from 'https://cdn.jsdelivr.net/npm/xterm@5.3.0/+esm';
import state from './stateManager.js';

let terminal = null;

export function initTerminal(container) {
  terminal = new Terminal({
    fontFamily: "monospace",
    fontSize: 14,
    rendererType: "dom", // 🔒 Locking DOM renderer for now (to preserve glow)
    theme: {
      background: "#000000",
      foreground: "#00FF00"
    },
    cursorBlink: true,
    scrollback: 1000
  });

  terminal.open(container);
  state.terminal = terminal;
}

export function print(text = "") {
  if (!terminal) return;
  terminal.write(text);
}

export function println(text = "") {
  print(text + "\r\n");
}

export function clearTerminal() {
  if (!terminal) return;
  terminal.clear();
}

export function scrollToBottom() {
  if (!terminal) return;
  terminal.scrollToBottom();
}
export function focusTerminal() {
    if (!terminal) return;
    terminal.focus();
  }
  