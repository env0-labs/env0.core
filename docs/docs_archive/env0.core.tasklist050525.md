
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
- [x] terminalFXManager.js integrated
- [x] glowFX, flickerFX, ghostFX, glitchFX, rowJitterFX, burnFX implemented

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
- [ ] Remove `@keyframes bootFlash` and `#boot-burst` element from CSS/HTML
- [ ] Remove CSS-based flicker logic (keyframes, classes, menu toggles)
- [ ] Sweep project for dynamic `await import()` paths before folder reorg
- [ ] Move `/fs/`, `/network/`, `/ui/`, `/startup/` into `/core/`

---

## 🧭 Mid-Term Feature Candidates
- [ ] Add read-only responses for `mkdir`, `touch`, `echo` ("Filesystem is locked.")
- [ ] Future boot flags: `--safe`, `--verbose` (passed via state injection)
- [ ] Canvas FX activation triggers (e.g. `ping` burst, `nmap` distortion)
- [ ] `narrativeManager.js` for system-bound storytelling
- [ ] Create `themeManager.js` to centralize text/glow/background color logic
- [ ] Replace hardcoded renderer colors with `themeManager` bindings
- [ ] Create `visualFXManager.js` to bridge canvas FX and DOM-based FX
- [ ] Sync room glow (radial gradient) with theme glow color
- [ ] Convert screen glow to radial CSS gradient using shared theme color
- [ ] Add `#crtFXOverlay` with feathered-edge mask image for CRT glass containment
- [ ] Add `#glassFXLayer` (specular glare, lens bloom, scanline warp)
- [ ] Add `#reflectionsLayer` (room reflection layer above glass)
- [ ] Toggle reflection visibility when background switches to “lights-off” state
- [ ] Remove `tintFX.js` permanently from FX manager
- [ ] External theme triggers (text/glow/background sync) via shell or config
- [ ] Menu UI should be extracted from terminal iframe and externally positioned

---

## 🧩 Phase 3 Prep
- [ ] EntropyManager hooks to drive FX intensity
- [ ] Shell triggers for glitch/flicker/burn events
- [ ] Theme-based modulation of glow and glitch thresholds
- [ ] Plan hallucinated shell drift (entropy-induced syntax corruption)
- [ ] Reflection + glow dynamics bound to terminal state
- [ ] Begin prototyping `blackbox.md` features: cursed LLMs, faulty experts, entropy hallucination overlays

> This tasklist is built on top of a known-stable system. The goal is clarity, modularity, and preserving behavioral trust.
