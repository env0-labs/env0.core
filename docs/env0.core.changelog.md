# env0.core — Changelog (Updated to Current State)

---

## [Phase 3 Milestone - Skip Intro, Menu System, and Messaging API]

### ✅ 2025-05-07 — Stable Menu System and Skip Intro Mechanism
- Rebuilt `menuManager.js` as a clean, modular, message-driven system.
- Menu is now fully managed in the parent (`index.html`).
- Skip Intro is directly synced to `localStorage` for persistence.
- Messaging API (`parentMessenger.js` and `iframeMessenger.js`) is bidirectional:
  - Parent sends commands to the iframe.
  - Iframe can respond with commands or status.
- Boot sequence (`bootSequence.js`) is now stable:
  - No more duplicate boot runs.
  - Skip Intro is cleanly enforced.

### 🚀 Key Changes:
- `terminalBoot.js` no longer uses `setTimeout` for boot sequence.
- `startBootSequence` is now directly controlled by the skip flag.
- Clean separation between menu (parent) and terminal (iframe).
- Absolute pathing fixed for `menuManager.js` and other modular files.

---

## 2025-04-29 — Terminal FX System Finalized

### 🎨 Terminal FX Stack Completed
- Integrated glowFX (pulsing text glow with jitter).
- Added flickerFX (screen-wide alpha instability).
- Enabled ghostFX (frame echo trail with drift).
- Added glitchFX (per-character substitution and decay).
- Integrated rowJitterFX (horizontal scanline instability).
- Implemented burnFX (per-character phosphor decay buffer).

All FX are modular, toggleable, and layered via `terminalFXManager.js`.  
`terminalRenderer` now cleanly delegates visual instability to FX modules.

✅ Phase 2 visual architecture closed. Terminal now reflects entropy at every layer.

---

## 2025-04-27 — Phase 3 Preparation and FX Scaffolding

### 🖥️ Terminal Renderer Expansion
- Added FX lifecycle hook into `terminalRenderer.js` (temporary deltaTime = 16ms).
- FX drawing inserted after buffer and cursor draw cycle.
- FX Manager now scaffolded pending full fxCanvas split.

### 🧩 Multi-Canvas System Confirmed
- Future layering: terminalCanvas → fxCanvas → glassCanvas.
- FX and physical visuals separated from terminal logic.

### 🔧 Settings and Dev Tools
- `enableVisualFX` setting activated.
- `window.triggerGlitch()` exposed for manual FX test.

✅ Stabilized base for Phase 3 FX development.

---

## 2025-04-26 — Phase 2b Terminal Engine Stabilization

### 🛠️ Terminal Core Lifecycle Rebuild
- `println()` rebuilt to push clean new lines into terminalBuffer.
- `overwriteLastLine()` reintroduced for controlled typing without forced scroll.
- `scrollToBottom()` implemented properly using `viewportStartRow`.
- `drawFromBuffer()` updated to respect viewport window during redraws.
- Typing flow (`refreshLine()`) now tracks cursor relative to viewport.

### 📦 Buffer and Viewport Handling
- `terminalBuffer.js` rebuilt to cleanly separate buffer and viewport state.
- `canvasTerminal.js` gains `getTerminalRows()` for dynamic dimension reporting.
- `env0.terminal.js` scroll alignment corrected on output growth.
- `terminalRenderer.js` viewport clamping integrated into draw cycle.

### 🖥️ UX Stability Achieved
- Typing and command output now scroll cleanly.
- Boot logs scroll naturally without UX hacks.
- Shell prompt redraws accurately even after heavy output.

✅ Phase 2b closed. Terminal now behaves like a real degraded shell environment.

---

## 2025-04-21 — Terminal Wrapper Refactor

### 🧱 xterm.js Isolation Layer
- Introduced `xtermWrapper.js` to fully abstract terminal I/O.
- All calls to `state.terminal.write()` and `.clear()` replaced with:
  - `print()`
  - `println()`
  - `clearTerminal()`
- Preserved DOM renderer to maintain text glow effects.

### 🔐 Input & Output Pipeline
- Replaced direct terminal access in:
  - `inputManager.js`
  - `outputManager.js` (now replaced by `terminalOutputManager.js`)
  - `filesystemManager.js`
  - `terminalHandler.js`
  - `loginManager.js`
  - `readerManager.js`
  - `menuManager.js`
  - Commands: `read`, `clear`

### ⚠️ GPU Instability Discovery
- Identified full-screen flicker caused by AMD GPU acceleration under Chrome.
- Issue only occurs when dev instance + ChatGPT tab are open simultaneously.
- Logged for future handling as a compatibility trap (possible Safe Mode toggle).

---

## Tags
- `menu-system-stable`: Menu is now modular and message-driven.
- `skip-intro-clean`: Boot sequence is consistent and clean.
- `messaging-api-v2`: Parent/iframe messaging is cleanly separated.
- `xterm-wrapper-introduced`: marks full abstraction of terminal interface.
- `gpu-flicker-meta`: tag for future compatibility + horror integration.

