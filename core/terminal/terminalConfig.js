// terminalConfig.js

export const config = {
    fontSize: 16,
    fontFamily: 'courier, monospace',
    fontWeight: 'bold',
    bgColor: '#000000',
    fgColor: '#FFFFFF',
    cursorVerticalOffset: 0, // used for CRT shake, not layout
    charWidth: 10,        // Fixed cell width in px
    charHeight: 21,       // Fixed cell height in px
    useFixedCellSize: true, // If true, bypass measureText() and use hardcoded grid
    cursorOffsetX: -1,
    cursorOffsetY: -1.5,

  };

  