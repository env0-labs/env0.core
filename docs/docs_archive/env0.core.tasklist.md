# tasklist.md — env0.core Active Work

This file tracks actual, in-progress development. Use it to coordinate short-term tasks and validate implemented behavior.

---

## ✅ Completed This Session
- [x] Final boot sequence polish (randomized pacing, fail/warn logic, press-any-key block)
- [x] Clear screen after boot before login prompt
- [x] Ensure `skipIntro` logic works cleanly and avoids dupe output
- [x] Fix terminal visibility after blackout (removed opacity traps)
- [x] Confirm terminal output via `termTypeLine()` is live
- [x] Clean `bootSequence.js` — self-contained, stable
- [x] Spinner glyph loop support in boot output
- [x] Strip legacy CRT/scanline/flicker visuals from `styles.css`
- [x] Add breathing white glow with inner shadow to terminal text
- [x] Implement `fontSize` as a persistent setting via `settings.js`
- [x] Stub out `visualFXManager.js` safely to prevent import errors
- [x] Document visual FX layering in `projectdocumentation.md`
- [x] Login prompt is always reached after skip OR full boot
- [x] Menu toggle for boot skip reflects persistent state

---

## 🔧 Immediate Tasks
- [ ] Implement commands for working at the network layer (e.g. `traceroute`, `whois`, `netstat`)
- [ ] Begin building the initial mission logic
- [ ] Add glow pulse or flicker flash on output (command reactive)
- [ ] Consider network-triggered flicker (e.g. `nmap` or `ping`)

---

## 🧪 Test & Confirm
- [ ] Font size loads correctly and applies at terminal init
- [ ] `refreshPrompt()` doesn't silently fail — safe fallback logic works

---

## 🧼 Cleanup / Refactors
- [ ] Remove all `narrative.js` calls except placeholder import
- [ ] Strip legacy intro line from `outputIntro()`
- [ ] Drop `typeNarrativeLine()` unless reused
- [ ] Archive or comment-out unused narrative stubs
- [ ] Sanity-check `settings.js` default loading logic

---

### 🪟 Visual / UX Enhancements

- [ ] Shake effect or vibration pulse on system wake  
- [ ] Cursor blink pacing control (slower/irregular)  
- [ ] **Canvas-based `fx-layer` for scanlines, flicker, distortion**
  - Will replace all legacy DOM/CSS CRT visuals  
  - Layer will live *above* the terminal (`#terminal`) using `canvas`, positioned with `pointer-events: none`  
  - All interaction passes through to xterm — input stability is non-negotiable  
  - FX are visual-only: scanline sweep, boot burst, flicker pulses, RGB ghosting, distortion offset  
  - Overlay must dynamically resize with terminal and match `devicePixelRatio`  
  - No runtime FX until core systems (terminal, login, command routing) are stable  
  - `canvasFXManager.js` is scaffolded but currently inert — future home for all overlay logic  
  - Visuals must be fully removable without breaking system logic  
  - Future event-based FX (e.g. `nmap` triggers burst, `node.compromised` increases distortion) planned via `state` triggers  

> ⚠️ Canvas FX system is explicitly frozen until theme bugs are resolved and input pipeline is confirmed stable. Once cleared, this system becomes the primary visual delivery method — text FX will remain minimal (glow only).


---

## 🧭 Future Candidates (short-term)
- [ ] `narrativeManager` stub (file-bound message triggers)
- [ ] Soft-disable commands like `mkdir`, `touch`, `echo` (return "read-only FS")
- [ ] Alternate boot flags (`--safe`, `--verbose`) passed via state injection
- [ ] Menu-based font size control (slider or steps)

---

> Visual FX baseline is now stable — future effects will layer on top. Focus is shifting toward network systems and command interactivity.
