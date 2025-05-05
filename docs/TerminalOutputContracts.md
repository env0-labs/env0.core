# TerminalOutputContracts.md — env0.core (cc91ac0)

> This file defines the expected behavior of core terminal output functions.
> All new terminal output logic must comply with these contracts.

---

## `print(text)`

- Appends text at current cursor position.
- Does not commit line to buffer.
- Cursor advances horizontally.
- Used for inline prompts or progressive typing.

## `println(text)`

- Appends full line to scrollback buffer.
- Advances cursor to new line.
- Must be used after command output to flush buffer.

## `refreshLine(mode, buffer, …)`

- Shared renderer used by login and shell modes.
- In `login` mode, renders `Username:` or `Password:`
- In `shell` mode, renders prompt prefix + buffer
- 🚫 Risk: if `println()` not called before this, prompt may overwrite previous line

---

## `termPrint(text)` (from outputManager)

- Wrapper around `print()`, appends via terminalWrapper
- Mode-agnostic (⚠ should be updated)

## `termPrintLines(lines[])`

- Flushes multiple lines via `println()` loop

---

## Known Violations

- `loginManager.js` uses `refreshLine()` but does not enforce newline
- `print()` used inside FS logic (e.g., `filesystemManager`)
- `refreshPrompt()` cannot distinguish if prompt has already been rendered

---

## Future:

- `TerminalOutputManager.js` will own:
  - All terminal output functions
  - Prompt rendering
  - Input echo behavior
  - Scrollback push decisions
