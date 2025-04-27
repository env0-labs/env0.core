# env0.core — Developer README

---

## 📦 Project Overview

env0.core is a modular terminal simulation engine designed to support immersive narrative projects requiring degraded or emergent system behavior.

It replaces xterm.js fully with a **custom canvasTerminal** and layered **canvas-based FX system**.

---

## 🖥️ Visual Stack (Rendering Architecture)

| Layer | Purpose |
|:------|:--------|
| `terminalCanvas` | Core text output (shell buffer, prompt, cursor) |
| `fxCanvas` | Visual overlay FX (glitch, scanlines, bloom, screen flicker) |
| `glassCanvas` | Static CRT screen frame and dynamic reflection effects (planned) |

These canvases are stacked visually inside a locked 16:9 container.  
Each canvas is isolated — text logic and FX do not interfere.

---

## ⚙️ Subsystem Stack (Operational Architecture)

| Subsystem | Purpose |
|:----------|:--------|
| `inputManager.js` | Keyboard/mouse/touch input capture and dispatch |
| `outputManager.js` | Terminal printing, screen clear, scrollback handling |
| `stateManager.js` | Shared runtime system state (user, path, machine, mode) |
| `filesystemManager.js` | Virtual filesystem navigation and mutation |
| `networkManager.js` | Simulated network systems and host resolution |
| `bootSequence.js` | Modular startup/boot visuals and system handoff |
| `loginManager.js` | User authentication and shell session entry |
| `settings.js` | User-configurable options (themes, FX toggles) |
| (Planned) `audioManager.js` | Sound FX, ambient layers, narrative audio triggers |
| (Planned) `saveManager.js` | Save/load user progress and states |

Subsystems power the terminal simulation independently from the visual stack.

---

## 📏 Scaling Rules

- Internal rendering locked to **4K (3840x2160)**.
- **Aspect ratio fixed at 16:9** — no live dynamic canvas resizing during session.
- Scaling handled via `transform: scale()` on the terminal container.
- If resolution changes mid-session, user reload is required.

---

## 🧩 Input Handling

- **Unified Input Path**: Keyboard input and mouse/touch button input both converge into the same command execution logic.
- No split logic trees.
- InputManager modularized for future expansion (e.g., mobile support, accessibility UI overlays).

---

## 🎨 FX System

- Visual FX currently scaffolded into `terminalRenderer.js` under `[TEMPORARY]` markers.
- FX timing currently uses fake deltaTime = 16ms — will be replaced with proper frame delta handling later.
- FXManager (`canvasFXManager.js`) draws onto `fxCanvas` (planned).
- Dev tool `window.triggerGlitch()` exposed for manual testing during FX development.

---

## 🎵 Audio System (Future)

- Planned 3-layer system:
  - FX Sounds (typing, success, error)
  - Ambient Atmosphere (CRT hum, background static)
  - Narrative Events (specific story sounds)
- AudioManager integration deferred until after core FX layers are finalized.

---

## 🚀 Boot and Startup

- Boot sequence modular but currently simple.
- Phase 4 will introduce bootSequence injection hooks for project-specific fake BIOS, network scans, etc.

---

## 📚 Save/Load System (Future)

- Save/load functionality parked for node.zero/entropy.echo integration points.
- No active save system wired yet.

---

# 📋 Developer Discipline

- All experimental code must be flagged `[TEMPORARY]`, `[DEV TOOL]`, or `[PHASE X]`.
- Stabilization commits must be clearly labeled.
- No direct blending of test scaffolds into production logic without cleanup.

---

✅ Last major stabilization: April 27, 2025

env0.core is ready for Phase 3 expansion into full CRT terminal simulation.
