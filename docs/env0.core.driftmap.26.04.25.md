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

- `cat.js` — 🔶 Drift: Only supports current dir filename; poor fallback if path invalid
- `cd.js` — 🔴 Fracture: Unsafe directory traversal; manual dir rebuild from root on `..`
- `clear.js` — ✅ No issues detected
- `help.js` — ✅ No issues detected
- `ifconfig.js` — ✅ No issues detected
- `ls.js` — 🔶 Drift: Mixed println/termPrint use; inconsistent wrapping
- `nmap.js` — 🔶 Drift: No input validation; assumes valid /24 subnets blindly
- `ping.js` — 🔶 Drift: Minor randomization tweakable; otherwise safe
- `read.js` — 🔶 Drift: Assumes filesystem stability; missing fallback if FS resolve fails

---

## 📁 core/

- `inputManager.js` — 🔴 Fracture: Hardwired login/shell checks; direct brittle state mutation; prompt refresh coupling
- `outputManager.js` — 🔶 Drift: Hard-throws on invalid text input; could soften and warn instead
- `refreshPrompt.js` — 🔶 Drift: Overrelies on external prompt() calls without verifying session state
- `settings.js` — ✅ No issues detected
- `stateManager.js` — 🔴 Fracture: Unsafe manual state resets; session structure brittle; no formal modes
- `terminalHandler.js` — 🔶 Drift: Assumes input consistency; no guardrails on prompt injection
- `xtermWrapper.js` — 🔶 Drift: Blind pass-through to canvas terminal; no verification or fallback


---

## 📁 core/terminal/

- `terminalRenderer.js` — 🔶 Drift: Debug console.log left active during production renders
- `accessibilityOverlay.js` — ⚪ Stub (no audit needed)
- `canvasTerminal.js` — ✅ No issues detected
- `entropyVisuals.js` — ⚪ Stub (no audit needed)
- `env0.terminal.js` — ✅ No issues detected
- `inputTracker.js` — ⚪ Stub (no audit needed)
- `terminalBuffer.js` — 🔶 Drift: Hardcoded cursor ops inside text write; minor isolation breach
- `terminalConfig.js` — ✅ No issues detected
- `terminalCursor.js` — 🔶 Drift: Cursor blink redraws entire canvas directly; minor tight coupling
- `terminalFX.js` — ⚪ Stub (no audit needed)


---

## 📁 fs/

- `filesystem.js` — ✅ No issues detected
- `filesystemManager.js` — 🔶 Drift: Direct print() calls; bypasses proper output wrapping
- `fsTemplates.js` — ✅ No issues detected

---

## 📁 fx/

- `canvasFXManager.js` — 🔶 Drift: Stubbed with console logs; no FX implemented yet
- `visualFXManager.js` — 🔶 Drift: Incomplete theme support; references obsolete xterm behavior
- `animations.js` — ✅ No issues detected

---

## 📁 network/

- `networkManager.js` — 🔶 Drift: Unsafe global state mutation (`mountReachableHosts()`)
- `systems.js` — ✅ No issues detected

---

## 📁 startup/

- `bootSequence.js` — 🔴 Fracture: Manual login state resets; output and session flow coupled dangerously
- `loginManager.js` — 🔴 Fracture: Terminal-layer coupling; direct session manipulation; brittle flow control

---

## 📁 ui/

- `menuManager.js` — 🔶 Drift: Relies on manual terminal focus; state.terminal dependency
- `readerManager.js` — 🔴 Fracture: Manual terminal clearing and prompt resetting; no safe mode handoff

---

## 📁 (root)

- `index.html` — 🔶 Drift: xterm.js CSS link still included; minor container drift
- `styles.css` — 🔶 Drift: Contains legacy xterm-specific styles; canvasTerminal no longer uses them
- `main.js` — 🔴 Fracture: Mixed responsibility; initializes multiple subsystems without session abstraction
- `narrative.js` — 🗑️ Deletion recommended (deprecated)

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

# env0.core.rebuild_plan.md

> **Rebuild Initiative for env0.core**  
> 
> Goal: Repair session state, input handling, and terminal output systems to create a reliable foundation for canvasTerminal-based operations.
> 
> Phased, priority-driven rebuild based on full audit driftmap.

---

# 🚩 Phase 1: Session Manager Rebuild (Critical)

✅ Create `core/sessionManager.js`
- Control session mode: `boot`, `login`, `shell`, `reader`
- Define allowed transitions between modes
- Eliminate `state.awaitingUsername`, `state.awaitingPassword`, `state.loginComplete` flags from global state

✅ Refactor `inputManager.js`
- Dispatch input based on `sessionManager.getMode()`
- Each mode (`login`, `shell`, etc.) has its own key handler

✅ Refactor `bootSequence.js`
- Replace manual state resets with `sessionManager.setMode('login')`

✅ Refactor `loginManager.js`
- Move all login flow state into `sessionManager`
- No manual `state` mutation anymore
- No direct terminal injection (use proper events)

✅ Patch `readerManager.js`
- Integrate clean mode switch: `reader` → `shell`
- Kill manual `clearTerminal()` calls mid-input

---

# 🚩 Phase 2: Terminal Output and Prompt Discipline

✅ Clean `refreshPrompt.js`
- Refresh prompt based only on `sessionManager` state
- No external param injection (forcedUser, etc.)

✅ Harden `outputManager.js`
- Validate all output text before calling println

✅ Patch `filesystemManager.js`
- Move `prompt()` logic out of FS manager; decouple FS and shell prompt.

✅ Review `terminalHandler.js`
- Verify `refreshLine()` only called by approved input flows.

---

# 🚩 Phase 3: Boot + Startup Stabilization

✅ Remove redundant xterm.js CSS links from `index.html`
✅ Clean `main.js`
- Initialize terminal only
- Initialize `sessionManager`
- Hand off flow to boot/login manager through controlled paths

✅ Remove `narrative.js`
- It is deprecated and misleading

---

# 🚩 Phase 4: Visuals and FX Layer Cleanup

✅ Audit and finalize `fx/`
- Decide whether to finish `canvasFXManager.js` stubs or strip them temporarily
- Harden `visualFXManager.js` against settings corruption

✅ Confirm CRT flicker and boot flash operate via proper hooks
- No ghost overlays without controlled triggers

---

# 📈 Priority Target List

| File | Action |
|:-----|:-------|
| `core/sessionManager.js` | New - highest priority |
| `core/inputManager.js` | Rewrite dispatching based on session modes |
| `startup/bootSequence.js` | Refactor to mode transitions |
| `startup/loginManager.js` | Refactor to mode transitions |
| `ui/readerManager.js` | Refactor to session-managed exits |
| `main.js` | Refactor - pure setup |
| `refreshPrompt.js` | Tighten prompt control |
| `filesystemManager.js` | Purge prompt wiring |

---

# ⚙️ Final Rebuild Goals

- **Session mode-driven system** (boot, login, shell, reader — isolated and clean)
- **Input dispatch modularized** (no random command parsing mid-login)
- **Prompt ownership clear** (only one system responsible)
- **Terminal output safe** (validated text paths)
- **Visuals layered cleanly** (FX optional, not tangled)

---

# ✅ End Condition

When a user boots the system:
- Boot sequence → Login prompt → Shell prompt  
All transitions **mode-controlled**, **state-valid**, **buffer-stable**.

No ghost users.  
No undefined prompts.  
No terminal drift.

---

