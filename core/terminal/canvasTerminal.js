// canvasTerminal.js

import { config } from './terminalConfig.js';
import { setContext, drawFromBuffer } from './terminalRenderer.js';
import { setCursorContext, startBlink, getCursorPosition } from './terminalCursor.js';
import { initTerminalFX, updateTerminalFX, drawTerminalFX } from './terminalFX/terminalFXManager.js';

export let canvas, ctx;
let cols = 80, rows = 25;
let animating = false;

export function getTerminalCols() {
  return cols;
}

export function getTerminalRows() {
  return rows;
}

export function createCanvas(container) {
  canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.backgroundColor = '#000000';
  canvas.setAttribute('tabindex', 0);

  container.appendChild(canvas);

  ctx = canvas.getContext('2d', {
    alpha: false,
    colorSpace: 'srgb'
  }) || canvas.getContext('2d');

  if (!ctx) {
    console.error('❌ Failed to create 2D canvas context.');
    return;
  }

  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';

  // ⬇️ Replaced single-char measure with averaged width of 10 'M's
  const sample = 'MMMMMMMMMM'; // 10 glyphs
  const measuredWidth = ctx.measureText(sample).width;
  config.charWidth = Math.ceil(measuredWidth / 10);

  config.charHeight = config.fontSize;
  console.log('[Canvas Init] charWidth:', config.charWidth, 'charHeight:', config.charHeight);

  requestAnimationFrame(() => {
    resizeCanvas();
  });

  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('click', () => canvas.focus());
}


function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // Remeasure charWidth using multi-glyph sample
  const sample = 'MMMMMMMMMM';
  const measuredWidth = ctx.measureText(sample).width;
  config.charWidth = Math.ceil(measuredWidth / 10);

  cols = Math.floor(canvas.clientWidth / config.charWidth);
  rows = Math.floor(canvas.clientHeight / config.charHeight);

  setContext(ctx, config.charWidth, config.charHeight);
  setCursorContext(ctx);
  initTerminalFX(ctx, canvas.width, canvas.height);

  redraw();
  startBlink();
  startRenderLoop();
}


export function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFromBuffer();
  drawTerminalFX(ctx);
}

export function startRenderLoop() {
  if (animating) return;
  animating = true;

  function frame() {
    const deltaTime = 16;
    drawFromBuffer();
    updateTerminalFX(deltaTime);
    drawTerminalFX(ctx);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export function clearCurrentLine(targetRow = null) {
  const { y } = getCursorPosition();
  const row = targetRow !== null ? targetRow : y;
  const pixelY = row * config.charHeight;

  ctx.clearRect(0, pixelY, canvas.width, config.charHeight);
}
