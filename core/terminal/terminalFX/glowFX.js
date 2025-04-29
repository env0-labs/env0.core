// glowFX.js
//
// Handles slow sine-wave glow modulation with random jitter,
// simulating unstable CRT phosphor persistence.

let ctx;
let glowTimer = 0;
let width = 0, height = 0;

export function init(newCtx, w, h) {
  ctx = newCtx;
  width = w;
  height = h;
}

export function update(deltaTime) {
  glowTimer += deltaTime * 0.001; // deltaTime in ms to seconds
}

export function draw(ctx) {
  const pulse = 0.3 + Math.sin(glowTimer * 0.1) * 0.3;
  const jitter = (Math.random() - 0.5) * 0.1;
  const glowStrength = Math.max(0, pulse + jitter);

  ctx.save();
  ctx.shadowColor = `rgba(0, 255, 0, ${glowStrength})`;
  ctx.shadowBlur = 2;
  ctx.restore();
}
