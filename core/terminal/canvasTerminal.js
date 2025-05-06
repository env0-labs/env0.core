// canvasTerminal.js

import { config } from './terminalConfig.js';
import { setContext, drawFromBuffer } from './terminalRenderer.js';
import { setCursorContext, startBlink, getCursorPosition } from './terminalCursor.js';
import { initTerminalFX, updateTerminalFX, drawTerminalFX } from './terminalFX/terminalFXManager.js';

export let canvas, ctx;
let cols = 80, rows = 25;
let charWidth = 0, charHeight = 0;
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
    console.error("❌ Failed to create 2D canvas context.");
    return;
  }

  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';

  requestAnimationFrame(() => {
    resizeCanvas();
  });

  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('click', () => canvas.focus());
}

function measureCharSize() {
  if (config.useFixedCellSize) {
    charWidth = config.charWidth;
    charHeight = config.charHeight;
  } else {
    const metrics = ctx.measureText('M');
    charWidth = Math.ceil(metrics.width);
    charHeight = Math.ceil(config.fontSize * 1.5);
  }

  cols = Math.floor(canvas.clientWidth / charWidth);
  rows = Math.floor(canvas.clientHeight / charHeight);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  measureCharSize();
  setContext(ctx, charWidth, charHeight);
  setCursorContext(ctx, charWidth, charHeight);
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

// --- External API for terminal control ---
export function clearCurrentLine(targetRow = null) {
  const { y } = getCursorPosition();
  const row = targetRow !== null ? targetRow : y;
  const pixelY = row * config.charHeight;

  console.warn('[clearLine] Clearing row:', row, '→ pixelY:', pixelY);
  console.warn('[clearLine] Canvas height:', canvas.height);

  ctx.clearRect(0, pixelY, canvas.width, config.charHeight);
}
