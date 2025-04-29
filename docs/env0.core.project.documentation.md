# env0.core — Project Documentation

---

## 🧠 Project Purpose

env0.core is a lightweight, modular engine designed to simulate degraded terminal environments with:
- Realistic command handling (cd, ls, cat, ping, etc.)
- Modular filesystem and network simulation
- Multi-canvas rendering system (terminal, FX, glass)
- Visual FX support (glitch, scanlines, bloom, flicker)
- Full narrative and atmosphere layering capabilities

It serves as the foundation for projects like:
- `node.zero` — cybersecurity exploration and training simulator
- `entropy.echo` — narrative-driven horror terminal experience

---

## 🖥️ Core Architecture

| Layer | Role |
|:------|:-----|
| `terminalCanvas` | Text rendering — buffer, cursor, command output |
| `fxCanvas` | Visual FX — glitch, scanlines, flicker, bloom |
| `glassCanvas` | Physical CRT frame — reflections, glass textures, dirt, cracks |

✅  
Each canvas is stacked visually.  
✅  
Each system modularized and managed independently.

---

## 📏 Visual Scaling and Resolution

- Internal design resolution locked to **3840x2160** (4K).
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
| FXManager (canvasFXManager.js) | 🟠 In progress (scaffolded, pending fxCanvas migration) |
| Glass Layer (glassCanvas.js) | ⚪ Planned (Phase 3) |
| Boot Sequence (bootSequence.js) | ✅ Functional, needs future modular hooks |
| UI Layer (menuManager.js, readerManager.js) | ✅ Stable |
| FXManager (terminalFXManager.js) | ✅ Active |

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

- FX hooks are flagged with `[TEMPORARY]` comments where relevant.
- Current FX timing uses fake deltaTime = 16ms placeholder.
- Dev tools like `window.triggerGlitch()` exposed temporarily for manual testing.
- Audio system (FX and atmosphere) stubs exist — full integration parked for later.
- Save/load system planning deferred until project-specific narrative design is locked.

---

# ✅ System Status: April 27, 2025

env0.core is stable, modular, and prepared for full Phase 3 FX and visual expansion.

