// sessionManager.js

/**
 * env0.core — Session Manager
 * ----------------------------
 * Controls the current operational mode of the system:
 * boot → login → shell → reader
 * 
 * Future expansions: error handling, maintenance modes, etc.
 */

const VALID_MODES = ['boot', 'login', 'shell', 'reader'];

const session = {
  mode: 'boot'
};

/**
 * Get the current session mode.
 */
export function getMode() {
  return session.mode;
}

/**
 * Set the current session mode.
 * 
 * @param {string} newMode - Must be one of VALID_MODES
 */
export function setMode(newMode) {
  if (!VALID_MODES.includes(newMode)) {
    console.error(`[sessionManager] Invalid mode set attempt: ${newMode}`);
    return;
  }
  console.log(`[sessionManager] Mode change: ${session.mode} → ${newMode}`);
  session.mode = newMode;
}

/**
 * Check if current mode matches.
 * 
 * @param {string} targetMode
 * @returns {boolean}
 */
export function isMode(targetMode) {
  return session.mode === targetMode;
}

/**
 * Reset session to initial state.
 * Called after logout or full reboot.
 */
export function resetSession() {
  console.warn('[sessionManager] Session reset.');
  session.mode = 'boot';
}

/**
 * Validate an intended transition.
 * 
 * For now, simple linear progression:
 * boot → login → shell → reader (then back to shell)
 * 
 * Future: expand to flexible state graphs.
 */
export function canTransitionTo(newMode) {
  const allowed = {
    boot: ['login'],
    login: ['shell'],
    shell: ['reader', 'login'],
    reader: ['shell']
  };
  return allowed[session.mode]?.includes(newMode);
}
