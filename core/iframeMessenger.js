// iframeMessenger.js - Iframe Side (Core)
window.addEventListener('message', (event) => {
  const { command, data } = event.data;
  console.log('[IframeMessenger] Received Command:', command, data);

  switch (command) {
    case 'skipIntro':
      console.log('[Iframe] Setting Skip Intro to:', data.skip);
      localStorage.setItem('skipIntro', data.skip);
      break;
    
    default:
      console.warn('[IframeMessenger] Unknown Command:', command);
  }
});
