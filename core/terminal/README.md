# env0.core Terminal Renderer

This folder contains the custom canvas-based terminal rendering engine used by `env0.core`.

It replaces `xterm.js` with a purpose-built system for simulating degraded terminals, supporting glitch effects, entropy modeling, and fully manual text control.

---

## 🧱 Structure

- `env0.terminal.js` — public API surface (drop-in xtermWrapper replacement)
- `canvasTerminal.js` — handles canvas setup, DPI scaling, and redraw loop
- `terminalRenderer.js` — draws text and cursor from buffer to canvas
- `terminalBuffer.js` — manages scrollback and output text memory
- `terminalCursor.js` — controls position, blinking, and visual alignment
- `terminalConfig.js` — font, grid, and layout settings (shared by all modules)

---

## 🧩 Module Status

| File                   | Purpose                              | Status     |
|------------------------|--------------------------------------|------------|
| `env0.terminal.js`     | Public API surface                   | ✅ Live     |
| `canvasTerminal.js`    | Canvas setup + resize logic          | ✅ Live     |
| `terminalRenderer.js`  | Text/cursor rendering logic          | ✅ Live     |
| `terminalBuffer.js`    | Text memory + wrapping               | ✅ Live     |
| `terminalCursor.js`    | Cursor position + blink              | ✅ Live     |
| `terminalConfig.js`    | Font/grid config                     | ✅ Live     |
| `accessibilityOverlay.js` | Touch/click input layer (future) | 🟡 Stub     |
| `inputTracker.js`      | Input rhythm tracking (future)       | 🟡 Stub     |
| `entropyVisuals.js`    | Entropy-driven visual modulation     | 🟡 Stub     |
| `terminalFX.js`        | Flicker, glow, distortion effects    | 🟡 Stub     |

## 🎯 Goals

- Pixel-perfect text and cursor rendering
- Fixed-size grid (80x25 default, dynamic on resize)
- Manual redraw for full visual control
- Realistic input delay, rhythm tracking (planned)
- Visual degradation and FX overlays (planned)
- Scrollback simulation (planned)

---

## 🛠 Status

The renderer is live and integrated. It replaces all xterm.js usage inside `env0.core`. It supports:

- `print()` and `println()` with soft wrapping
- Dynamic column width calculation
- Cursor tracking and blink
- Full buffer redraw control
- Clean modular structure for future FX and input

---

## 🧪 Next Steps

- Input capture and echo
- Scrollback windowing
- FX layer for glitch/flicker
- Resolution degradation modes
