# 📦 Import/Export Map — Updated to Current State (Post-Refactor)

---

## `cmds/cat.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/terminalOutputManager.js';
- import { getCurrentDir } from '../core/fs/filesystemManager.js';
- import { getTerminalCols } from '../core/terminal/canvasTerminal.js';

**Exports:**
- export function catCommand(args) { if (!args[0]) { println('Usage: cat <file>');

---

## `cmds/cd.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/terminalOutputManager.js';

**Exports:**
- export function cdCommand(args) { if (!args[0]) { println('Usage: cd <directory>');

---

## `cmds/clear.js`
**Imports:**
- import { clearTerminal } from '../core/terminalOutputManager.js';

**Exports:**
- export function clearCommand() { clearTerminal();

---

## `cmds/exit.js`
**Imports:**
- import { clearTerminal, println } from '../core/terminalOutputManager.js';
- import { setFileSystem, prompt } from '../core/fs/filesystemManager.js';
- import state from '../core/stateManager.js';

**Exports:**
- export default exitCommand;

---

## `cmds/help.js`
**Imports:**
- import { println } from '../core/terminalOutputManager.js';

**Exports:**
- export function helpCommand() { ... }

---

## `cmds/ifconfig.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/terminalOutputManager.js';

**Exports:**
- export function ifconfigCommand() { ... }

---

## `cmds/ls.js`
**Imports:**
- import state from '../core/stateManager.js';
- import { println } from '../core/terminalOutputManager.js';
- import { getTerminalCols } from '../core/terminal/canvasTerminal.js';
- import { getCurrentDir } from '../core/fs/filesystemManager.js';

**Exports:**
- export function lsCommand() { ... }

---

## `cmds/nmap.js`
**Imports:**
- import systems from '../core/network/systems.js';
- import { println } from '../core/terminalOutputManager.js';
- import { isHostReachable } from '../core/network/networkManager.js';
- import { discoverHost } from '../core/stateManager.js';
- import { triggerGlitch } from '../core/fx/canvasFXManager.js';

**Exports:**
- export function nmapCommand(args) { ... }

---

## `cmds/ping.js`
**Imports:**
- import { println } from '../core/terminalOutputManager.js';
- import { getHostByIP, isHostReachable } from '../core/network/networkManager.js';

**Exports:**
- export function pingCommand(args) { ... }

---

## `cmds/read.js`
**Imports:**
- import { enterReaderMode } from '../core/ui/readerManager.js';
- import state from '../core/stateManager.js';
- import { resolveFile } from '../core/fs/filesystemManager.js';
- import { println } from '../core/terminalOutputManager.js';

**Exports:**
- export function read(args) { ... }

---

## `cmds/ssh.js`
**Imports:**
- import { println, clearTerminal } from '../core/terminalOutputManager.js';
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
- import { println } from '../core/terminalOutputManager.js';

**Exports:**
- export { setFileSystem, getCurrentDir, prompt, resolveFile };

---

## `core/fx/canvasFXManager.js`
_No imports_

**Exports:**
- export function triggerGlitch() { ... };

---

## `core/inputManager.js`
**Imports:**
- import state from './stateManager.js';
- import { handleLoginInput as processLoginInput } from './startup/loginManager.js';
- import { getMode, setMode } from './sessionManager.js';
- import { println } from './terminalOutputManager.js';

**Exports:**
- export function handleKeyInput(e) { ... };

---

## `core/startup/bootSequence.js`
**Imports:**
- import settings from '../settings.js';
- import { termClear, termPrint } from '../terminalOutputManager.js';
- import { outputIntro } from './loginManager.js';
- import { setMode } from '../sessionManager.js';

**Exports:**
- export async function startBootSequence() { ... };

---

## `core/startup/loginManager.js`
**Imports:**
- import { println } from '../core/terminalOutputManager.js';
- import state from '../stateManager.js';

**Exports:**
- export async function outputIntro() { ... };

---

## `core/stateManager.js`
_No imports_

**Exports:**
- export default state;

---

## `core/terminalOutputManager.js`
_No imports_

**Exports:**
- export function termPrint(text) { ... };
- export function termPrintLines(lines) { ... };
- export function termClear() { ... };

---

## `core/ui/menuManager.js`
**Imports:**
- import { sendMessageToIframe } from '../../parentMessenger.js';

**Exports:**
- export function initializeMenu() { ... };

---

## `parentMessenger.js`
_No imports_

**Exports:**
- export function sendMessageToIframe(type, payload) { window.frames['terminalFrame'].contentWindow.postMessage({ command: type, data: payload }, '*'); };

---

## `core/iframeMessenger.js`
_No imports_

**Exports:**
- window.addEventListener('message', (event) => { ... });

---

## `terminalBoot.js`
**Imports:**
- import state from './core/stateManager.js';
- import { initTerminal, focusTerminal } from './core/xtermWrapper.js';
- import { attachTerminalInput } from './core/terminalHandler.js';
- import { handleKeyInput } from './core/inputManager.js';
- import fs from './core/fs/filesystem.js';
- import { setFileSystem } from './core/fs/filesystemManager.js';
- import { initializeMenu } from './core/ui/menuManager.js';
- import { redraw } from './core/terminal/canvasTerminal.js';
- import { startBootSequence } from './core/startup/bootSequence.js';

_No exports_
