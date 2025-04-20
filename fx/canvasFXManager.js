// canvasFXManager.js

let overlayCanvas = null;
let ctx = null;

export function initCanvasFX() {
  // Placeholder only — no DOM insert
  console.log('[canvasFX] Initialized (inactive)');
}

export function enableOverlay(enabled) {
  if (!overlayCanvas) return;
  overlayCanvas.style.display = enabled ? 'block' : 'none';
}

// Placeholder stubs for future FX
export function drawNoiseFrame() {}
export function drawFlickerFrame() {}
export function triggerFlash() {}
export function clearCanvas() {}
