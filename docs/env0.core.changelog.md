# env0.core — Changelog (Post-Reset)
Starting from stable refactor and the defeat of terminal corruption.

---

---

## 2025-04-21 — Terminal Wrapper Refactor

### 🧱 xterm.js Isolation Layer
- Introduced `xtermWrapper.js` to fully abstract terminal I/O
- All calls to `state.terminal.write()` and `.clear()` replaced with:
  - `print()`
  - `println()`
  - `clearTerminal()`
- Preserved DOM renderer to maintain text glow effects

### 🔐 Input & Output Pipeline
- Replaced direct terminal access in:
  - `inputManager.js`
  - `outputManager.js`
  - `filesystemManager.js`
  - `terminalHandler.js`
  - `loginManager.js`
  - `readerManager.js`
  - `menuManager.js`
  - Commands: `read`, `clear`

### ⚠️ GPU Instability Discovery
- Identified full-screen flicker caused by AMD GPU acceleration under Chrome
- Issue only occurs when dev instance + ChatGPT tab are open simultaneously
- Logged for future handling as a compatibility trap (possible Safe Mode toggle)

### 🎭 Psychological Horror Potential
- Meta behavior observed: ChatGPT presence amplifies GPU flicker
- Logged as narrative inspiration for `entropy.echo`:
  > *AI helping build the interface begins destabilizing its own rendering layer*

### 🧰 Dev Tools & Launchers
- Added `.bat` launchers for:
  - No CORS mode
  - No GPU mode
- `.gitignore` updated to exclude local Chrome profile folder and dev utilities

---

## Tags
- `xterm-wrapper-introduced`: marks full abstraction of terminal interface
- `gpu-flicker-meta`: tag for future compatibility + horror integration



## 2025-04-20 — Post-Dragon Rebuild

### 🧼 Stability Restored
- Rebased `main` onto `stable_login` checkpoint
- Removed broken VFX, layout, and terminal behaviors
- Cleaned all legacy CSS flicker, ghost menus, and rogue font controls

### 🎨 Terminal Visuals
- White-on-black glow effect restored via CSS pulse
- Font size increased to 18px
- Terminal readability improved with spacing above narrative output

### 🧑‍💻 Shell Commands
- `read` command added for immersive text reading
  - Clears screen
  - Respects `instantText`
  - Exits on keypress
- `read` now complements `cat`, intended for longer narrative delivery

### 🔐 Login Fixes
- Fixed edge case where invalid credentials prevented future valid login
- Local login fallback now behaves as expected after initial failure

### 📁 Filesystem and Reader
- Added `resolveFile()` to `filesystemManager.js`
- Updated input parsing to correctly slice command from args
- `readerManager.js` created to encapsulate terminal reader mode

### 📚 Documentation
- Verified and reintroduced:
  - `projectdocumentation.md`
  - `README.dev.md`
  - `tasklist.md`
  - `blackbox.md`
  - `the_dragon_is_slain`
- Marked `mental.gaps.md` as do-not-read by design

---

## Tags
- `dragons-slain`: checkpoint tag post-reset
- `reader-mode-init`: tag candidate for new read flow
