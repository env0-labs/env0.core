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

let ctx = null;
let charWidth = config.charWidth;
let charHeight = config.charHeight;

// Offscreen glow layer
let glowCanvas = document.createElement('canvas');
let glowCtx = glowCanvas.getContext('2d');

export function setContext(context, width, height) {
  ctx = context;
  charWidth = width;
  charHeight = height;

  // Resize glow canvas
  glowCanvas.width = ctx.canvas.width;
  glowCanvas.height = ctx.canvas.height;

  glowCtx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  glowCtx.textBaseline = 'top';
  glowCtx.textAlign = 'left';
}

// --- Optional glow layer function ---
function drawGlowLayer(lines, viewportStart) {
  glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
  glowCtx.shadowBlur = 6;
  glowCtx.shadowColor = '#0F0'; // CRT green
  glowCtx.fillStyle = 'rgba(0,0,0,0)'; // transparent glyph fill

  for (let screenRow = 0; screenRow < getTerminalRows(); screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (typeof bufferRow !== 'string' || !bufferRow.length) continue;

    const baseY = screenRow * charHeight;

    for (let col = 0; col < bufferRow.length; col++) {
      const char = bufferRow[col];
      const px = col * charWidth;
      const py = baseY;
      glowCtx.fillText(char, px, py);
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

  if (state.settings?.enableGlow) {
    drawGlowLayer(lines, viewportStart);
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(glowCanvas, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  }

  for (let screenRow = 0; screenRow < maxRows; screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (typeof bufferRow !== 'string') continue;

    const baseY = screenRow * charHeight;

    for (let col = 0; col < bufferRow.length; col++) {
      const originalChar = bufferRow[col];
      const glitchedChar = glitchFX.getGlitchedChar(screenRow, col, originalChar);
      burnFX.recordChar(screenRow, col, glitchedChar);

      const px = col * charWidth;
      const py = baseY;

      ctx.fillStyle = config.fgColor;
      ctx.shadowBlur = 0;
      ctx.fillText(glitchedChar, px, py);
    }
  }

  drawCursor();

  if (state.settings?.enableVisualFX) {
    const deltaTime = 16;
    updateTerminalFX(deltaTime);
    drawTerminalFX(ctx);
  }
}
