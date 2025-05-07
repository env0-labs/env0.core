// menuManager.js - Modular Menu Initialization (Parent Context Only)
import { sendMessageToIframe } from '../../parentMessenger.js';

// Initialize Menu Function (Modular)
export function initializeMenu() {
  console.log('[Menu] Initializing Menu...');

  const menuButton = document.getElementById('menuButton');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeMenu = document.getElementById('closeMenu');
  const skipIntroCheckbox = document.getElementById('skipBoot');

  if (!menuButton || !menuOverlay) {
    console.error('[Menu] Menu elements not found in parent context.');
    return;
  }

  console.log('[Menu] Menu Elements Found');

  // Toggle Menu Visibility
  menuButton.addEventListener('click', () => {
    menuOverlay.style.display = menuOverlay.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close Menu
  closeMenu?.addEventListener('click', () => {
    menuOverlay.style.display = 'none';
  });

  // Skip Intro Checkbox
  skipIntroCheckbox?.addEventListener('change', (e) => {
    const skip = e.target.checked;
    localStorage.setItem('skipIntro', skip);
    sendMessageToIframe('skipIntro', { skip });
    console.log('[Menu] Sent Skip Intro Command');
  });

  // Initialize checkbox state from localStorage
  skipIntroCheckbox.checked = localStorage.getItem('skipIntro') === 'true';
}
