// canvasTerminal.js

import { config } from './terminalConfig.js';
import { setContext, drawFromBuffer } from './terminalRenderer.js';
import { setCursorContext } from './terminalCursor.js';
import { startBlink } from './terminalCursor.js';


export let canvas, ctx;
let cols = 80, rows = 25;
let charWidth = 0, charHeight = 0;
export function getTerminalCols() {
    return cols;
  }

export function createCanvas(container) {
    canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.setAttribute('tabindex', 0);
    container.appendChild(canvas);
  
    ctx = canvas.getContext('2d');
    ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    ctx.textBaseline = 'top';
  
    // Don’t measure or resize immediately — wait for layout
    requestAnimationFrame(() => {
      resizeCanvas(); // safe context, correct dimensions
    });
  
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', () => {
      canvas.focus();
    });
    
  }

  function measureCharSize() {
    if (config.useFixedCellSize) {
      charWidth = config.charWidth;
      charHeight = config.charHeight;
    } else {
      const metrics = ctx.measureText('M');
      charWidth = Math.ceil(metrics.width);
      charHeight = Math.ceil(config.fontSize * 1.5);
    }
  
    cols = Math.floor(canvas.clientWidth / charWidth);
    rows = Math.floor(canvas.clientHeight / charHeight);
  }
  

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${config.fontSize}px ${config.fontFamily}`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    measureCharSize(); // now uses the correct post-scale font
    setContext(ctx, charWidth, charHeight);
    setCursorContext(ctx, charWidth, charHeight); // here
      
    redraw();
    startBlink(); // add this

  }
  
  export function redraw() {
    drawFromBuffer();
  }


