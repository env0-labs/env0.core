/**
 * env0.core Command Module
 * -------------------------
 * Command: ifconfig
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: stateManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Displays simulated IP configuration for the current machine.
 * Always returns a loopback + fake network IP for localhost.
 */

import state from '../core/stateManager.js';
import { println } from '../core/xtermWrapper.js';

export function ifconfigCommand() {
  println('eth0: flags=UP BROADCAST RUNNING MULTICAST');
  println('    inet 10.10.10.99  netmask 255.255.255.0  broadcast 10.10.10.255');
  println('    ether aa:bb:cc:dd:ee:ff  txqueuelen 1000 (Ethernet)');
  println('');
  println('lo: flags=UP LOOPBACK RUNNING');
  println('    inet 127.0.0.1  netmask 255.0.0.0');
}
