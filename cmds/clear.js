/**
 * env0.core Command Module
 * -------------------------
 * Command: clear
 *
 * 🧠 Type: Pure Output
 * 🛠️ Depends on: xtermWrapper.js
 *
 * 🔒 Side Effects: No (visual only)
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Clears the terminal display using the canvas renderer interface.
 */

import { clearTerminal } from '../core/xtermWrapper.js';

export function clearCommand() {
  clearTerminal();
}
