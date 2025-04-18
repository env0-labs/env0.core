/**
 * env0.core Command Module
 * -------------------------
 * Command: help
 *
 * 🧠 Type: Pure Output
 * 🛠️ Depends on: outputManager.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Outputs a static list of available commands and their usage.
 */

import { termPrint } from '../outputManager.js';

export function helpCommand() {
  const helpText = [
    'Available Commands:',
    '  ls           - List directory contents',
    '  cd <dir>     - Change directory',
    '  cat <file>   - View file contents',
    '  clear        - Clear the screen',
    '  help         - Show this help message',
    // You can add future ones like ssh, nmap, ping here
  ];

  helpText.forEach(line => termPrint(line));
}
