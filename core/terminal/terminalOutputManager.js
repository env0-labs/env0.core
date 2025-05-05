// terminalOutputManager.js
// Manages mode-aware prompt and terminal output logic
// Do not use println/print directly in loginManager or inputManager — route through here

import { println, print } from '../xtermWrapper.js'
import { getMode } from '../sessionManager.js'
import state from '../stateManager.js'
import { getCurrentDir } from '../fs/filesystemManager.js'

// Helper: returns shell prompt like `user@host:/path $ `
function getShellPrompt() {
  const username = state.username || 'user'
  const hostname = state.machineName || 'host'
  const path = getCurrentDir().join('/') || '/'
  return `${username}@${hostname}:${path} $ `
}

// PUBLIC: Draw shell prompt after output
export function drawShellPrompt(buffer = '') {
  println('') // Always advance to next line
  print(getShellPrompt())
  print(buffer)
}

// PUBLIC: Draw login prompt (username or password)
export function drawLoginPrompt() {
  println('')
  if (!state.pendingUsername) {
    print('Username: ')
  } else {
    print('Password: ')
  }
}

// Optional: centralized output if mode-dependent
export function drawPrompt(buffer = '') {
  const mode = getMode()
  if (mode === 'shell') {
    drawShellPrompt(buffer)
  } else if (mode === 'login') {
    drawLoginPrompt()
  } else {
    println('') // Safe default
  }
}
