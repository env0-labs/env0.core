// terminalBuffer.js

const buffer = [];
let viewportStartRow = 0;
const maxLines = 1000;

export function clearBuffer() {
  buffer.length = 0;
  viewportStartRow = 0;
}

export function writeText(text) {
  if (!buffer.length) {
    buffer.push('');
  }
  buffer[buffer.length - 1] += text;
  clampScrollback();
}

export function writeLine(text = '') {
  buffer.push(text);
  clampScrollback();
}

export function getVisibleBuffer() {
  return buffer;
}

export function clampScrollback() {
  if (buffer.length > maxLines) {
    const excess = buffer.length - maxLines;
    buffer.splice(0, excess);
    viewportStartRow = Math.max(viewportStartRow - excess, 0);
  }
}

export function setViewportStartRow(row) {
  viewportStartRow = row;
}

export function getViewportStartRow() {
  return viewportStartRow;
}
export function overwriteLastLine(newText) {
  if (buffer.length > 0) {
    buffer[buffer.length - 1] = newText;
  } else {
    buffer.push(newText);
  }
}

export function setLineAt(index, text) {
  while (buffer.length <= index) {
    buffer.push('');
  }
  buffer[index] = text;
}


export function pushLine(text = '') {
  buffer.push(text);
}
