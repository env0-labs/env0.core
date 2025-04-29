// rowJitterFX.js
//
// Introduces small horizontal jitter per row to simulate CRT scanline instability.

let rowOffsets = [];
let maxOffset = 12; // maximum pixel offset left or right
let jitterFrequency = 0.001; // chance per row per frame to jitter

export function init(ctx, width, height) {
  rowOffsets = new Array(100).fill(0); // More rows than we actually need
}

export function update(deltaTime) {
  for (let row = 0; row < rowOffsets.length; row++) {
    if (Math.random() < jitterFrequency) {
        rowOffsets[row] = Math.floor(Math.random() * (maxOffset + 1)); // 0 to +maxOffset only
    }
  }
}

export function draw(ctx) {
  // No direct drawing — offsets only
}

export function getRowOffset(row) {
  return rowOffsets[row] || 0;
}
