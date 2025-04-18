/**
 * env0.core Command Module
 * -------------------------
 * Command: clear
 *
 * 🧠 Type: Pure Output
 * 🛠️ Depends on: stateManager.js
 *
 * 🔒 Side Effects: No (visual only)
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Clears the terminal display using the xterm.js API.
 */

import state from '../stateManager.js';

export function clearCommand() {
  state.terminal.clear();
}
