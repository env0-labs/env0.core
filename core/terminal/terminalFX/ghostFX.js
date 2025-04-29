// ghostFX.js

let ghostCanvas, ghostCtx, width, height;
let frameCounter = 0;

export function init(ctx, w, h) {
  width = w;
  height = h;
  frameCounter = 0;
  ghostCanvas = document.createElement('canvas');
  ghostCanvas.width = width;
  ghostCanvas.height = height;
  ghostCtx = ghostCanvas.getContext('2d');
}

export function update(deltaTime) {
  // No-op for now
}

export function draw(ctx) {
  if (!ghostCtx) return;

  // Step 1: draw old ghost onto current frame with offset
  ctx.save();
  ctx.globalAlpha = 0.1;  // bump up for visibility
  ctx.drawImage(ghostCanvas, 2, 2); // drift direction
  ctx.restore();

  // Step 2: only update ghost buffer every N frames
  frameCounter++;
  if (frameCounter % 80 === 0) {
    ghostCtx.clearRect(0, 0, width, height);
    ghostCtx.drawImage(ctx.canvas, 0, 0);
  }
}
