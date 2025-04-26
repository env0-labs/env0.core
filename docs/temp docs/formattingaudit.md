# 🧾 Terminal Command Baseline: env0.core

Use this to capture the **current observable behavior** of each command during manual testing.  
Focus on **output clarity, prompt behavior, and shell stability** — not internal logic.

---

## 📁 Boot Sequence

| Area | Status | Observations |
|:-----|:-------|:-------------|
| Boot log flow | Functional | Before boot sequence starts it is showing "user@localhost:/$" which is then replaced by boot sequence
Missing instruction for 'next line' |
| MENU visibility | Perfect | Perfect |
| "Press any key" | functional | seems to work, tested 'space' and 'enter' and both worked |
| Transition to prompt | Broken | Triggers 'username' but missing the pre-login text giving username and password (root:toor) when "skip boot sequence" is enabled, no text to show "boot skipped" I assume it's missing in the same with the login details are missing, ALSO upon successful login the prompt appears INSTEAD of the password line, it should appear BELOW the password line |

---

## 💻 Core Command Output

| Command | Output Format | Prompt Returns? | Shell Alive? | Notes |
|:--------|:--------------|:----------------|:-------------|:------|
| `ls` |  |  |  | Shows "lstutorial.txt home etc var notes data |
| `cd` |  |  |  |  |
| `cat <file>` |  |  |  |  |
| `read <file>` |  |  |  |  |
| `clear` |  |  |  |  |
| `help` |  |  |  |  |
| `ping <ip>` |  |  |  |  |
| `nmap <subnet>` |  |  |  |  |
| `ifconfig` |  |  |  |  |

---

## 📜 Prompt Behavior Summary

| Scenario | Prompt Shown After? | Notes |
|:---------|:--------------------|:------|
| After command with no output |  |  |
| After multiline output |  |  |
| After reader exit |  |  |
| After clear |  |  |

---

## 🧠 Notes + Drift Detection

Freeform observations about anything strange, out of place, or suspicious —  
especially visual bugs, double outputs, frozen input, or unexpected blank lines.

---
