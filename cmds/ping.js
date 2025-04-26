/**
 * env0.core Command Module
 * -------------------------
 * Command: ping
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: networkManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: No
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Simulates sending ICMP echo requests to a target IP.
 * Uses fake host reachability from networkManager.js.
 */

import { println } from '../core/xtermWrapper.js';
import { getHostByIP, isHostReachable } from '../network/networkManager.js';

export function pingCommand(args) {
  const targetIP = args[1];

  if (!targetIP) {
    println('Usage: ping <ip>');
    return;
  }

  const host = getHostByIP(targetIP);
  if (!host) {
    println(`ping: unknown host ${targetIP}`);
    return;
  }

  println(`Pinging ${host.hostname} [${host.ip}] with 32 bytes of data:`);

  if (!isHostReachable(host.ip)) {
    println('Request timed out.');
    return;
  }

  for (let i = 0; i < 4; i++) {
    const time = 20 + Math.floor(Math.random() * 30); // 20–50ms
    println(`Reply from ${host.ip}: bytes=32 time=${time}ms TTL=64`);
  }
}
