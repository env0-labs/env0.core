# env0.core.driftmap.md

> **Drift and Fracture Log**
> 
> This document tracks where individual files in `env0.core/` have drifted from their intended purpose, or have fractures (critical architecture violations).
> 
> Entries should be added during audit phases, before any rewrite or refactor work begins.

---

## 🔹 Drift Codes

- `🔶 Drift` → Minor divergence from intended purpose (e.g., wrong responsibility, scattered side effects)
- `🔴 Fracture` → Major violation (e.g., unsafe state mutations, brittle hacks, direct terminal I/O when forbidden)

---

# 📋 Drift / Fracture Log

## 📁 cmds/

- `cat.js` — 
- `cd.js` — 
- `clear.js` — 
- `help.js` — 
- `ifconfig.js` — 
- `ls.js` — 
- `nmap.js` — 
- `ping.js` — 
- `read.js` — 

---

## 📁 core/

- `inputManager.js` — 
- `outputManager.js` — 
- `refreshPrompt.js` — 
- `settings.js` — 
- `stateManager.js` — 
- `terminalHandler.js` — 
- `xtermWrapper.js` — 

---

### 📁 core/terminal/

- `accessibilityOverlay.js` — 
- `canvasTerminal.js` — 
- `env0.terminal.js` — 
- `entropyVisuals.js` — 
- `inputTracker.js` — 
- `terminalBuffer.js` — 
- `terminalConfig.js` — 
- `terminalCursor.js` — 
- `terminalFX.js` — 
- `terminalRenderer.js` — 

---

## 📁 fs/

- `filesystem.js` — 
- `filesystemManager.js` — 
- `fsTemplates.js` — 

---

## 📁 fx/

- `animations.js` — 
- `canvasFXManager.js` — 
- `visualFXManager.js` — 

---

## 📁 network/

- `networkManager.js` — 
- `systems.js` — 

---

## 📁 startup/

- `bootSequence.js` — 
- `loginManager.js` — 

---

## 📁 ui/

- `menuManager.js` — 
- `readerManager.js` — 

---

# 🧹 How to Use

- As you audit a file, fill in its line.
- Example:  
inputManager.js — 
🔴 Fracture: state mutation during login; 
🔶 Drift: prompt refresh leakage

- If a file is clean, write `✅ No issues detected`

---

# ✅ Driftmap Status

- Structure aligned
- Ready for population as audit proceeds

---
