// networkManager.js

import state from '../core/stateManager.js';
import fsTemplates from '../fs/fsTemplates.js';
import systems from './systems.js'; // optional but clean

// Simulated host reachability map (manual for now, could randomize later)
const hostStatus = {};
systems.forEach(sys => {
  hostStatus[sys.ip] = true; // all online by default
});

// --- Public API ---

export function getHostByIP(ip) {
  return systems.find(sys => sys.ip === ip);
}

export function isHostReachable(ip) {
  return !!hostStatus[ip];
}

export function setHostReachability(ip, reachable) {
  hostStatus[ip] = reachable;
}

export function listReachableHosts() {
  return systems.filter(sys => isHostReachable(sys.ip));
}

// Optional: Register reachable hosts into state.machines
export function mountReachableHosts() {
  listReachableHosts().forEach(sys => {
    if (!state.machines[sys.hostname]) {
      state.machines[sys.hostname] = {
        fs: fsTemplates.default(),
        users: {
          [sys.username]: sys.password
        }
      };
    }
  });
}
