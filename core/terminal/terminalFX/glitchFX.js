// glitchFX.js
//
// Corrupts terminal character output for visual entropy simulation.
// Supports both persistent glitch characters and transient "blip" flickers.

let glitchMap = new Map(); // Map<row_col_key, {char, ttl}>
let enabled = true;

const substitutionPool = '▲■▓▒░$%#@!*&+~<>?/\\'.split('');

function key(row, col) {
  return `${row}_${col}`;
}

export function init(ctx, width, height) {
  glitchMap.clear();
}

export function update(deltaTime) {
  if (!enabled) return;

  // Decay transient glitches
  for (const [k, v] of glitchMap.entries()) {
    v.ttl -= deltaTime;
    if (v.ttl <= 0) {
      glitchMap.delete(k);
    }
  }

  // Randomly spawn a few glitches per frame
  const glitchRate = 1;
  for (let i = 0; i < glitchRate; i++) {
    if (Math.random() < 0.002) {
      const row = Math.floor(Math.random() * 25);
      const col = Math.floor(Math.random() * 80);
      const char = substitutionPool[Math.floor(Math.random() * substitutionPool.length)];
      glitchMap.set(key(row, col), { char, ttl: 400 + Math.random() * 600 });
    }
  }
}  


export function draw(ctx) {
  // No-op — glitch is injected at render time
}

export function getGlitchedChar(row, col, originalChar) {
  if (!enabled) return originalChar;
  const glitch = glitchMap.get(key(row, col));
  return glitch ? glitch.char : originalChar;
}

export function setGlitchEnabled(flag) {
  enabled = flag;
}
