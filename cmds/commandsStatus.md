# env0.core — Command Status Tracker

This file tracks all implemented and planned commands within the `env0.core` terminal engine.

| Command     | Status       | Type                 | Side Effects | Notes |
|-------------|--------------|----------------------|--------------|-------|
| `ls`        | ✅ Complete  | Filesystem           | No           | Lists contents of current dir |
| `cd`        | ✅ Complete  | Filesystem           | Yes          | Changes working directory |
| `cat`       | ✅ Complete  | Filesystem           | No           | Outputs file contents |
| `clear`     | ✅ Complete  | Pure Output          | No           | Clears terminal output |
| `help`      | ✅ Complete  | Pure Output          | No           | Lists available commands |
| `ifconfig`  | ⚙️ Planned   | Simulated Network    | No           | Stubbed for future network info |
| `nmap`      | ⚙️ Planned   | Simulated Network    | No           | Will scan fake network topology |
| `ping`      | ⚙️ Planned   | Simulated Network    | No           | Echo fake latency / host status |
| `whoami`    | ⚙️ Planned   | Stateful             | No           | Returns current user |
| `logout`    | ⏳ Not started | Stateful            | Yes          | Resets session state |
| `inject`    | ⏳ Not started | Narrative/Mission   | Yes          | Will modify files or trigger events |
| `decrypt`   | ⏳ Not started | Narrative/Mission   | Maybe        | Mission-linked — TBD |

---

## Legend:
- ✅ Complete: Implemented and tested
- ⚙️ Planned: Exists but needs logic
- ⏳ Not started: Placeholder only

> Commands should follow the modular header format and live in `/commands/`.
