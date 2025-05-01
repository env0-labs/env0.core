// fx/canvasFXManager.js

let ctx = null;
let canvasWidth = 0;
let canvasHeight = 0;

let glitchActive = false;
let glitchTimer = 0;

export function initCanvasFX(context, width, height) {
  ctx = context;
  canvasWidth = width;
  canvasHeight = height;
}

export function updateCanvasFX(deltaTime) {

  if (glitchActive) {
    glitchTimer -= deltaTime;
    if (glitchTimer <= 0) {
      glitchActive = false;
    }
  }
}

export function triggerGlitch(durationMs = 250) {

  glitchActive = true;
  glitchTimer = durationMs;
}

export function drawCanvasFX() {
  


  if (!ctx || (!glitchActive)) {
    return;
  }

}
