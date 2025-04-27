// cmds/exit.js

import { clearTerminal, println } from '../core/xtermWrapper.js';
import { setFileSystem, prompt } from '../core/fs/filesystemManager.js';
import state from '../core/stateManager.js';

function exitCommand() {
    if (state.currentMachine === 'localhost') {
      println("exit: Not connected to any remote machine.");
      return;
    }
  
    // Reset session cleanly
    state.currentMachine = 'localhost';
    state.currentUser = 'user';
    state.currentPath = [];
    state.commandBuffer = '';
    state.cursorPosition = 0;
    state.loginComplete = true; // <-- Keep shell session alive
  
    // Restore localhost filesystem
    setFileSystem(state.machines['localhost'].fs);
  
    clearTerminal();
    println("Connection closed.\n");
  
    console.log("[DEBUG] Exit State:", {
        currentUser: state.currentUser,
        currentMachine: state.currentMachine,
        currentPath: state.currentPath
      });
      

    // Fully refresh new prompt
    prompt();
  }
  

export { exitCommand };
export default exitCommand;
