// terminalFXManager.js
//
// Central controller for terminal visual effects.
// Manages per-frame updates and layered rendering for:
// - glowFX
// - flickerFX
//
// Each FX module must export:
//   init(ctx, width, height)
//   update(deltaTime)
//   draw(ctx)

import * as glowFX from './glowFX.js';
import * as flickerFX from './flickerFX.js';

let enabled = true;

export function initTerminalFX(ctx, width, height) {
  glowFX.init(ctx, width, height);
  flickerFX.init(ctx, width, height);
}

export function updateTerminalFX(deltaTime) {
  if (!enabled) return;
  glowFX.update(deltaTime);
  flickerFX.update(deltaTime);
}

export function drawTerminalFX(ctx) {
  if (!enabled) return;
  glowFX.draw(ctx);
  flickerFX.draw(ctx);
}

// Optional toggler (e.g. for settings)
export function setFXEnabled(flag) {
  enabled = flag;
}
