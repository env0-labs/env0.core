# 📦 Import/Export Map — Baseline @ cc91ac0 (Corrected)

This version includes multiline `import` and `export` statements.

## `cmds/cat.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/xtermWrapper.js';
- import { getCurrentDir } from '../core/fs/filesystemManager.js';
- import { getTerminalCols } from '../core/terminal/canvasTerminal.js';

**Exports:**
- export function catCommand(args) { if (!args[0]) { println('Usage: cat <file>');

---

## `cmds/cd.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/xtermWrapper.js';

**Exports:**
- export function cdCommand(args) { if (!args[0]) { println('Usage: cd <directory>');

---

## `cmds/clear.js`
**Imports:**
- import { clearTerminal } from '../core/xtermWrapper.js';

**Exports:**
- export function clearCommand() { clearTerminal();

---

## `cmds/exit.js`
**Imports:**
- import { clearTerminal, println } from '../core/xtermWrapper.js';
- import { setFileSystem, prompt } from '../core/fs/filesystemManager.js';
- import state from '../core/stateManager.js';

**Exports:**
- export { exitCommand };
- export default exitCommand;

---

## `cmds/help.js`
**Imports:**
- import { println } from '../core/xtermWrapper.js';

**Exports:**
- export function helpCommand() { const helpText = [ 'Available Commands:', '  ls             - List directory contents', '  cd <dir>       - Change directory', '  cat <file>     - View file contents', '  clear          - Clear the screen', '  help           - Show this help message', '  ifconfig       - Show IP configuration for current machine', '  ping <ip>      - Ping a host to check reachability', '  nmap <subnet>  - Simulate network scan (e.g. 10.10.10.0/24)' ];

---

## `cmds/ifconfig.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/xtermWrapper.js';

**Exports:**
- export function ifconfigCommand() { println('eth0: flags=UP BROADCAST RUNNING MULTICAST');

---

## `cmds/ls.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/xtermWrapper.js';
- import { getTerminalCols } from '../core/terminal/canvasTerminal.js';
- import { getCurrentDir } from '../core/fs/filesystemManager.js';

**Exports:**
- export function lsCommand() { const dir = getCurrentDir();

---

## `cmds/nmap.js`
**Imports:**
- import systems from '../core/network/systems.js';
- import { println } from '../core/xtermWrapper.js';
- import { isHostReachable } from '../core/network/networkManager.js';
- import { discoverHost } from '../core/stateManager.js';
- import { triggerGlitch } from '../core/fx/canvasFXManager.js'; // Adjust path if needed  export function nmapCommand(args) { const target = args[0];

_No exports_

---

## `cmds/ping.js`
**Imports:**
- import { println } from '../core/xtermWrapper.js';
- import { getHostByIP, isHostReachable } from '../core/network/networkManager.js';

**Exports:**
- export function pingCommand(args) { const targetIP = args[0];

---

## `cmds/read.js`
**Imports:**
- import { enterReaderMode } from '../core/ui/readerManager.js';
- import state from '../core/stateManager.js';
- import { resolveFile } from '../core/fs/filesystemManager.js';
- import { println } from '../core/xtermWrapper.js';

**Exports:**
- export function read(args) { if (!args || args.length === 0) { println("Usage: read <filename>");

---

## `cmds/ssh.js`
**Imports:**
- import { print, println, clearTerminal } from '../core/xtermWrapper.js';
- import state from '../core/stateManager.js';
- import { setFileSystem, prompt } from '../core/fs/filesystemManager.js';
- import systems from '../core/network/systems.js';
- import defaultFS from '../core/fs/filesystem.js';

**Exports:**
- export default sshCommand;

---

## `core/fs/filesystem.js`
_No imports_

**Exports:**
- export default filesystemTemplate;

---

## `core/fs/filesystemManager.js`
**Imports:**
- import state from '../stateManager.js';
- import { print } from '../xtermWrapper.js';

**Exports:**
- export { setFileSystem, getCurrentDir, prompt, resolveFile };

---

## `core/fx/animations.js`
_No imports_

**Exports:**
- export function startAnimations() { const scanline = document.getElementById('scanline');

---

## `core/fx/canvasFXManager.js`
_No imports_

**Exports:**
- export function initCanvasFX(context, width, height) { ctx = context;
- export function updateCanvasFX(deltaTime) {  if (glitchActive) { glitchTimer -= deltaTime;
- export function triggerGlitch(durationMs = 250) {  glitchActive = true;
- export function drawCanvasFX() {    if (!ctx || (!glitchActive)) { return;

---

## `core/fx/visualFXManager.js`
**Imports:**
- import settings from '../settings.js';

**Exports:**
- export function initVisualFX() { terminal = document.getElementById('terminal');
- export function applyFlicker(level) { if (!terminal || !scanline) return;
- export function applyTheme(theme) { console.warn('applyTheme() is currently disabled — xterm fights back.');

---

## `core/inputManager.js`
**Imports:**
- import state from './stateManager.js';
- import { refreshLine } from './terminalHandler.js';
- import { handleLoginInput as processLoginInput } from './startup/loginManager.js';
- import { getMode, setMode } from './sessionManager.js';
- import sshCommand from '../cmds/ssh.js';
- import { lsCommand } from '../cmds/ls.js';
- import { cdCommand } from '../cmds/cd.js';
- import { catCommand } from '../cmds/cat.js';
- import { clearCommand } from '../cmds/clear.js';
- import { helpCommand } from '../cmds/help.js';
- import { pingCommand } from '../cmds/ping.js';
- import { ifconfigCommand } from '../cmds/ifconfig.js';
- import { nmapCommand } from '../cmds/nmap.js';
- import { read } from '../cmds/read.js';
- import { exitCommand } from '../cmds/exit.js';
- import { println, scrollToBottom } from './xtermWrapper.js';

**Exports:**
- export function handleKeyInput(e) { const { key, domEvent } = e;

---

## `core/layerManager.js`
_No imports_

_No exports_

---

## `core/messagingTransmitter.js`
_No imports_

**Exports:**
- export function sendToParent(type, payload = {}) { window.parent.postMessage({ type, payload }, '*');

---

## `core/network/networkManager.js`
**Imports:**
- import state from '../stateManager.js';
- import fs from '../fs/filesystem.js';
- import systems from './systems.js'; // optional but clean  // Simulated host reachability map (manual for now, could randomize later) const hostStatus = {};

**Exports:**
- export function getHostByIP(ip) { return systems.find(sys => sys.ip === ip);
- export function isHostReachable(ip) { return !!hostStatus[ip];
- export function setHostReachability(ip, reachable) { hostStatus[ip] = reachable;
- export function listReachableHosts() { return systems.filter(sys => isHostReachable(sys.ip));
- export function mountReachableHosts() { listReachableHosts().forEach(sys => { if (!state.machines[sys.hostname]) { state.machines[sys.hostname] = { fs: structuredClone(fs), // or a deepClone util users: { [sys.username]: sys.password } };

---

## `core/network/systems.js`
_No imports_

**Exports:**
- export default systems;

---

## `core/outputManager.js`
**Imports:**
- import state from './stateManager.js';
- import { print, println, clearTerminal } from './xtermWrapper.js';

**Exports:**
- export function termPrint(text) { if (typeof text !== 'string') { throw new Error(`[termPrint] Invalid input: ${text}`);
- export function termPrintLines(lines = []) { lines.forEach(line => { if (typeof line !== 'string') { console.warn('[termPrintLines] Non-string line:', line);
- export function termClear() { clearTerminal();

---

## `core/refreshPrompt.js`
**Imports:**
- import { prompt } from '../fs/filesystemManager.js';

_No exports_

---

## `core/sessionManager.js`
_No imports_

**Exports:**
- export function getMode() { return session.mode;
- export function setMode(newMode) { if (!VALID_MODES.includes(newMode)) { console.error(`[sessionManager] Invalid mode set attempt: ${newMode}`);
- export function isMode(targetMode) { return session.mode === targetMode;
- export function resetSession() { console.warn('[sessionManager] Session reset.');
- export function canTransitionTo(newMode) { const allowed = { boot: ['login'], login: ['shell'], shell: ['reader', 'login'], reader: ['shell'] };

---

## `core/settings.js`
_No imports_

**Exports:**
- export default settings;

---

## `core/startup/bootSequence.js`
**Imports:**
- import settings from '../settings.js';
- import { termClear, termPrint } from '../outputManager.js';
- import { initLogin, outputIntro } from './loginManager.js';
- import { setMode } from '../sessionManager.js';
- import { refreshLine } from '../terminalHandler.js';

**Exports:**
- export async function startBootSequence() { console.log('🔥 Boot sequence started');

---

## `core/startup/loginManager.js`
**Imports:**
- import { getTypingDelay } from '../terminalHandler.js';
- import systems from '../network/systems.js';
- import state, { resetSessionState } from '../stateManager.js';
- import fs from '../fs/filesystem.js';
- import settings from '../settings.js';
- import { initVisualFX } from '../fx/visualFXManager.js';
- import { println } from '../xtermWrapper.js';
- import { getMode, setMode } from '../sessionManager.js';
- import { writeLine } from '../terminal/terminalBuffer.js';

**Exports:**
- export function initLogin(refreshLineInstance) { console.warn('[loginManager] initLogin called');
- export async function outputIntro(targetIP = null) { if (!targetIP) { println(`Welcome to SBC_1`);
- export function handleLoginInput() { console.warn('[loginManager] handleLoginInput fired');

---

## `core/stateManager.js`
**Imports:**
- import defaultFS from './fs/filesystem.js';

**Exports:**
- export function resetSessionState(username, machineName) { if (!username || typeof username !== 'string' || username.trim() === '') { console.error('[resetSessionState] Invalid username');
- export function logoutSession() { state.currentUser = null;
- export function discoverHost(ip, hostname) { const exists = state.discoveredHosts.some(h => h.ip === ip);
- export function isHostDiscovered(ip) { return state.discoveredHosts.some(h => h.ip === ip);
- export function resetDiscoveredHosts() { state.discoveredHosts = [];
- export default state;

---

## `core/terminal/accessibilityOverlay.js`
_No imports_

_No exports_

---

## `core/terminal/canvasTerminal.js`
**Imports:**
- import { config } from './terminalConfig.js';
- import { setContext, drawFromBuffer } from './terminalRenderer.js';
- import { setCursorContext, startBlink } from './terminalCursor.js';
- import { initTerminalFX, updateTerminalFX, drawTerminalFX } from './terminalFX/terminalFXManager.js';

**Exports:**
- export let canvas, ctx;
- export function getTerminalCols() { return cols;
- export function getTerminalRows() { return rows;
- export function createCanvas(container) { canvas = document.createElement('canvas');
- export function redraw() { ctx.clearRect(0, 0, canvas.width, canvas.height); // 💥 clear buffer drawFromBuffer();
- export function startRenderLoop() { if (animating) return;

---

## `core/terminal/entropyVisuals.js`
_No imports_

_No exports_

---

## `core/terminal/env0.terminal.js`
**Imports:**
- import { createCanvas, redraw, canvas, getTerminalRows } from './canvasTerminal.js';
- import { writeText, writeLine, clearBuffer, getVisibleBuffer, setViewportStartRow } from './terminalBuffer.js';
- import { startBlink } from './terminalCursor.js';

**Exports:**
- export function initTerminal(container) { containerEl = container;
- export function print(text) { writeText(text);
- export function println(text = '') { if (typeof text !== 'string') { console.warn('[println] Coerced non-string input:', text);
- export function clearTerminal() { clearBuffer();
- export { redraw };
- export function focusTerminal() { canvas.setAttribute('tabindex', 0);
- export function scrollToBottom() { const buffer = getVisibleBuffer();
- export { writeLine,   // <-- ✅ now available to xtermWrapper };

---

## `core/terminal/inputTracker.js`
_No imports_

_No exports_

---

## `core/terminal/terminalBuffer.js`
_No imports_

**Exports:**
- export function clearBuffer() { buffer.length = 0;
- export function writeText(text) { if (!buffer.length) { buffer.push('');
- export function writeLine(text = '') { buffer.push(text);
- export function getVisibleBuffer() { return buffer;
- export function clampScrollback() { if (buffer.length > maxLines) { const excess = buffer.length - maxLines;
- export function setViewportStartRow(row) { viewportStartRow = row;
- export function getViewportStartRow() { return viewportStartRow;
- export function overwriteLastLine(newText) { if (buffer.length > 0) { buffer[buffer.length - 1] = newText;

---

## `core/terminal/terminalConfig.js`
_No imports_

**Exports:**
- export const config = { fontSize: 16, fontFamily: 'courier, monospace', fontWeight: 'bold', bgColor: '#000000', fgColor: '#FFFFFF', cursorVerticalOffset: 0, // used for CRT shake, not layout charWidth: 10,        // Fixed cell width in px charHeight: 21,       // Fixed cell height in px useFixedCellSize: true, // If true, bypass measureText() and use hardcoded grid cursorOffsetX: -1, cursorOffsetY: -1.5,  };

---

## `core/terminal/terminalCursor.js`
**Imports:**
- import { config } from './terminalConfig.js';
- import { redraw } from './canvasTerminal.js'; // add this at top import { getTerminalCols } from './canvasTerminal.js'; // add this  let blinkInterval = null;

**Exports:**
- export function setCursorContext(context, cw, ch) { ctx = context;
- export function moveCursorTo(x, y) { cursorX = x;
- export function advanceCursor(chars = 1) { cursorX += chars;
- export function newlineCursor() { cursorX = 0;
- export function resetCursor() { cursorX = 0;
- export function drawCursor() { if (!ctx || !visible) return;
- export function showCursor() { visible = true;
- export function startBlink(rate = 500) { if (blinkInterval) clearInterval(blinkInterval);
- export function getCursorPosition() { return { x: cursorX, y: cursorY };
- export function setCursorPosition(x, y) { cursorX = x;

---

## `core/terminal/terminalFX/burnFX.js`
_No imports_

**Exports:**
- export function init(ctx, w, h) { width = w;
- export function update(deltaTime) { for (let row = 0; row < maxRows; row++) { const rowData = burnBuffer[row];
- export function draw(ctx) { ctx.save();
- export function recordChar(row, col, char) { if (row >= 0 && col >= 0 && row < maxRows && col < maxCols) { burnBuffer[row][col] = { char: char, opacity: 1.0 };

---

## `core/terminal/terminalFX/flickerFX.js`
_No imports_

**Exports:**
- export function init(ctx, width, height) { // No setup needed — stateless flicker }  export function update(deltaTime) { // Simple frame-by-frame intensity intensity = 0.97 + Math.random() * 0.03; // flickers between 0.92 and 1.0 }  export function draw(ctx) { ctx.save();

---

## `core/terminal/terminalFX/ghostFX.js`
_No imports_

**Exports:**
- export function init(ctx, w, h) { width = w;
- export function update(deltaTime) { // No-op for now }  export function draw(ctx) { if (!ghostCtx) return;

---

## `core/terminal/terminalFX/glitchFX.js`
_No imports_

**Exports:**
- export function init(ctx, width, height) { glitchMap.clear();
- export function update(deltaTime) { if (!enabled) return;
- export function draw(ctx) { // No-op — glitch is injected at render time }  export function getGlitchedChar(row, col, originalChar) { if (!enabled) return originalChar;
- export function setGlitchEnabled(flag) { enabled = flag;

---

## `core/terminal/terminalFX/glowFX.js`
_No imports_

**Exports:**
- export function init(newCtx, w, h) { ctx = newCtx;
- export function update(deltaTime) { glowTimer += deltaTime * 0.001; // deltaTime in ms to seconds }  export function draw(ctx) { const pulse = 0.1 + Math.sin(glowTimer * 0.1) * 0.05;

---

## `core/terminal/terminalFX/rowJitterFX.js`
_No imports_

**Exports:**
- export function init(ctx, width, height) { rowOffsets = new Array(100).fill(0); // More rows than we actually need }  export function update(deltaTime) { for (let row = 0; row < rowOffsets.length; row++) { if (Math.random() < jitterFrequency) { rowOffsets[row] = Math.floor(Math.random() * (maxOffset + 1)); // 0 to +maxOffset only } } }  export function draw(ctx) { // No direct drawing — offsets only }  export function getRowOffset(row) { return rowOffsets[row] || 0;

---

## `core/terminal/terminalFX/terminalFXManager.js`
**Imports:**
- import * as glowFX from './glowFX.js';
- import * as flickerFX from './flickerFX.js';
- import * as ghostFX from './ghostFX.js';
- import * as glitchFX from './glitchFX.js';
- import * as rowJitterFX from './rowJitterFX.js';
- import * as burnFX from './burnFX.js';

**Exports:**
- export function initTerminalFX(ctx, width, height) { glowFX.init(ctx, width, height);
- export function updateTerminalFX(deltaTime) { glowFX.update(deltaTime);
- export function drawTerminalFX(ctx) { glowFX.draw(ctx);
- export function setFXEnabled(flag) { enabled = flag;

---

## `core/terminal/terminalRenderer.js`
**Imports:**
- import { config } from './terminalConfig.js';
- import { getVisibleBuffer, getViewportStartRow } from './terminalBuffer.js';
- import { drawCursor } from './terminalCursor.js';
- import { canvas, getTerminalRows } from './canvasTerminal.js';
- import { updateCanvasFX, drawCanvasFX } from '../../core/fx/canvasFXManager.js';
- import state from '../stateManager.js';
- import * as glitchFX from './terminalFX/glitchFX.js';
- import * as rowJitterFX from './terminalFX/rowJitterFX.js';
- import * as burnFX from './terminalFX/burnFX.js';

**Exports:**
- export function setContext(newCtx, width, height) { ctx = newCtx;
- export function drawFromBuffer() { if (!ctx) return;

---

## `core/terminalHandler.js`
**Imports:**
- import { scrollToBottom, print, println, clearTerminal, redraw } from './xtermWrapper.js';
- import state from './stateManager.js';
- import { canvas, getTerminalCols } from './terminal/canvasTerminal.js';
- import { writeLine, getVisibleBuffer, overwriteLastLine, getViewportStartRow } from './terminal/terminalBuffer.js';
- import { showCursor, setCursorPosition } from './terminal/terminalCursor.js';

**Exports:**
- export function setTypingDelay(value) { _typingDelay = value;
- export function getTypingDelay() { return _typingDelay;
- export function attachTerminalInput(handler) { canvas.addEventListener('keydown', e => { const event = { key: e.key, domEvent: e };
- export function refreshLine(mode, buffer, username, hostname, pathArray, forceNewLine = false) { if (typeof buffer !== 'string') buffer = ''; // ✅ Always sanitize early  let line = '';

---

## `core/ui/menuManager.js`
**Imports:**
- import { setTypingDelay } from '../terminalHandler.js';
- import settings from '../settings.js';
- import state from '../stateManager.js';
- import { applyFlicker, applyTheme } from '../fx/visualFXManager.js';
- import { focusTerminal } from '../xtermWrapper.js';

**Exports:**
- export function initializeMenu() { const menuButton = document.getElementById('menuButton');

---

## `core/ui/messagingListener.js`
_No imports_

**Exports:**
- export function listenToTerminal(callback) { window.addEventListener('message', (e) => { const frame = document.getElementById('terminalFrame');

---

## `core/ui/readerManager.js`
**Imports:**
- import state from '../stateManager.js';
- import { refreshLine } from '../terminalHandler.js';
- import { print, println, clearTerminal } from '../xtermWrapper.js';

**Exports:**
- export function enterReaderMode(content) { active = true;

---

## `core/xtermWrapper.js`
**Imports:**
- import { initTerminal, print, writeLine, clearTerminal, scrollToBottom, focusTerminal, redraw } from './terminal/env0.terminal.js'; // adjusted to real location  export { initTerminal, print, clearTerminal, scrollToBottom, focusTerminal, redraw };

**Exports:**
- export function println(text = '') { writeLine(text);

---

## `terminalBoot.js`
**Imports:**
- import state from './core/stateManager.js';
- import { initTerminal, focusTerminal } from './core/xtermWrapper.js';
- import { refreshLine, attachTerminalInput } from './core/terminalHandler.js';
- import { initLogin } from './core/startup/loginManager.js';
- import { handleKeyInput } from './core/inputManager.js';
- import fs from './core/fs/filesystem.js';
- import { setFileSystem } from './core/fs/filesystemManager.js';
- import { initializeMenu } from './core/ui/menuManager.js';
- import { redraw } from './core/terminal/canvasTerminal.js';
- import { triggerGlitch } from './core/fx/canvasFXManager.js';

_No exports_

---

