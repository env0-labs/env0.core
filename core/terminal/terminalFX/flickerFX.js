// flickerFX.js
//
// Applies a low-opacity flicker to simulate unstable electron gun refresh.
// Intended to modulate terminal brightness slightly per frame.

let intensity = 0;

export function init(ctx, width, height) {
  // No setup needed — stateless flicker
}

export function update(deltaTime) {
  // Simple frame-by-frame intensity
  intensity = 0.92 + Math.random() * 0.08; // flickers between 0.92 and 1.0
}

export function draw(ctx) {
  ctx.save();
  ctx.globalAlpha = 1 - intensity;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
