# tasklist.05.05.25.md — Active Development Tasks

This is the live task file post-reset (`cc91ac0`). It assumes canvasTerminal is stable and prompt drift is the primary remaining issue.

---

## ✅ Stable at Baseline

- Canvas renderer functional
- InputManager routes login/shell correctly
- Terminal FX stack fully modular (`terminalFXManager.js`)
- Boot/login flow reliable (post rollback)
- Shell command set: `ls`, `cd`, `cat`, `clear`, `help`, `ifconfig`, `ping`, `nmap`, `read`, `ssh`, `exit`

---

## 🧪 Known Bugs / Brittle Behavior

- `print()` and `println()` used inconsistently across login/shell
- `refreshLine()` does not differentiate mode-specific behavior
- Line wrapping causes cursor/buffer desync on overflow
- Prompt sometimes appears mid-line if newline wasn’t forced
- Output functions (e.g. `termPrint`) not always mode-aware

---

## 🔧 Immediate Fixes

- [ ] Create `TerminalOutputManager.js` to own print/println/refreshLine logic
- [ ] Refactor `refreshLine()` into mode-aware renderer split
- [ ] Harden input echo logic during login (prevent overwrite)
- [ ] Patch line wrapping issue or defer behind `TerminalOutputManager`

---

## 🧼 Refactor Targets

- [ ] Fully remove CLI output logic from `filesystemManager.js`
- [ ] Remove legacy `print()` calls outside wrapper or manager
- [ ] Purge remaining visual FX keyframes from CSS (boot-burst remnants)
- [ ] Audit command output paths for `termPrint()` compliance

---

## 🧭 Short-Term Feature Candidates

- [ ] Add placeholder responses for `mkdir`, `touch`, `echo`
- [ ] Terminal settings toggle via config or shell (`themeManager.js`)
- [ ] Scrollback buffer length setting
- [ ] CRT mask toggle (off/on/soft)

---

## 🚩 Phase 3 Readiness

- Entropy manager not active
- GlassCanvas not yet implemented
- Boot system stable; not modular

Work from this tasklist only — older tasklist is frozen.
