# projectdocumentation.md — env0.core

This file serves as a stable implementation reference. Unlike `README.dev.md`, this includes detailed system maps, variable definitions, and technical commentary.

---

## Visual FX System (env0.core)

### Overview

The visual system in `env0.core` is split into two clean layers:

1. **Text-Level FX** (CSS applied directly to `.xterm` content)
   - Responsible for passive character-level styling (glow, bold, flicker)
   - Managed via `styles.css`
   - No runtime JS required unless reactive
   - Lives beneath any canvas overlays

2. **Overlay FX** (canvas-based, layered above terminal)
   - Managed via `canvasFXManager.js` (scaffolded)
   - Handles noise, scanlines, boot burst, flicker, phosphor trails
   - Reactive to system state, command events, and narrative triggers
   - Not yet implemented

---

### Current Implementation (April 2025)

- **Glow**: ✅ Enabled  
  White phosphor effect via multi-layered `text-shadow`
- **Breathing Pulse**: ✅ Enabled  
  `@keyframes softGlowPulse` animation for subtle modulation
- **Inner Shadow**: ✅ Enabled  
  Adds depth below characters via final `0 1px 0 #000000` shadow
- **CRT/Scanline FX**: ❌ Disabled  
  All styles and animations removed from CSS
- **Canvas overlays**: ❌ Not active
- **Theme switching**: ❌ Disabled due to xterm theme override limitations
- **VisualFXManager.js**: 💤 Stubbed  
  All functions exist but perform no effect (logs only)
- **canvasFXManager.js**: 🕳 Exists, empty  
  Ready for future overlay development

---

### Principles

- Text FX must never rely on JS where CSS can suffice
- Canvas FX must never interfere with xterm input or layout
- Visuals can be safely removed without affecting system logic
- Glow should signal presence — not just aesthetic

---

### Future Additions

**Text FX ideas:**
- Command-triggered glow pulse
- Error redshift (via class toggle)
- Boot flicker (char-level offset or jitter)
- Output flicker burst on discovery

**Overlay FX (canvas):**
- Scanline sweep
- Boot burst flare
- Noise shimmer (low-contrast grain)
- Jitter or offset glitch (horizontal/vertical push)
- Decay/hallucination state overlays

---

### Last Verified State

- `styles.css`: glow, pulse, inner shadow active
- `visualFXManager.js`: present, stubbed, safe
- `canvasFXManager.js`: present, unused
- No remaining CRT styles or animation conflicts

---

## 🎛️ Visual Effects Matrix

| Effect                | Status  | Notes                                |
|----------------------|---------|--------------------------------------|
| Terminal Text Glow    | ✅      | Multi-layer white phosphor effect    |
| Breathing Pulse       | ✅      | Soft sine-style ambient loop         |
| Inner Shadow          | ✅      | Carves text against black BG         |
| CRT Flicker           | ❌      | Removed (was low/med/high flicker)   |
| Scanlines             | ❌      | Removed vertical animation           |
| Boot Burst            | ⏳      | Planned overlay whiteout             |
| RGB Ghosting          | ⏳      | Canvas-only (subpixel offset)        |
| Canvas Layer          | ⏳      | Exists as stub only                  |

---

## 🖥️ Terminal Emulation

| Feature           | Status | Notes                         |
|------------------|--------|-------------------------------|
| xterm.js          | ✅     | FitAddon enabled              |
| Theme Override    | ✅     | Explicit theme injected via JS|
| Background Styling| ❌     | Ignored by xterm — JS required|
| Scrollbar         | ✅     | Hidden, UX locked             |
| Auto Scroll       | ✅     | Standard terminal behavior    |
| Font Size         | ✅     | Dynamic, `settings.js`-based  |

---

## 🧠 State Variables

| Variable           | Purpose                            |
|--------------------|------------------------------------|
| `currentMachine`    | Current connected node (IP)        |
| `currentUsername`   | Logged-in user                     |
| `currentHostname`   | Active machine hostname            |
| `pendingLogin`      | IP queued for login attempt        |
| `pendingUsername`   | Username entered but not submitted |
| `awaitingUsername`  | Waiting for username input         |
| `awaitingPassword`  | Waiting for password input         |
| `commandBuffer`     | Current typed command              |
| `commandHistory`    | Array of past command entries      |
| `historyIndex`      | Index for navigating history       |
| `currentPath`       | Current working directory          |

---

## 📁 File Overview

| File                  | Purpose                                              |
|-----------------------|------------------------------------------------------|
| `index.html`          | Entry point, boots engine                            |
| `styles.css`          | All CSS styles (terminal + UI)                       |
| `main.js`             | Top-level loader and setup                           |
| `core/`               | System-level runtime logic                           |
| `fs/`                 | Filesystem structure and utilities                   |
| `cmds/`               | One file per command                                 |
| `startup/`            | Boot/login process                                   |
| `network/`            | Fake network model (IPs, hostnames)                  |
| `ui/`                 | Menu system and any UI overlays                      |
| `canvasFXManager.js`  | Future overlay effects (inactive)                    |
| `visualFXManager.js`  | Legacy CRT visual hooks (stubbed)                    |

---

## 🗂️ Menu Overlay

| Element              | Status | Notes                          |
|----------------------|--------|--------------------------------|
| Menu Button           | ✅     | Toggle visibility              |
| CRT Flicker Setting   | ❌     | Removed / N/A in clean mode    |
| Audio Toggle          | ✅     | Placeholder, not wired yet     |
| Text Speed Buttons    | ✅     | Slow, Fast, Instant            |
| Font Size             | ✅     | Persistent via settings        |
| Skip Boot Checkbox    | ✅     | Saves via localStorage         |
| Theme Selector        | ❌     | Disabled (xterm override issues) |

---

## 🔧 Available Commands

| Command     | Status | Notes                             |
|-------------|--------|-----------------------------------|
| `ls`        | ✅     | Directory listing                 |
| `cd`        | ✅     | Change directory                  |
| `cat`       | ✅     | Read file content                 |
| `clear`     | ✅     | Clears the screen                 |
| `help`      | ✅     | Lists commands                    |
| `ping`      | ✅     | Simulated up/down for hosts       |
| `nmap`      | ✅     | Reveals known subnet machines     |
| `ifconfig`  | ✅     | Shows network device info         |

Write operations intentionally not supported.

---

## 🌐 Simulated Network

| Feature            | Status | Notes                                |
|--------------------|--------|--------------------------------------|
| SSH-style Login     | ✅     | IP + user/password via `ssh` command |
| Discovered Hosts    | ✅     | Tracked via state                    |
| Ping Checks         | ✅     | Fake reachability feedback           |
| Subnet Scanning     | ✅     | `nmap` reveals known machines        |

---

## 🧪 Boot Sequence

- Boot logs use `termTypeLine()` with varied delays
- Ends with `"SBC_1 ready"` line
- Controlled via `skipBoot` toggle (menu + settings.js)

---

## 🪵 Known Issues

| Issue                  | Impact | Notes                                  |
|------------------------|--------|----------------------------------------|
| xterm ignores CSS BG   | Low    | Theme must be set via JS               |
| `animations.js` unused | ?      | May be removed                         |
| `narrative.js` unused  | Low    | Reserved for future narrative system   |

---

## 🧭 Internal Naming

| Label       | Use Case                          |
|-------------|-----------------------------------|
| `node.zero` | Game/project identity             |
| `node_zero` | System-safe string (URLs, etc.)   |

---

## 🗒 Dev Notes

- Terminal and menu now fully modular and theme-stable
- Text FX stack confirmed working (glow, pulse, inner shadow)
- Menu syncs with settings via localStorage
- Boot/login system abstracted
- Visual system now safely dormant, with scaffold for overlay reactivation

---
