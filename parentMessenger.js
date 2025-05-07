// parentMessenger.js
export function sendMessageToIframe(command, data = {}) {
  const iframe = document.getElementById('terminalFrame');
  if (!iframe) {
    console.error('[ParentMessenger] Iframe not found.');
    return;
  }

  iframe.contentWindow.postMessage({ command, data }, "*");
  console.log('[ParentMessenger] Sent Command:', command, data);
}
