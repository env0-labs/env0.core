# env0.core — Developer README (Updated to Current State)

---

## 📦 Project Overview

env0.core is a modular terminal simulation engine designed to support immersive narrative projects requiring degraded or emergent system behavior.

It replaces xterm.js fully with a **custom canvasTerminal** and layered **canvas-based FX system**.

It features:
- A clean, modular messaging API (parent → iframe, iframe → parent).
- A scalable, message-driven menu system (`menuManager.js`).
- Stable boot sequence control (`skipIntro` cleanly enforced).
- Modular and frame-synced FX system.

---

## 🖥️ Visual Stack (Rendering Architecture)

| Layer | Purpose |
|:------|:--------|
| `terminalCanvas` | Core text output (shell buffer, prompt, cursor) |
| `fxCanvas` | Visual overlay FX (glitch, scanlines, bloom, screen flicker) |
| `glassCanvas` | Static CRT screen frame and dynamic reflection effects (planned) |

These canvases are stacked visually inside a locked 16:9 container.  
Each canvas is isolated — text logic and FX do not interfere.  
The menu is fully independent, controlled via `menuManager.js` in the parent context.

---

## ⚙️ Subsystem Stack (Operational Architecture)

| Subsystem | Purpose |
|:----------|:--------|
| `inputManager.js` | Keyboard/mouse/touch input capture and dispatch |
| `terminalOutputManager.js` | Terminal printing, scrolling, and buffer control |
| `stateManager.js` | Shared runtime system state (user, path, machine, mode) |
| `filesystemManager.js` | Virtual filesystem navigation and mutation |
| `networkManager.js` | Simulated network systems and host resolution |
| `bootSequence.js` | Modular startup/boot visuals and system handoff |
| `loginManager.js` | User authentication and shell session entry |
| `settings.js` | User-configurable options (themes, FX toggles) |
| `menuManager.js` | Modular UI control, managed in parent context |
| `parentMessenger.js` | Message API (parent → iframe) |
| `iframeMessenger.js` | Message API (iframe → parent) |
| (Planned) `audioManager.js` | Sound FX, ambient layers, narrative audio triggers |
| (Planned) `saveManager.js` | Save/load user progress and states |

Subsystems power the terminal simulation independently from the visual stack.

---

## 📏 Scaling Rules

- Internal rendering locked to **1920x1080**.
- **Aspect ratio fixed at 16:9** — no live dynamic canvas resizing during session.
- Scaling handled via `transform: scale()` on the terminal container.
- If resolution changes mid-session, user reload is required.

---

## 🧩 Input Handling

- **Unified Input Path**: Keyboard input and mouse/touch button input both converge into the same command execution logic.
- No split logic trees.
- InputManager is modularized for future expansion (e.g., mobile support, accessibility UI overlays).
- Menu inputs (e.g., Skip Intro) are handled in the parent context via `menuManager.js`.

---

## 🎨 FX System

- FX system fully modular via `canvasFXManager.js` and `terminalFXManager.js`.
- Current active FX:
  - `glowFX` — text glow pulse with jitter.
  - `flickerFX` — screen-wide brightness variation.
  - `ghostFX` — previous frame residue.
  - `glitchFX` — per-char corruption with TTL.
  - `rowJitterFX` — horizontal row instability.
  - `burnFX` — per-character memory decay.
- FX are applied after `drawFromBuffer()` but before overlays.
- FX are toggleable via settings or external state triggers.

---

## 📋 Menu System

- Menu is managed by `menuManager.js` in the parent (`index.html`).
- Skip Intro toggle is directly tied to `localStorage.skipIntro`:
  - Persistent between sessions.
  - Directly enforces skip in `bootSequence.js` without race conditions.
- Future menu options (e.g., FX toggles, themes) can be added modularly.
- Messages sent via `parentMessenger.js` to the iframe:
  - Skip Intro is a direct command.
  - Any future commands can be added without structural changes.

---

## 🚀 Boot and Startup

- Boot sequence managed by `bootSequence.js` (clean and modular).
- Skip Intro is directly tied to `localStorage.skipIntro`.
- No redundant `setTimeout` or double-boot bugs.
- Cleanly integrated with the messaging API:
  - Parent sets Skip Intro in localStorage.
  - Iframe reads and applies the flag on load.

---

## 📚 Save/Load System (Future)

- Save/load functionality is planned for node.zero/entropy.echo integration points.
- No active save system wired yet.
- Future system will use `localStorage` or file-based saves, depending on project context.

---

## 🎵 Audio System (Future)

- Planned 3-layer system:
  - FX Sounds (typing, success, error)
  - Ambient Atmosphere (CRT hum, background static)
  - Narrative Events (specific story sounds)
- AudioManager integration deferred until after core FX layers are finalized.

---

# 📋 Developer Discipline

- All experimental code must be flagged `[TEMPORARY]`, `[DEV TOOL]`, or `[PHASE X]`.
- Stabilization commits must be clearly labeled.
- No direct blending of test scaffolds into production logic without cleanup.
- Messaging API must remain modular and strictly separated (parent/iframe).

---

✅ Last major stabilization: May 7, 2025

env0.core is stable, modular, and ready for scalable expansion.
