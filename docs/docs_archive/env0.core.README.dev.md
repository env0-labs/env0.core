# env0.core — Developer README

Welcome to the dev side of `env0.core`: a modular terminal engine built in JavaScript using `xterm.js`. This isn't a toy — it's a fake system that acts like a real one. Modular commands, persistent settings, login flow, fake filesystem. 

---

## 🧠 Project Philosophy

`env0.core` should feel alive, modular, and internally consistent. It’s not a “simulator” — it’s an emulated environment that mimics real terminal behavior. Everything is built for extensibility and eventual game-layer integration.

---

## ⚙️ Core Architecture

**Frontend:** HTML / CSS / JS with `xterm.js` for terminal emulation.

**Core Modules:**
- `stateManager.js` — global runtime state store
- `settings.js` — persistent config (`fontSize`, `instantText`, etc.)
- `filesystem.js` — base filesystem structure
- `filesystemManager.js` — runtime FS logic
- `loginManager.js` — handles boot + login sequence
- `menuManager.js` — UI overlay for speed, font, and boot toggles
- `visualFXManager.js` — currently stubbed (visual logic disabled)
- `inputManager.js` — command buffer and command router
- `outputManager.js` — output helpers: `termPrint()`, `termTypeLine()`, `termClear()`

---

## 📂 Commands

All commands are defined in `/cmds/` as modular files.

### ✅ Implemented Commands
- `ls`
- `cd` — supports chained and relative paths
- `cat` — prints file contents or warns on directories
- `clear`
- `help`
- `ssh` — fake login redirect
- `nmap` — fake subnet scan
- `ping` — fake up/down
- `ifconfig` — fake network output

### 🔒 Not Implemented (intentionally)
- `mkdir`, `touch`, `echo` — read-only system
- No dispatcher or registry — command routing is manual via `switch`

All command output is routed through `termPrint()` or `termTypeLine()`.

---

## 🖥️ Menu / UI Features

The menu includes:
- Text speed toggle (`slow`, `fast`, `instant`)
- Font size (loaded via `settings.js`, not yet editable via UI)
- Skip Boot Sequence toggle (persistent)
- Audio toggle (placeholder only)

All changes persist via `localStorage`.

> Theme and CRT flicker controls are disabled. Visual system is now minimal by design. `visualFXManager.js` is stubbed but present for future reactivation.

---

## 🧪 Boot & Login Flow

- Boot sequence runs unless `skipIntro` is enabled
- Boot includes:
  - Faux Linux log lines `[ OK ]`, `[FAIL ]`, `[ SKIP ]`
  - Typing speed set by `instantText` or `typingDelay`
  - Final screen clear before login prompt
- Login accepts `user@ip` format or uses a predefined queue
- Successful login launches shell environment with full command support

---

## ✨ Visual FX

- Terminal glow is applied via CSS (`text-shadow`)
- Pulse effect via `@keyframes softGlowPulse` (6s loop)
- Inner shadow added to simulate text depth
- No scanlines, flicker, or canvas overlays active
- `canvasFXManager.js` scaffolded but unused

---

## 🧱 Style & Naming

- Public name: `env0.core`
- File-safe name: `env0_core`
- Filenames use `snake_case`
- Text is mostly lowercase / thematic

---

## 🛠️ Development Notes

- Feature branches preferred
- Avoid cleverness — prioritize clarity
- Commands must be testable in isolation
- Avoid global dispatchers or centralized command runners
- All persistent state flows through `stateManager.js`
- Font size, boot skip, instant mode, and typing delay now persist

---

## 📦 Project Setup

```bash
# No build tools required
# Just open index.html in a browser
# This engine breathes.
# Use the menu. Break the shell.
# Build what lives on top.
