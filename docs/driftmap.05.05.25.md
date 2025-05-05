# driftmap.05.05.25.md — env0.core (Post-RESET Audit)

> This audit tracks architectural drift and fractures post-reset (cc91ac0).
> Referenced files are only flagged once confirmed out of contract.

---

## Drift Codes

- 🔶 Drift: Minor contract divergence
- 🔴 Fracture: Severe architectural or behavioral break
- ✅ Clean

---

## 📁 core/

- `inputManager.js` — 🔴 Fracture: mode detection scattered, login/shell code intermixed
- `outputManager.js` — 🔶 Drift: no terminal mode awareness; should defer to terminalOutputManager
- `refreshPrompt.js` — 🔶 Drift: shared logic across incompatible modes
- `stateManager.js` — ✅ Clean (after sessionManager)
- `sessionManager.js` — ✅ Clean

---

## 📁 core/terminal/

- `canvasTerminal.js` — ✅ Clean
- `terminalRenderer.js` — ✅ Clean
- `terminalBuffer.js` — 🔶 Drift: cursor logic embedded in write operations
- `terminalCursor.js` — 🔶 Drift: draw logic bypasses renderer
- `env0.terminal.js` — ✅ Clean
- `terminalFXManager.js` — ✅ Clean

---

## 📁 cmds/

- `cat.js`, `cd.js` — 🔶 Drift: fallback/validation missing
- `read.js` — 🔶 Drift: assumes clean FS state, no input guard
- Others — ✅ Clean

---

## 📁 fs/

- `filesystemManager.js` — 🔴 Fracture: handles terminal output directly

---

## 📁 startup/

- `bootSequence.js` — ✅ Clean
- `loginManager.js` — 🔴 Fracture: still uses refreshLine() directly; tightly coupled to output flow

---

## 📁 ui/

- `readerManager.js` — 🔶 Drift: output injection bypasses session state
- `menuManager.js` — ✅ Clean

---

Audit ongoing. Focus next on stabilizing output flow before touching FX or narrative systems.
