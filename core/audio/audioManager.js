// /core/audio/audioManager.js
import "https://cdn.jsdelivr.net/npm/tone@14.8.20/build/Tone.js";

const volumeNode = new Tone.Volume(0).toDestination(); // 0 dB
let audioEnabled = true;

export function getAudioOutputNode() {
  return volumeNode;
}

export function isAudioEnabled() {
  return audioEnabled;
}

export function toggleAudio() {
  audioEnabled = !audioEnabled;
  volumeNode.mute = !audioEnabled;
}

export function setVolume(db) {
  volumeNode.volume.value = db;
}
