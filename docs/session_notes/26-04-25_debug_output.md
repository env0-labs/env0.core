## 🛠 env0.core — Command Debugging Pass

Commands to debug in order (highest dependency risk first):

| Command | Description | Immediate Risk Area |
|---------|-------------|----------------------|
| `ls` | List directory contents | ⚠️ Must reflect real FS structure (not ghost templates) |
| `cd` | Change working directory | ⚠️ Must correctly resolve paths, handle invalid dirs |
| `cat` | Output file contents | ✅ Should be stable if FS read is intact |
| `read` | Enter fullscreen reader mode | ⚠️ Depends on clean readerManager handoff and buffer reset |
| `clear` | Clear terminal screen | ✅ Should call buffer wipe safely |
| `help` | List available commands | ✅ Static, should require minimal/no fixes |
| `ping` | Simulate network ping | ⚠️ Needs valid reachableHosts (networkManager must seed) |
| `nmap` | Simulate subnet scan | ⚠️ Depends on systems data and listReachableHosts output |
| `ifconfig` | Show fake IP interface info | ✅ Static output unless future dynamic expansion planned |

## 📦 Testing Focus Per Command

- **Filesystem Resolution** (`ls`, `cd`, `cat`, `read`)
  - Check `filesystemManager.js` integration (`resolveFile`, `getCurrentDir`)
  - ⚠️ All filesystems must source from `filesystem.js` — no fsTemplates clone layers permitted (legacy artifact purged).

- **Session State Usage** (`cd`, `ls`)
- **Terminal Output Flow** (`cat`, `clear`, `help`)
- **Networking Simulations** (`ping`, `nmap`, `ifconfig`)

# LS Debugging Plan

- Confirm correct imports (`getCurrentDir`, `state`, `println`)
- Validate current directory safely
- Loop through `dir.contents` keys
- Ensure listing matches real filesystem.js
- No template ghosting
- No path assumptions


## 🧹 Debugging Protocol

- Load only `/cmds/*.js` first.
- Load `filesystemManager.js` and `stateManager.js` second.
- Load `outputManager.js` if needed.
- Isolate command tests manually at `root@localhost:/$`.
- Commit after major recovery milestones.

## ✅ Goal

Achieve stable command layer before SSH or remote expansions.
