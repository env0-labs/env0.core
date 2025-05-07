# AUDIT2.md - Scenario-Based Detailed Audit

## SCENARIO 1: Terminal Renderer Integrity Check
- **Issues Identified:**
  - Renderer depends on global state (`stateManager.js`), creating hidden state dependencies.
  - FX directly manipulate the canvas, bypassing modular rendering.
  - Cursor and buffer state are directly manipulated without proper encapsulation.

- **Recommendations:**
  - Decouple renderer from FX logic.
  - Use state objects for cursor and buffer.
  - Implement an isolated FX layer.

---

## SCENARIO 2: Boot Sequence Review
- **Issues Identified:**
  - Boot sequence tightly coupled to specific modules (`settings`, `outputManager`).
  - Direct `localStorage` manipulation introduces hidden state.
  - Hardcoded boot messages reduce flexibility.

- **Recommendations:**
  - Modularize boot sequence.
  - Use a state management system for persistent state.
  - Load boot messages from a configuration file.

---

## SCENARIO 3: FX Isolation Audit
- **Issues Identified:**
  - FX directly manipulate the canvas, risking interference with core rendering.
  - Multiple FX modules (BurnFX, GhostFX, GlowFX) have direct canvas control.
  - FX modules also access buffer and cursor state.

- **Recommendations:**
  - Isolate FX rendering from the main terminal canvas.
  - Implement a post-processing FX layer.
  - Ensure FX do not access core terminal state.

---

## SCENARIO 4: Refactor Residue Scan
- **Issues Identified:**
  - Over 60 instances of `return` without condition (potentially unreachable code).
  - Commented-out functions (`outputManager.js`).
  - Legacy code patterns without cleanup.

- **Recommendations:**
  - Remove unused functions.
  - Review each `return` without condition for clarity.
  - Enforce cleanup after future refactors.

---

## SCENARIO 5: Input System Consistency Check
- **Issues Identified:**
  - Input handling is directly tied to prompt rendering, reducing flexibility.
  - Inconsistent handling of newlines and backspaces.
  - Direct DOM manipulation in input handler.

- **Recommendations:**
  - Decouple input logic from prompt rendering.
  - Use a unified input buffer and handler.
  - Modularize newline and backspace handling.
