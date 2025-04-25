import settings from '../core/settings.js';
import state from '../core/stateManager.js';
import { termClear, termPrint } from '../core/outputManager.js'; // ⬅️ updated
import { initLogin, outputIntro } from '../startup/loginManager.js';
import { refreshPrompt } from '../core/refreshPrompt.js';
import { refreshLine } from '../core/terminalHandler.js';

export async function startBootSequence() {
  console.log('🔥 Boot sequence started');
  console.log('🧪 initLogin about to run');
  await initLogin(state.terminal);
  console.log('✅ initLogin complete');

  if (settings.skipIntro) {
    termClear();
    termPrint('[Boot Skipped]');

    await initLogin(state.terminal, refreshLine);

    state.currentUser = null;
    state.loginComplete = false;
    state.awaitingUsername = true;
    state.awaitingPassword = false;
    state.pendingLogin = null;
    state.commandBuffer = '';
    state.cursorPosition = 0;

    await outputIntro(); // ← no IP = local = tutorial + hint
    return;
  }

  // Phase 0 — Blackout + Boot Burst - this whole thing needs ripped out post renderer - TODO later
  const blackout = document.getElementById('boot-blackout-layer');
  if (blackout) blackout.remove();

  await sleep(1000);
  triggerBootBurst();
  await sleep(400);

  // Phase 1 — Boot log
  console.log('✅ Boot burst complete — starting terminal output');
  termClear();

  const bootLines = [
    '[ OK ] Bootloader initialized',
    '[ OK ] Kernel loaded: Linux 3.12.6-sbc (armv7l)',
    '[ OK ] Mounting root filesystem (ext3)',
    '[ OK ] Remounting / read-write',
    '[ OK ] Loading device tree...',
    '[ OK ] Starting udev daemon',
    '[ OK ] Initializing virtual memory...',
    '[ OK ] Creating /dev entries',
    '[ OK ] Setting hostname to SBC_1',
    '[ OK ] Starting syslogd (busybox)',
    '[ OK ] Bringing up loopback interface',
    '[ OK ] Bringing up eth0 (wired)',
    '[ OK ] Acquiring IP via DHCP',
    '[ OK ] IP assigned: 10.10.10.99',
    '[ OK ] Starting network stack',
    '[WARN] No default gateway configured',
    '[ OK ] Loading kernel modules',
    '[ OK ] Detected 1 CPU core (ARM Cortex-A7)',
    '[ OK ] Memory check: 512MB OK',
    '[FAIL] Load microcode update — unsupported hardware',
    '[ OK ] Starting SSH service',
    '[ OK ] Starting TELNET service',
    '[ SKIP ] Bluetooth stack — not present',
    '[ OK ] Checking disk integrity (/dev/mmcblk0)',
    '[ OK ] tmpfs mounted on /run',
    '[ OK ] Mounting /mnt/usb — no media present',
    '[ OK ] Starting watchdog timer',
    '[ OK ] Loading TTY interfaces',
    '[ OK ] Mounting user partition',
    '[ OK ] Sourcing boot scripts (/etc/init.d)',
    '[ OK ] Configuring time zone (UTC)',
    '[ OK ] Starting user login service',
    '[FAIL] journalctl daemon not available — skipping logs',
    '[ OK ] Binding /bin/sh to TTY1',
    '[ OK ] Finalizing runtime state',
    '[ OK ] systemd: user mode emulation (partial)',
    '[ OK ] Boot completed in 18.532s',
    '[ OK ] SBC_1 ready'
  ];

  for (let line of bootLines) {
    termPrint(line);
    const delay = getLineDelay(line);
    if (delay > 150) await showSpinner(delay);
    else await sleep(delay);
  }

  // Phase 2 — Press any key prompt
  await sleep(600);
  termPrint('');
  termPrint('Press any key to continue...');
  await waitForKeypress();

  // Phase 3 — Clear + handoff to login narrative
  termClear();
  await outputIntro();
}

// --- Helpers below ---

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function triggerBootBurst() {
  const overlay = document.createElement('div');
  overlay.id = 'boot-burst';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(255, 255, 255, 0.25)';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '9999';
  overlay.style.animation = 'bootFlash 0.4s ease-out';

  document.body.appendChild(overlay);

  overlay.addEventListener('animationend', () => {
    overlay.remove();
  });
}

function getLineDelay(line = '') {
  const norm = line.toUpperCase();
  if (norm.includes('[FAIL')) return 2000;
  if (norm.includes('[SKIP')) return 150;
  return randBetween(30, 400);
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function showSpinner(duration) {
  const spinnerFrames = ['/', '-', '\\', '|'];
  let frameIndex = 0;
  const interval = 100;
  const endTime = Date.now() + duration;

  while (Date.now() < endTime) {
    // Optional: use println/spinner logic if needed
    frameIndex = (frameIndex + 1) % spinnerFrames.length;
    await sleep(interval);
  }
}

function waitForKeypress() {
  return new Promise(resolve => {
    const handler = () => {
      window.removeEventListener('keydown', handler);
      resolve();
    };
    window.addEventListener('keydown', handler);
  });
}
