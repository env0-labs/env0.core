import * as Tone from "https://cdn.jsdelivr.net/npm/tone@14.8.20/build/Tone.js";



  // Create a simple synth
  const synth = new Tone.Synth().toDestination();



  // Setup the button to play a sound on click
  const playButton = document.getElementById('playSound');
  playButton.addEventListener('click', () => {
  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease("C4", "8n");
  });

