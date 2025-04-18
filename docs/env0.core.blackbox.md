# blackbox.md — deferred features + experimental intent

This document contains features, concepts, and systems intentionally kept outside formal documentation. They are:
- Not scheduled
- Not promised
- Not forgotten

These are system ideas that belong to node.zero, but haven’t earned their place yet.

---

## 🎵 Audio: Procedural Sound System (Tone.js)
- [ ] Replace all future `.mp3`/`.wav` sfx with synth-based patches
- [ ] Integrate Tone.js
- [ ] Boot burst = short noise envelope + distortion
- [ ] Keystroke = randomized membrane blip (C1/C2)
- [ ] Output tick = sine ramp, possibly layered
- [ ] Audio setting toggle already exists — logic slot is ready

---

## 🛠️ Visual: Rough.js Network Map Overlay
- [ ] Add new menu tab: `Network Map`
- [ ] As user discovers machines (e.g., via `nmap`), dynamically draw boxes
- [ ] Use Rough.js to sketch connections (lines, circles, labels)
- [ ] Animate new discoveries as they appear: draw lines first, fade in text
- [ ] Integrate with `state.discoveredMachines` or similar
- [ ] Possibly use SVG overlay instead of canvas for easier control

---

## 🎛 Terminal FX: Glitches, Distortion, Startups

- Add optional screen glitches (wavey offset, chromatic fringing, tear line drift)
- Simulated "screen warmup" effect during boot
- Broken cursor blink (irregular intervals or flicker)
- Screen geometry warp (curved edges or subtle CRT bend distortion)
- **[✓]** Breathing text glow with optional inner shadow (April 2025)
- [ ] Output-triggered glow flash (e.g. nmap, login, ping)
- [ ] Error redshift via dynamic class swap
- [ ] Flicker injection for haunted or corrupted systems
- [ ] Optional: canvas FX manager to handle distortion layer (low-priority)

---

## 🔐 Terminal Payload: Fake Encryption Sequence

- Simulated decryption animation triggered by file open or unlock
- Visuals like:
  - Random hex stream with matching characters resolving
  - Static or corrupted lines
  - “Noise-to-meaning” morph effect
- Optional `decrypt` command to simulate process with typing output

---

## 🧮 Audio Sequencing: Pattern Generation + Tracker Logic

- Fake audio sequencing engine shown in terminal
- Visual style mimics Impulse Tracker / ProTracker:
  - Hex-based timing, sample/channel layout
- Could support narrative beats ("decode a rhythm", "corrupt sample stream")
- Potential commands:
  - `trackload file.mod` → loads fake pattern grid
  - `trackscan` → generates log of anomalies
- Later: allow export of fake `.mod`-style files as log text

---

## 🌀 Wreckage Mode: Generative System Fusion
- [ ] Inspired by 65daysofstatic's Wreckage Systems
- [ ] Tie system state (node integrity, login status, system compromise) to audio synthesis
- [ ] Allow degradation of visual fidelity to bleed into pitch modulation, envelope distortion, and FX warping
- [ ] Let discovered nodes introduce new audio layers or modulations
- [ ] Use Tone.js Transport and sequencing to build evolving, non-looping sonic behavior
- [ ] Simulate system 'personality drift' through slow modulation of all audiovisual layers
- [ ] Final state may be irreversible system collapse — musical, visual, and mechanical

---

## 🎨 Style/Art Intentions
- [ ] Introduce scanline curvature simulation (mild barrel distortion via CSS or SVG mask)
- [ ] Consider ghost trails (RGB shadow splitting on fast flickers)
- [ ] Explore per-character delay on narrative output (already modular)
- [ ] Add option to toggle alternate typefaces (e.g. CRT monospace vs modern)
- **[✓]** Visual hierarchy now split: text FX (CSS) and overlay FX (canvas)
- **[✓]** Default glow = white phosphor w/ soft inner shadow + breathing pulse
- [ ] (Future) canvasFXManager.js to handle overlays without interfering with input

---

## 📁 Filesystem/Narrative Hooks
- [ ] Ability to uncover hidden files or systems via commands (`strings`, `grep`, etc.)
- [ ] Narrative triggers bound to FS traversal (e.g., reading certain files triggers messages)
- [ ] Optional: reveal parts of the network map via file discovery


---

## 🧭 Design Rule of Thumb
> **Does this feature make the system more *alive*, or just more *complete*?**
>
> If it’s **alive** → belongs in core.
> If it’s just **complete** → keep it blackboxed or kill it.

---

*Open carefully.*
