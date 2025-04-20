# env0.core — Changelog (Post-Reset)
Starting from stable refactor and the defeat of terminal corruption.

---

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
