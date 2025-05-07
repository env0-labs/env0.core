// flickerFX.js
//
// Applies a brightness flicker only to the text layer via globalAlpha modulation.

export function apply(ctx) {
  const flicker = 0.85 + Math.random() * 0.15; // varies between 0.94–1.00
  ctx.globalAlpha = flicker;
}
