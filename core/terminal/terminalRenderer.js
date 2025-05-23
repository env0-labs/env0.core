// terminalRenderer.js

import { getVisibleBuffer, getViewportStartRow } from './terminalBuffer.js';
import { config } from './terminalConfig.js';
import { getTerminalRows } from './canvasTerminal.js';
import state from '../stateManager.js';
import { drawCursor } from './terminalCursor.js';
import * as glitchFX from './terminalFX/glitchFX.js';
import * as burnFX from './terminalFX/burnFX.js';
import * as rowJitterFX from './terminalFX/rowJitterFX.js';
import { initTerminalFX, updateTerminalFX, drawTerminalFX } from './terminalFX/terminalFXManager.js';
import * as ghostFX from './terminalFX/ghostFX.js';
import * as flickerFX from './terminalFX/flickerFX.js';

let ctx = null;
let charWidth = config.charWidth;
let charHeight = config.charHeight;

let glowCanvas = document.createElement('canvas');
let glowCtx = glowCanvas.getContext('2d');

export function setContext(context, width, height) {
  ctx = context;
  charWidth = width;
  charHeight = height;

  glowCanvas = document.createElement('canvas');
  glowCanvas.width = ctx.canvas.width;
  glowCanvas.height = ctx.canvas.height;
  glowCtx = glowCanvas.getContext('2d', { alpha: true });

  glowCtx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  glowCtx.textBaseline = 'top';
  glowCtx.textAlign = 'left';
}

function drawGlowLayer(lines, viewportStart) {
  glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);

  glowCtx.shadowBlur = 4;
  glowCtx.shadowColor = '#00FF66';
  glowCtx.fillStyle = 'rgba(255,255,255,0.8)';
  glowCtx.globalAlpha = 1.0;
  glowCtx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  glowCtx.textBaseline = 'top';
  glowCtx.textAlign = 'left';

  const maxRows = getTerminalRows();

  for (let screenRow = 0; screenRow < maxRows; screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (typeof bufferRow !== 'string') continue;

    const baseY = screenRow * charHeight;

    for (let col = 0; col < bufferRow.length; col++) {
      const char = bufferRow[col];
      const px = col * charWidth;
      const py = baseY;

      if (char !== ' ') {
        glowCtx.fillText(char, px, py);
      }
    }
  }
}

export function drawFromBuffer() {
  if (!ctx) return;

  const lines = getVisibleBuffer();
  const viewportStart = getViewportStartRow();
  const maxRows = getTerminalRows();

  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Step 1: Draw Main Text with Glow (Integrated)
  ctx.save();
  ctx.shadowBlur = 24;        // Glow size
  ctx.shadowColor = '#00FF66'; // Neon green glow
  ctx.fillStyle = '#00FF66';  // Text matches glow color
  ctx.globalAlpha = 0.8;      // Glow intensity

  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  for (let screenRow = 0; screenRow < maxRows; screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (typeof bufferRow !== 'string') continue;

    const baseY = screenRow * charHeight;
    const xOffset = rowJitterFX.getRowOffset(screenRow);

    for (let col = 0; col < bufferRow.length; col++) {
      const originalChar = bufferRow[col];
      const glitchedChar = glitchFX.getGlitchedChar(screenRow, col, originalChar);
      burnFX.recordChar(screenRow, col, glitchedChar);

      const px = col * charWidth + xOffset;
      const py = baseY;

      ctx.fillText(glitchedChar, px, py);
    }
  }
  ctx.restore();

  // Step 2: Apply FX (Flicker, Burn, Ghost)
  ctx.save();
  flickerFX.apply(ctx);
  burnFX.draw(ctx);
  ghostFX.draw(ctx);
  ctx.restore();

  // Step 3: Draw Cursor Last (Always on Top)
  drawCursor();
}
