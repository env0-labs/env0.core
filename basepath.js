// /core/basePath.js
const basePath = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '' : '/env0.core';

// Inject the base path into the CSS
document.documentElement.style.setProperty('--base-path', basePath);
