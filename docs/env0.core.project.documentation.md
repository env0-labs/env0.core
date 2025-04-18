# projectdocumentation.md — node.zero (Golden Copy)

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
   - Will be managed via `canvasFXManager.js`
   - Handles noise, scanlines, boot burst, flicker, phosphor trails
   - Reactive to system state, command events, and narrative triggers
   - Not yet implemented (stub exists)

---

### Current Implementation (April 2025)

- **Glow**: Enabled
  - Pure white phosphor effect
  - Applied via `text-shadow` on `.xterm .xterm-rows`
- **Breathing Pulse**: Enabled
  - Subtle `@keyframes softGlowPulse` animation
  - Simulates a thinking or waiting machine
- **Inner Shadow**: Enabled
  - Adds depth under characters using `0 1px 0 #000000`
- **CRT/Scanline FX**: Disabled
- **Canvas overlays**: Not active yet
- **Theme switching**: Disabled
- **VisualFXManager.js**:
  - All exports stubbed
  - Logs activity, no effects currently applied

---

### Principles

- **Text-level FX are passive**: set once via CSS and left alone
- **Canvas FX will never touch xterm**: visual-only, pointer-events: none
- **Terminal should remain functional even with all visuals disabled**
- All glow/visuals are opt-out, not opt-in

---

### Future Additions

Text FX candidates (CSS only):
- Command-triggered glow pulse
- Error redshift (via class)
- Login boot flicker (keyframe staggered)
- Flicker burst on nmap or discovery

Overlay FX candidates (canvasFXManager.js):
- Soft CRT flicker layers
- Boot burst whiteout
- Scanline sweep
- Phosphor burn
- Screen jitter

---

### Last Verified State

- `styles.css`: glow + pulse active
- `visualFXManager.js`: disabled, safe
- `canvasFXManager.js`: present, unmounted
- No broken imports, no legacy CRT classes in use

---

## 🎛️ Visual Effects Matrix

| Effect | Status | Notes |
|:------|:------|:------|
| CRT Background | ✅ | #001100 radioactive green |
| Terminal Text Glow | ✅ | Multi-layer green shadows |
| Flicker | ✅ | 3-tier system (low, medium, high) |
| Scanlines | ✅ | Animated vertical sweep, tied to flicker intensity |
| Noise Layer | ✅ | Static + subtle drift overlays |
| Burn-in / Ghosting | ✅ | Text ghosting blend layer |
| Startup Flash | ⏳ | Planned: boot burst pulse |
| Vignette | ⏳ | Planned: dark corners radial gradient |
| RGB Ghosting | ⏳ | Planned: subtle chromatic offset |

---

## 🖥️ Terminal Emulation

| Feature | Status | Notes |
|:--------|:-------|:------|
| xterm.js integration | ✅ | FitAddon enabled |
| Hidden Scrollbar | ✅ | CRT-style UX |
| Responsive Scaling | ✅ | Resizes with window |
| Auto-scroll | ✅ | Default behavior |
| Char Wrapping | ✅ | Native xterm logic |

---

## 🧠 State Variables

| Variable | Purpose |
|:---------|:--------|
| `currentMachine` | Current connected node (IP) |
| `currentUsername` | Logged-in user |
| `currentHostname` | Active machine hostname |
| `pendingLogin` | IP queued for login attempt |
| `pendingUsername` | Temp user input during login |
| `awaitingUsername` | Awaiting username entry |
| `awaitingPassword` | Awaiting password entry |
| `commandBuffer` | Current typed command text |
| `commandHistory` | Array of all previous commands |
| `historyIndex` | Navigation through history |
| `currentPath` | Current working directory |

---

## 📁 File Overview

| File | Purpose |
|:-----|:--------|
| `index.html` | Terminal shell + overlay entrypoint |
| `styles.css` | Core CRT layout + menu styling |
| `main.js` | Boot and top-level init control |
| `filesystem.js` | Filesystem structure base |
| `fsTemplates.js` | Per-node FS templates |
| `filesystemManager.js` | Runtime FS operations |
| `systems.js` | Machine IP and credential map |
| `stateManager.js` | Single truth runtime store |
| `inputManager.js` | Command parsing + routing |
| `outputManager.js` | Output helpers (type, print, clear) |
| `settings.js` | localStorage management |
| `visualFXManager.js` | Flicker/scanline/effects controller |
| `menuManager.js` | UI panel logic, toggle, sync |
| `loginManager.js` | Login logic + post-boot setup |
| `terminalHandler.js` | Prompt refresh + typing delay |
| `bootSequence.js` | Full boot experience manager |

---

## 🗂️ Menu Overlay

| Element | Status | Notes |
|:--------|:-------|:------|
| Menu Button | ✅ | Top right, green border |
| Overlay Panel | ✅ | Full screen, semi-transparent |
| Close Button (X) | ✅ | Accessible via hover or click |
| Audio Toggle | ✅ | Placeholder wiring only |
| Text Speed Select | ✅ | Controls typing pace |
| Skip Boot Checkbox | ✅ | Fully wired, localStorage-backed |
| CRT Flicker Select | ✅ | Cycles intensity tier visually |
| Theme Selector | ❌ | Fallout option removed — xterm override issues |

---

## 🔧 Available Commands

| Command | Status | Notes |
|:--------|:-------|:------|
| `ls` | ✅ | Lists current directory |
| `cd` | ✅ | Handles relative and root paths |
| `cat` | ✅ | Reads text content |
| `clear` | ✅ | Clears screen |
| `ssh` | ✅ | Switches node via auth |
| `nmap` | ✅ | Reveals machine IPs |
| `ping` | ✅ | Fake up/down check |
| `ifconfig` | ✅ | Shows fake device info |
| `help` | ✅ | Lists valid commands |

Note: **No write commands supported** (`mkdir`, `touch`, etc. intentionally omitted).

---

## 🌐 Simulated Network

| Feature | Status | Notes |
|:--------|:-------|:------|
| SSH Login | ✅ | IP + user/password auth |
| Hostname Stripping | ✅ | Removes `.local` for brevity |
| Discovery (nmap) | ✅ | Fake subnet map |
| Ping | ✅ | Returns `up/down` for known machines |

---

## 🧪 Boot Sequence Notes

- Full log sequence includes ~40 lines of `[ OK ]`, `[WARN]`, `[FAIL]`, `[SKIP]`
- Lines typed using `termTypeLine()` with random pacing delays
- Critical lines pause longer (e.g., microcode failure)
- Ends with "SBC_1 ready", then clears to login
- Guarded by `skipIntro` toggle via menu → stored in `settings.js`

---

## 🪵 Known Issues

| Issue | Impact | Notes |
|:------|:-------|:------|
| xterm ignores background CSS | Low | Theme override not working |
| `animations.js` | Unknown | Verify before deletion |
| `narrative.js` | Deprecated | Reserved for future `narrativeManager` system |

---

## 🧭 Internal Naming

| Label | Meaning |
|:------|:--------|
| `node.zero` | Public/project name |
| `node_zero` | Safe version (filepaths, URLs, etc.) |

---

## 🗒️ Dev Notes

- Visual fidelity confirmed across flicker tiers
- Menu reflects full persistent state
- Login/boot system now modular
- File structure is logically grouped by purpose

> This doc reflects implemented behavior. For roadmap/ideas, see `tasklist.md` and `blackbox.md`.


## ⚙️ Shell Engine Extraction

- Extract boot manager, shell, prompt renderer into reusable "node.shell" module
- Support for:
  - Custom IP
  - Login flow
  - FS mounting per node
- Nodes can simulate different OS versions, FS corruption, partial access

---