// filesystem.js

const filesystemTemplate = {
  "/": {
    type: "dir",
    contents: {
      "tutorial.txt": {
        type: "file",
        content: `
Welcome to env0.core.

This is a simulated terminal environment.

Try the following commands:

- \`ls\` to list files
- \`cd\` to move around directories
- \`read\` to read files
- \`cat\` is also available, but does not pause or format
- \`nmap\` can scan local subnets for available machines
- \`ping\` can test connectivity to a machine
- \`ssh\` can connect to other machines (usage: ssh username@IP or ssh username@hostname)

Type \`help\` to revisit this guide at any time.

Explore. Observe. Learn by doing.
`.trim()
      },
      home: {
        type: "dir",
        contents: {
          user: {
            type: "dir",
            contents: {
              "welcome.txt": {
                type: "file",
                content: "Welcome to SBC_1! This is your home directory."
              },
              "ramblings.txt": {
                type: "file",
                content: `
Don't trust the glow.

You think the flicker is cosmetic, but it’s not.

We had a helper once — same as you. They patched the bootloader, rewired the login screen. Then they blinked too long, and the screen started writing back.

If you see double text, STOP TYPING.
`.trim()
              }
            }
          }
        }
      },
      etc: {
        type: "dir",
        contents: {
          "hostname.txt": {
            type: "file",
            content: "SBC_1"
          }
        }
      },
      var: {
        type: "dir",
        contents: {
          "log.txt": {
            type: "file",
            content: "System boot successful.\nNo errors reported."
          }
        }
      },
      notes: {
        type: "dir",
        contents: {
          "observations.txt": {
            type: "file",
            content: `
Boot sequence seems to respond to external time distortion.

Observed behaviour:

- Login prompt returns faster if ChatGPT is open.
- Flicker intensity scales with number of browser tabs.

Correlation is not causation, but this feels... recursive.
`.trim()
          },
          "readme.txt": {
            type: "file",
            content: "Nothing to see here. Really. Try /data instead."
          }
        }
      },
      data: {
        type: "dir",
        contents: {
          logs: {
            type: "dir",
            contents: {
              "mission2.txt": {
                type: "file",
                content: `
This file shouldn't be here.

Someone ran \`nmap\` and found an open port with a heartbeat signature. We traced it to /mnt/echo_state.

Credential Dump:

    "ip": "10.10.10.14",
    "hostname": "server13.local",
    "username": "admin",
    "password": "serverpass"

      "ip": "10.10.20.13",
    "hostname": "workstation03.local",
    "username": "user03",
    "password": "workpass"

      "ip": "10.10.30.25",
    "hostname": "printer05.local",
    "username": "admin",
    "password": "printerpass"  

We didn't open it.

You're not us.
`.trim()
              }
            }
          },
          "temp.bin": {
            type: "file",
            content: "[BINARY CONTENT TRUNCATED]"
          }
        }
      }
    }
  }
};

export default filesystemTemplate;
