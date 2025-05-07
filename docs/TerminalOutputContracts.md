# TerminalOutputContracts.md — env0.core (Updated to Current State)

> This file defines the expected behavior of core terminal output functions.
> All new terminal output logic must comply with these contracts.

---

## `termPrint(text)`

- Directly appends text to the terminal buffer.
- Advances cursor horizontally.
- Supports inline prompts or progressive typing.
- No direct cursor reset or newline logic.
- Cleanly modularized in `terminalOutputManager.js`.

---

## `termPrintLines(lines[])`

- Flushes multiple lines to the terminal via a clean loop.
- Each line is pushed via `termPrint()` internally.
- No cursor desync due to buffered rendering.

---

## `termClear()`

- Clears the current terminal buffer.
- Does not affect scrollback history (purely a visual reset).
- Cleanly managed in `terminalOutputManager.js`.

---

## 🚫 Deprecated Functions (No Longer Used)

- `print(text)`: Replaced by `termPrint(text)`.
- `println(text)`: Replaced by `termPrintLines([text])`.
- `refreshLine()`: Fully removed. Prompt is directly handled by buffer.

---

## 🧩 Prompt Rendering

- Prompts are directly rendered via `termPrint` and `termPrintLines`.
- No separate `refreshLine` or manual cursor reset.
- Login prompts (`Username:`, `Password:`) are directly managed in `loginManager.js`.
- Shell prompt is cleanly drawn using `termPrint` without overwrite risk.

---

## 🚀 Behavior Guarantees

- No double-printing of prompts.
- No cursor desync due to buffered print logic.
- Inline text is cleanly appended without visual corruption.
- Newline behavior is always explicit (`termPrintLines`).

---

## ❌ Known Violations (Resolved)

- No remaining uses of `print()`, `println()`, or `refreshLine()` in any module.
- No terminal output inside filesystem or network logic.
- Prompt rendering is clean and consistent.

---

## 💡 Future Considerations

- Any new FX that directly affect text (glitch, glow, burn) must be applied at the FX layer, not at the print logic level.
- TerminalOutputManager remains the single point of control for all terminal text rendering.
- All direct buffer manipulation (e.g., cursor moves, clear) must be done through `terminalOutputManager.js`.

