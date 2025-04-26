# env0.core Session Notes — 2025-04-23

## Terminal Architecture

- Terminal interaction remains core to all env0.core modules.
- All narrative or layered behavior (e.g. AI character, voice prompts) must be executed via an *in-universe program* (e.g., `run sbc_1ai.sh`).
- Terminal commands remain whitelist-only; no NLP or parser-style interpretation.
- All behavioral hooks (e.g., hesitation, typing cadence) will be tracked locally (`localStorage`) and used for narrative or reactive presentation only — not gameplay gating.

## Simulation vs. Narrative

- env0.core remains a modular simulation engine, not a narrative platform.
- Narratives must layer on top of it without replacing the core terminal interaction model.

## Accessibility

- A dual-mode setup screen will allow players to toggle “No Keyboard” mode, which will enable an alternative click-based interaction system shared with entropy.echo’s dialogue UI layer.

## Audio/Visual

- Sound design handled modularly via `soundFXManager.js` (planned), using Tone.js.
- Visual distortions controlled through FX modules (`visualFXManager.js`, `canvasFXManager.js`) and never hardcoded into the core terminal renderer.
