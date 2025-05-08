# env0.core — Project Documentation (Updated to Current State)

---

## 🧠 Project Purpose

env0.core is a lightweight, modular engine designed to simulate degraded terminal environments with:
- Realistic command handling (cd, ls, cat, ping, etc.)
- Modular filesystem and network simulation
- Multi-canvas rendering system (terminal, FX, glass)
- Visual FX support (glitch, scanlines, bloom, flicker, burn-in, ghosting)
- Fully modular menu system with message-driven controls (skip intro, future options)
- Scalable and message-driven parent/iframe architecture

It serves as the foundation for projects like:
- `node.zero` — cybersecurity exploration and training simulator
- `entropy.echo` — narrative-driven horror terminal experience

---

## 🖥️ Core Architecture

| Layer | Role |
|:------|:-----|
| `terminalCanvas` | Text rendering — buffer, cursor, command output |
| `fxCanvas` | Visual FX — glitch, scanlines, flicker, bloom, row jitter |
| `glassCanvas` | Physical CRT frame — reflections, glass textures, dirt, cracks |
| `menuManager.js` | Modular UI management (parent-controlled, message-driven) |
| `parentMessenger.js` | Messaging API (parent to iframe) |
| `iframeMessenger.js` | Messaging API (iframe to parent) |

✅  
Each canvas is stacked visually.  
✅  
Each system is modularized and managed independently.  
✅  
Menu and terminal are fully decoupled and message-driven.

---

## 📏 Visual Scaling and Resolution

- Internal design resolution locked to **1920x1080**.
- Aspect ratio fixed to **16:9**.
- Dynamic window scaling handled by container `transform: scale()`.
- No live canvas resizing mid-session — resolution change requires full reload.

---

## 🧩 Core Subsystems

| Subsystem | Status |
|:----------|:-------|
| FilesystemManager | ✅ Stable |
| NetworkManager | ✅ Stable |
| Command Handling (inputManager.js) | ✅ Stable |
| TerminalRenderer (drawFromBuffer.js) | ✅ Stable with FX hook scaffolding |
| TerminalOutputManager (terminalOutputManager.js) | ✅ Stable |
| FXManager (canvasFXManager.js) | ✅ Complete and modular |
| Glass Layer (glassCanvas.js) | ⚪ Planned (Phase 3) |
| Boot Sequence (bootSequence.js) | ✅ Stable (cleanly skipable) |
| UI Layer (menuManager.js, readerManager.js) | ✅ Stable, message-driven |
| Messaging API (parentMessenger.js, iframeMessenger.js) | ✅ Fully modular, bidirectional |

---

## 🎨 Visual Effects Matrix

| Effect             | Status       |
|--------------------|--------------|
| Glitch Bursts      | ✅ Complete   |
| Scanline Overlay   | ✅ Via rowJitterFX |
| Bloom/Pulse Effects| ✅ Via glowFX |
| Screen Flicker     | ✅ Via flickerFX |
| CRT Frame Overlay  | ⚪ Planned    |
| Color Aberration   | ⚪ Future     |
| Burn-in Decay      | ✅ Via burnFX |
| Ghost Echo         | ✅ Via ghostFX |

---

## 🛠️ Developer Notes

- FX hooks are cleanly managed in `canvasFXManager.js` and `terminalFXManager.js`.
- No fake deltaTime — FX timing is frame-accurate and managed by requestAnimationFrame.
- Menu is fully modular and managed by `menuManager.js` in the parent context.
- The `skipIntro` flag is stored in `localStorage` for persistence.
- Messaging API (parent <-> iframe) is modular, scalable, and bidirectional.
- Boot sequence is clean, with no redundant triggers or race conditions.
- Audio system (FX and atmosphere) stubs exist — full integration parked for later.
- Save/load system planning deferred until project-specific narrative design is locked.

---

## ✅ System Status: May 7, 2025

env0.core is stable, modular, and fully prepared for Phase 3 FX and further visual expansion.
- Terminal and menu are cleanly decoupled.
- Skip Intro is consistent and cleanly enforced.
- Visual FX stack is modular, frame-synced, and scalable.
- Messaging API is robust and expandable without modification to core logic.
