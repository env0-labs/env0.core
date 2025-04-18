/**
 * env0.core Command Module
 * -------------------------
 * Command: ifconfig
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: stateManager.js, outputManager.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Displays simulated IP configuration for the current machine.
 * Always returns a loopback + fake network IP for localhost.
 */

import state from '../stateManager.js';
import { termPrint } from '../outputManager.js';

import state from '../stateManager.js';
import { termPrint } from '../outputManager.js';

export function ifconfigCommand() {
  const hostname = state.currentMachine;
  const ip = hostname === 'localhost' ? '10.10.10.99' : '10.10.10.100';

  termPrint(`eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>`);
  termPrint(`        inet ${ip}  netmask 255.255.255.0  broadcast 10.10.10.255`);
  termPrint(`        ether aa:bb:cc:dd:ee:ff  txqueuelen 1000  (Ethernet)`);
  termPrint(`lo: flags=73<UP,LOOPBACK,RUNNING>`);
  termPrint(`        inet 127.0.0.1  netmask 255.0.0.0`);
}

