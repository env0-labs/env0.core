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
import * as ghostFX from './ghostFX.js';
import * as glitchFX from './glitchFX.js';
import * as rowJitterFX from './rowJitterFX.js';
// import * as burnFX from './burnFX.js';

let enabled = true;

export function initTerminalFX(ctx, width, height) {
    glowFX.init(ctx, width, height);
    flickerFX.init(ctx, width, height);
    ghostFX.init(ctx, width, height);
    glitchFX.init(ctx, width, height);
    rowJitterFX.init(ctx, width, height);
  }
  
  export function updateTerminalFX(deltaTime) {
    glowFX.update(deltaTime);
    flickerFX.update(deltaTime);
    ghostFX.update(deltaTime);
    glitchFX.update(deltaTime);
    rowJitterFX.update(deltaTime);
  }
  
  export function drawTerminalFX(ctx) {
    glowFX.draw(ctx);
    flickerFX.draw(ctx);
    ghostFX.draw(ctx);
  }
  

// Optional toggler (e.g. for settings)
export function setFXEnabled(flag) {
  enabled = flag;
}

