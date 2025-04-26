// cmds/ssh.js

import { print, println, clearTerminal } from '../core/xtermWrapper.js';
import state from '../core/stateManager.js';
import { setFileSystem, prompt } from '../fs/filesystemManager.js';
import systems from '../network/systems.js';
import defaultFS from '../fs/filesystem.js';

function sshCommand(args) {
  if (!args || args.length === 0) {
    println("Usage: ssh user@hostname");
    return;
  }

  const target = args[0];
  const [userPart, hostPart] = target.split('@');

  if (!userPart || !hostPart) {
    println("Invalid SSH format. Use: ssh user@hostname");
    return;
  }

  // Find the system by hostname or IP
  const system = systems.find(sys => 
    sys.hostname === hostPart || sys.ip === hostPart
  );

  if (!system) {
    println(`No such host: ${hostPart}`);
    return;
  }

  // Validate username
  if (system.username !== userPart) {
    println(`Access denied for user '${userPart}' on ${hostPart}`);
    return;
  }
  console.log("[DEBUG] SSH system found:", system);

  // Validate password (Simple version — auto succeed if user matches)
  // If you want password prompting, you'll need an async input handler expansion.
  // For now we simulate password auto-match for clean UX.

  // Mount filesystem if machine not already mapped
  if (!state.machines[system.hostname]) {
    state.machines[system.hostname] = {
      fs: JSON.parse(JSON.stringify(defaultFS)), // Clone base FS
      users: { [system.username]: system.password }
    };
  }

  // Update session state
  state.currentUser = system.username;
  state.currentMachine = system.hostname;
  state.currentPath = [];

  // Set active filesystem
  setFileSystem(state.machines[state.currentMachine].fs);

  // Clear terminal softly
  clearTerminal();

  // Output login banner
  println(`Connected to ${system.hostname} (${system.ip}) as ${system.username}.`);
  println("");

  // Refresh shell prompt
  prompt();
}

export default sshCommand;
