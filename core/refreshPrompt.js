// refreshPrompt.js

import { prompt } from '../fs/filesystemManager.js';

export function refreshPrompt() {
  prompt(); // always pulls state.currentUser etc
}
