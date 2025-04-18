/**
 * env0.core Command Module
 * -------------------------
 * Command: ping
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: networkManager.js, outputManager.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Simulates sending ICMP echo requests to a target IP.
 * Uses fake host reachability from networkManager.js.
 */

import { termPrint } from '../core/outputManager.js';
import { getHostByIP, isHostReachable } from '../network/networkManager.js';

export function pingCommand(args) {
  const targetIP = args[1];

  if (!targetIP) {
    termPrint('Usage: ping <ip>');
    return;
  }

  const host = getHostByIP(targetIP);
  if (!host) {
    termPrint(`ping: unknown host ${targetIP}`);
    return;
  }

  termPrint(`Pinging ${host.hostname} [${host.ip}] with 32 bytes of data:`);

  if (!isHostReachable(host.ip)) {
    termPrint(`Request timed out.`);
    return;
  }

  // Simulate 4 pings
  for (let i = 0; i < 4; i++) {
    const time = 20 + Math.floor(Math.random() * 30); // 20–50ms
    termPrint(`Reply from ${host.ip}: bytes=32 time=${time}ms TTL=64`);
  }
}
