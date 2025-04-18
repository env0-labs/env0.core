const savedInstant = localStorage.getItem('instantText');
const savedDelay = localStorage.getItem('typingDelay');
const savedFontSize = localStorage.getItem('fontSize');

const settings = {
  skipIntro: localStorage.getItem('skipIntro') === 'true',
  instantText: savedInstant === null ? false : savedInstant === 'true',
  darkMode: false,
  enableCRT: true,
  crtFlicker: localStorage.getItem('crtFlicker') || 'medium',
  terminalTheme: localStorage.getItem('terminalTheme') || 'green',
  audioEnabled: localStorage.getItem('audioEnabled') === 'true',
  fontSize: savedFontSize ? parseInt(savedFontSize, 10) : 18 // ✅ Add this line
};

export default settings;
