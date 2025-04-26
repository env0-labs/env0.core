/**
 * env0.core Command Module
 * -------------------------
 * Command: help
 *
 * 🧠 Type: Pure Output
 * 🛠️ Depends on: xtermWrapper.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Outputs a static list of available commands and their usage.
 */

import { println } from '../core/xtermWrapper.js';

export function helpCommand() {
  const helpText = [
    'Available Commands:',
    '  ls             - List directory contents',
    '  cd <dir>       - Change directory',
    '  cat <file>     - View file contents',
    '  clear          - Clear the screen',
    '  help           - Show this help message',
    '  ifconfig       - Show IP configuration for current machine',
    '  ping <ip>      - Ping a host to check reachability',
    '  nmap <subnet>  - Simulate network scan (e.g. 10.10.10.0/24)'
  ];

  helpText.forEach(line => println(line));
}
