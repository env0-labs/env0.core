/**
 * env0.core Command Module
 * -------------------------
 * Command: nmap
 *
 * 🧠 Type: Simulated Network
 * 🛠️ Depends on: systems.js, stateManager.js, networkManager.js, outputManager.js
 *
 * 🔒 Side Effects: Yes (adds to discoveredHosts)
 * 🧪 Safe to test in isolation: Yes
 *
 * Description:
 * Simulates scanning a subnet (e.g. 10.10.10.0/24) and reveals reachable hosts.
 */

import systems from '../network/systems.js';
import { termPrint } from '../core/outputManager.js';
import { isHostReachable } from '../network/networkManager.js';
import { discoverHost } from '../core/stateManager.js';

export function nmapCommand(args) {
  const target = args[1];

  if (!target || !target.includes('/')) {
    termPrint('Usage: nmap <subnet>  (e.g. nmap 10.10.10.0/24)');
    return;
  }

  const [baseIP, cidr] = target.split('/');
  if (cidr !== '24') {
    termPrint('Only /24 subnets are supported in this simulation.');
    return;
  }

  const subnetPrefix = baseIP.split('.').slice(0, 3).join('.') + '.';

  termPrint(`Starting Nmap scan on subnet ${target}...`);
  let found = 0;

  for (let i = 1; i < 255; i++) {
    const ip = `${subnetPrefix}${i}`;
    const host = systems.find(sys => sys.ip === ip);

    if (host && isHostReachable(ip)) {
      termPrint(`${ip}  open  ${host.hostname}`);
      discoverHost(ip, host.hostname);
      found++;
    }
  }

  if (found === 0) {
    termPrint('No hosts found.');
  }
}
