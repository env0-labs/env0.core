// messagingTransmitter.js
//
// Handles outbound communication from the terminal engine (inside iframe)
// to the parent CRT shell environment (outside iframe).
//
// This is used to notify the parent frame of shell events, visual triggers,
// or entropy state changes — without tight coupling or shared state.
//
// Usage:
//   sendToParent('fxTrigger', { effect: 'glitch_pulse' });

export function sendToParent(type, payload = {}) {
  window.parent.postMessage({ type, payload }, '*');
}
