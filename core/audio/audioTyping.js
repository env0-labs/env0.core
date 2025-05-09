// /core/audio/audioTyping.js
import "https://cdn.jsdelivr.net/npm/tone@14.8.20/build/Tone.js";
import { getAudioOutputNode } from './audioManager.js';

let sampler;
let audioInitialized = false;

// List of available samples for key presses
const sampleUrls = [
    "/assets/audio/key_press_clack_1.wav",
    "/assets/audio/key_press_clack_2.wav",
    "/assets/audio/key_press_clack_3.wav",
];

// Dedicated samples for special keys
const enterKeySample = "/assets/audio/key_press_clack_return.wav";
const spaceKeySample = "/assets/audio/key_press_clack_space.wav";
const deleteKeySample = "/assets/audio/key_press_clack_delete.wav";

// ✅ Complete Keyboard Map with Note Mappings (Letters, Numbers, Symbols, Special Keys)
const keyToNoteMap = {
  // Letters (A-Z, a-z)
  'a': 'C3', 'A': 'C3', 'b': 'D3', 'B': 'D3', 'c': 'E3', 'C': 'E3',
  'd': 'F3', 'D': 'F3', 'e': 'G3', 'E': 'G3', 'f': 'A3', 'F': 'A3',
  'g': 'B3', 'G': 'B3', 'h': 'C4', 'H': 'C4', 'i': 'D4', 'I': 'D4',
  'j': 'E4', 'J': 'E4', 'k': 'F4', 'K': 'F4', 'l': 'G4', 'L': 'G4',
  'm': 'A4', 'M': 'A4', 'n': 'B4', 'N': 'B4', 'o': 'C5', 'O': 'C5',
  'p': 'D5', 'P': 'D5', 'q': 'E5', 'Q': 'E5', 'r': 'F5', 'R': 'F5',
  's': 'G5', 'S': 'G5', 't': 'A5', 'T': 'A5', 'u': 'B5', 'U': 'B5',
  'v': 'C6', 'V': 'C6', 'w': 'D6', 'W': 'D6', 'x': 'E6', 'X': 'E6',
  'y': 'F6', 'Y': 'F6', 'z': 'G6', 'Z': 'G6',

  // Numbers (0-9)
  '0': 'A2', '1': 'B2', '2': 'C2', '3': 'D2', '4': 'E2',
  '5': 'F2', '6': 'G2', '7': 'A2', '8': 'B2', '9': 'C2',

  // Symbols
  '!': 'D2', '@': 'E2', '#': 'F2', '$': 'G2', '%': 'A2',
  '^': 'B2', '&': 'C2', '*': 'D2', '(': 'E2', ')': 'F2',
  '-': 'G2', '_': 'A3', '=': 'B3', '+': 'C3',
  '[': 'D3', ']': 'E3', '{': 'F3', '}': 'G3',
  ';': 'A4', ':': 'B4', '\'': 'C4', '"': 'D4',
  ',': 'E4', '.': 'F4', '/': 'G4', '\\': 'A5',
  '?': 'B5', '<': 'C5', '>': 'D5', '|': 'E5',

  // Special Keys
  'Enter': 'C7',   // Enter has a dedicated sound
  ' ': 'C8',       // Space has a dedicated sound
  'Delete': 'C9',  // Delete and Backspace both share this sound
  'Backspace': 'C9' // Backspace shares the same sound as Delete
};

// ✅ Initialize Typing Audio (Only Once)
function initializeAudio() {
  if (audioInitialized) return;
  audioInitialized = true;
  console.log("AudioTyping: Initializing Typing Sounds...");

  const noteToSampleMap = {};

  // ✅ Map each key directly by name (Known Logic)
  Object.keys(keyToNoteMap).forEach(key => {
    const note = keyToNoteMap[key];

    if (key === 'Enter') {
      noteToSampleMap[note] = enterKeySample;
    } else if (key === ' ') {
      noteToSampleMap[note] = spaceKeySample;
    } else if (key === 'Delete' || key === 'Backspace') {
      noteToSampleMap[note] = deleteKeySample; // Same sound for both Delete and Backspace
    } else {
      noteToSampleMap[note] = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
    }
  });

  sampler = new Tone.Sampler({
    urls: noteToSampleMap,
    release: 0.1,
    onload: () => {
      console.log("AudioTyping: Sampler Loaded and Ready.");
    },
    onerror: (err) => {
      console.error("AudioTyping: Error loading samples:", err);
    }
  }).connect(getAudioOutputNode());
}

// ✅ Receives Key Inputs from InputManager
export function receiveKeyInput(key) {
  if (!audioInitialized) initializeAudio();

  if (!sampler) {
    console.error("AudioTyping: Sampler not initialized.");
    return;
  }

  if (sampler.loaded) {
    const note = keyToNoteMap[key] || null;
    if (note) {
      sampler.triggerAttackRelease(note, "8n");
      console.log(`AudioTyping: Sound played for key: ${key} as note: ${note}`);
    } else {
      console.warn(`AudioTyping: No mapped sound for key: ${key}`);
    }
  } else {
    console.error("AudioTyping: Samples are not fully loaded.");
  }
}
