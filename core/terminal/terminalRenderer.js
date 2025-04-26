// terminalRenderer.js

import { config } from './terminalConfig.js';
import { getVisibleBuffer, getViewportStartRow } from './terminalBuffer.js';
import { drawCursor } from './terminalCursor.js';
import { canvas, getTerminalRows } from './canvasTerminal.js';

let ctx, charWidth, charHeight;

export function setContext(newCtx, width, height) {
  ctx = newCtx;
  charWidth = width;
  charHeight = height;
}

export function drawFromBuffer() {
  if (!ctx) return; // 🛡️ Skip draw until context is set

  const lines = getVisibleBuffer();
  const viewportStart = getViewportStartRow();
  const maxRows = getTerminalRows();

  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = config.fgColor;

  for (let screenRow = 0; screenRow < maxRows; screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (bufferRow !== undefined) {
      const line = (typeof bufferRow === 'string') ? bufferRow : '[INVALID]';
      const shouldRender = line && line.trim().length > 0;
      const paddedLine = shouldRender ? line + ' ' : ' ';
      ctx.fillText(paddedLine, 0, screenRow * charHeight);
    }
  }

  drawCursor();
}
