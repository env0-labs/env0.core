// messagingListener.js
//
// Handles inbound postMessage events from the terminal iframe (terminal.html).
//
// This allows external overlays, narrative systems, or CRT FX to respond
// to internal terminal actions without directly accessing canvas logic.
//
// Usage:
//   listenToTerminal((msg) => { if (msg.type === 'fxTrigger') { ... } });

export function listenToTerminal(callback) {
  window.addEventListener('message', (e) => {
    const frame = document.getElementById('terminalFrame');
    if (!frame || e.source !== frame.contentWindow) return;
    callback(e.data);
  });
}
