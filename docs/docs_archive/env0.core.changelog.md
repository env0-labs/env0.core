# node.zero - Changelog

## [Unreleased]

### Added
- Modular folder structure implemented (`core/`, `fs/`, `cmds/`, `network/`, `startup/`, `ui/`)
- All import paths updated with explicit `.js` extensions
- `canvasFXManager.js` scaffolded with no-op functions for future use
- White phosphor glow added via CSS with breathing pulse animation
- Subtle inner shadow added to terminal text for depth
- Text-level FX hierarchy established (vs overlay FX)
- Font size setting added to `settings.js` with persistence via `localStorage`
- `fontSize` now applied during terminal initialization via `terminalHandler.js`
- Visual FX system documented in `projectdocumentation.md`

### Changed
- `styles.css` restructured for minimal mode; all CRT/scanline effects removed
- `visualFXManager.js` stubbed: all exports replaced with inert loggers
- Default terminal theme explicitly set to white-on-black using `xterm.setOption('theme', {...})`
- Project now boots with zero 404s, ghost imports, or visual noise by default

### Fixed
- Phantom path errors due to incorrect import nesting (`/core/core/stateManager.js`)
- `visualFXManager` import conflicts due to removed exports
- xterm default green color overriding CSS styles
- Breathing text glow syntax error from misplaced semicolon in `text-shadow`
- Persistent glow issues caused by missing `.js` extensions and misaligned import resolution

---

## [Previous Commits]

### 0.1.0 - Initial working build
- Login screen with username/password entry
- Commands implemented: ls, cd, cat, help, clear
- Basic fake SSH system with network node switch
- Intro narrative wired in (early stage)
- Initial menu overlay added with working open/close
- Early CRT visuals (static flicker, basic glow)
