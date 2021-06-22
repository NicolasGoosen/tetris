/*

We represent the J tetromino as a matrix where the number two represents the colored cells.
We add a row of zeros to get a center to rotate around:

[2, 0, 0],  
[2, 2, 2],  
[0, 0, 0]

The tetrominoes spawn horizontally, with J, L, and T spawning flat-side first.

*/

class Piece {
    constructor(ctx) {
        this.ctx = ctx;

        const typeId = this.randomizeTetrominoType(COLORS.length);
        this.color = COLORS[typeId];
        this.shape = SHAPES[typeId];

        // starting position
        this.x = 3;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }
}