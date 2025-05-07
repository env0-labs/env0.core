// burnFX.js

import { config } from '../terminalConfig.js';

const burnBuffer = [];

export function init(ctx, width, height) {
  burnBuffer.length = 0;
}

export function recordChar(row, col, char) {
  if (!burnBuffer[row]) burnBuffer[row] = [];
  burnBuffer[row][col] = { char, opacity: 1.0 };
}

export function update(deltaTime) {
  for (let row = 0; row < burnBuffer.length; row++) {
    const rowData = burnBuffer[row];
    if (!rowData) continue;

    for (let col = 0; col < rowData.length; col++) {
      const cell = rowData[col];
      if (!cell) continue;

      cell.opacity -= deltaTime * 0.0005;
      if (cell.opacity <= 0) {
        delete rowData[col];
      }
    }
  }
}

export function draw(ctx) {
  ctx.save();
  ctx.font = `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#00FF66';

  for (let row = 0; row < burnBuffer.length; row++) {
    const rowData = burnBuffer[row];
    if (!rowData) continue;

    for (let col = 0; col < rowData.length; col++) {
      const cell = rowData[col];
      if (!cell || !cell.char) continue;

      ctx.globalAlpha = cell.opacity * 0.1; // high for debug
      const px = col * config.charWidth + 0.5; // offset for visibility
      const py = row * config.charHeight + 0.5;

      ctx.fillText(cell.char, px, py);
    }
  }

  ctx.restore();
}
