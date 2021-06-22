const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

// todo: connect another key to rotate the tetromino counter-clockwise

// map keycodes
const KEY = {  
    LEFT:  'ArrowLeft',
    UP:    'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN:  'ArrowDown',
    SPACE: 'Space',
    KEYD:  'KeyD'
}

Object.freeze(KEY);

const moves = {
    [KEY.LEFT]:  (p) => ( { ...p, x: p.x - 1 } ),
    [KEY.RIGHT]: (p) => ( { ...p, x: p.x + 1 } ),
    [KEY.DOWN]:  (p) => ( { ...p, y: p.y + 1 } ),
    [KEY.UP]:    (p) => board.rotate(p),
    [KEY.SPACE]: (p) => ( { ...p, y: p.y + 1 } ),
    [KEY.KEYD]:  (p) => ( { ...p, y: p.y + 1 } )
}

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// scale blocks
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const COLORS = [
    'cyan',
    'blue',
    'orange',
    'yellow',
    'green',
    'purple',
    'red'
];

const SHAPES = [
    // I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // J
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0]
    ],
    // L
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0]
    ],
    // O
    [
        [4, 4],
        [4, 4]
    ],
    // S
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
    ],
    // T
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    // Z
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
    ]
];

