# tasklist.md — env0.core Stable Base

This file tracks tasks moving forward from the clean `stable_login` branch checkpoint. All prior visual and terminal instability has been resolved.

---

## ✅ Locked and Stable
- [x] Boot sequence polish (randomized pacing, fail/warn logic, press-any-key block)
- [x] Clear screen after boot before login prompt
- [x] Persistent skipIntro logic verified
- [x] Terminal now white-on-black, glow pulse restored
- [x] Font size increased to 18px (hardcoded)
- [x] Login flow fully validated (username + password gate)
- [x] Input echo, prompt stability, and shell launch confirmed
- [x] Canvas overlay system scaffolded (`canvasFXManager.js`)
- [x] visualFXManager safely stubbed (no active visuals)
- [x] Menu renders and functions cleanly
- [x] Known shell commands confirmed operational: `ls`, `cd`, `cat`, `clear`, `help`, `ifconfig`, `ping`, `nmap`

---

## 🔧 Immediate Tasks (Phase 2b Closure)

- [x] Build `env0.terminal.js` wrapper
- [x] Lock and document shell prompt renderer (echo, input, and cursor handling)
- [x] Confirm typing speed settings (slow/fast/instant) functional
- [x] Confirm refreshPrompt fallback logic across login, shell, error states

✅ Phase 2b Immediate Tasks closed.


---

## 🧪 Test & Confirm

- [x] Typing speed settings validated (slow/fast/instant)
- [x] Visual changes inert unless explicitly enabled
- [x] refreshPrompt() fallback logic confirmed stable


---

## 🧼 Cleanup / Refactor Targets
- [ ] Remove or quarantine legacy `narrative.js` hooks (keep stub if needed)
- [ ] Confirm all command output routes through `termPrint()` or `termTypeLine()`
- [ ] Strip any residual ANSI behavior or cursor jumps left from earlier versions

---

## 🧭 Mid-Term Feature Candidates
- [ ] Add read-only responses for `mkdir`, `touch`, `echo` ("Filesystem is locked.")
- [ ] Future boot flags: `--safe`, `--verbose` (passed via state injection)
- [ ] Canvas FX activation triggers (e.g. `ping` burst, `nmap` distortion)
- [ ] `narrativeManager.js` for system-bound storytelling

---

> This tasklist is built on top of a known-stable system. The goal is clarity, modularity, and preserving behavioral trust.
