// burnFX.js
//
// Simulates phosphor burn-in: old characters slowly fade over time
// after being replaced or erased. Decoupled from main terminal buffer.

import { config } from '../terminalConfig.js';


let burnBuffer = [];
let width = 0, height = 0;
const maxRows = 100;
const maxCols = 120;

const fadeRate = 0.05; // How much intensity fades per frame (tweak later)

export function init(ctx, w, h) {
  width = w;
  height = h;
  burnBuffer = new Array(maxRows).fill(null).map(() =>
    new Array(maxCols).fill(null)
  );
}

export function update(deltaTime) {
    for (let row = 0; row < maxRows; row++) {
        const rowData = burnBuffer[row];
        if (!rowData) continue;
        for (let col = 0; col < maxCols; col++) {
          const cell = rowData[col];
      if (cell && cell.opacity > 0) {
        cell.opacity -= fadeRate * deltaTime;
        if (cell.opacity < 0) cell.opacity = 0;
      }
    }
  }
}

export function draw(ctx) {
  ctx.save();
  ctx.font = `bold ${config.charHeight}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#00FF00'; // Optional: could use config.fgColor

  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const cell = burnBuffer[row][col];
      if (cell && cell.opacity > 0) {
        ctx.globalAlpha = cell.opacity * 0.08;
        ctx.fillText(
          cell.char,
          col * config.charWidth,
          row * config.charHeight
        );
      }
    }
  }

  ctx.restore();
}

export function recordChar(row, col, char) {
  if (row >= 0 && col >= 0 && row < maxRows && col < maxCols) {
    burnBuffer[row][col] = {
      char: char,
      opacity: 1.0
    };
  }
}
