/**
 * env0.core Command Module
 * -------------------------
 * Command: nmap
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: systems.js, stateManager.js, networkManager.js, xtermWrapper.js
 *
 * 🔒 Side Effects: Yes (adds to discoveredHosts)
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Simulates scanning a subnet (e.g. 10.10.10.0/24) and reveals reachable hosts.
 */

import systems from '../core/network/systems.js';
import { println } from '../core/xtermWrapper.js';
import { isHostReachable } from '../core/network/networkManager.js';
import { discoverHost } from '../core/stateManager.js';
import { triggerGlitch } from '../core/fx/canvasFXManager.js'; // Adjust path if needed

export function nmapCommand(args) {
  const target = args[0];

  if (!target || !target.includes('/')) {
    println('Usage: nmap <subnet>  (e.g. nmap 10.10.10.0/24)');
    return;
  }

  const [baseIP, cidr] = target.split('/');
  if (cidr !== '24') {
    println('Only /24 subnets are supported in this simulation.');
    return;
  }

  const subnetPrefix = baseIP.split('.').slice(0, 3).join('.') + '.';

  println(`Starting Nmap scan on subnet ${target}...`);
  let found = 0;

  for (let i = 1; i < 255; i++) {
    const ip = `${subnetPrefix}${i}`;
    const host = systems.find(sys => sys.ip === ip);

    if (host && isHostReachable(ip)) {
      println(`${ip}  open  ${host.hostname}`);
      discoverHost(ip, host.hostname);
      found++;
    }
  }

  if (found === 0) {
    println('No hosts found.');
  }
  triggerGlitch(500); // [TEMPORARY/OPTIONAL FX] Trigger glitch effect after successful nmap scan (for visual feedback)

}
