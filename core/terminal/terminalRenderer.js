// terminalRenderer.js

import { config } from './terminalConfig.js';
import { getVisibleBuffer, getViewportStartRow } from './terminalBuffer.js';
import { drawCursor } from './terminalCursor.js';
import { canvas, getTerminalRows } from './canvasTerminal.js';
import { updateCanvasFX, drawCanvasFX } from '../../core/fx/canvasFXManager.js';
import state from '../stateManager.js';

let ctx, charWidth, charHeight;
let glowTimer = 0;

export function setContext(newCtx, width, height) {
  ctx = newCtx;
  ctx.font = `bold ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  charWidth = width;
  charHeight = height;
}

export function drawFromBuffer() {
  if (!ctx) return;

  const lines = getVisibleBuffer();
  const viewportStart = getViewportStartRow();
  const maxRows = getTerminalRows();

  glowTimer += 0.016;
  const base = 0.6 + Math.sin(glowTimer * 0.1) * 0.3;
  const jitter = (Math.random() - 0.5) * 0.25;
  const glowStrength = Math.max(0, base + jitter);
  
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let screenRow = 0; screenRow < maxRows; screenRow++) {
    const bufferRow = lines[viewportStart + screenRow];
    if (bufferRow !== undefined) {
      const line = (typeof bufferRow === 'string') ? bufferRow : '[INVALID]';
      const shouldRender = line && line.trim().length > 0;
      const paddedLine = shouldRender ? line + ' ' : ' ';

      if (shouldRender) {
        // Glow pass
        ctx.save();
        ctx.shadowColor = 'rgb(255, 255, 255)';
        ctx.shadowBlur = 8;
        ctx.globalAlpha = glowStrength;
        ctx.fillStyle = config.fgColor;
        ctx.fillText(paddedLine, 0.9, screenRow * charHeight); // slight x offset
        ctx.restore();
      }

      // Solid text pass
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = config.fgColor;
      ctx.fillText(paddedLine, 0, screenRow * charHeight);
    }
  }

  drawCursor();

  if (state.settings?.enableVisualFX) {
    const deltaTime = 16;
    updateCanvasFX(deltaTime);
    drawCanvasFX();
  }
}

