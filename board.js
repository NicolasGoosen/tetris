class Board {
    // ctx = canvas context 
    constructor(ctx) {
        this.ctx = ctx;
        this.grid = this.getEmptyBoard();
        this.piece = new Piece(ctx);
    }

    getEmptyBoard() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        );
    }

    rotate(piece) {
        // clone the piece
        let clone = JSON.parse(JSON.stringify(piece));  

        // transpose
        for (let y = 0; y < clone.shape.length; ++y) {  
          for (let x = 0; x < y; ++x) {  
            [clone.shape[x][y], clone.shape[y][x]] =   
            [clone.shape[y][x], clone.shape[x][y]];  
          }  
        }

        // reverse the order of the columns
        clone.shape.forEach(row => row.reverse());
        
        return clone;  
    }

    // collision detection
    isInsideWalls(x, y) {
        return (
            x >= 0   &&  // left wall
            x < COLS &&  // right wall
            y < ROWS     // floor
        );
    }

    isNotOccupied(x, y) {
        return this.grid[y] && this.grid[y][x] === 0
    }

    valid(piece) {
        return piece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = piece.x + dx;
                let y = piece.y + dy;
                return value === 0 || (this.isInsideWalls(x, y) && this.isNotOccupied(x, y))
            });
        });
    }

    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value;
                }
            });
        });
    }

    dropOne() {
        let p = moves[KEY.DOWN](this.piece);

        if (this.valid(p)) {
            this.piece.move(p);
        } else {
            this.freeze();
            this.clearLines();
            if (this.piece.y === 0) {
                return false; // game over
            }
            this.piece = new Piece(this.ctx);
        }
        return true;
    }

    draw() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value - 1];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }

    clearLines() {
        this.grid.forEach((row, y) => {
            // if every value > 0 then we have a full row
            if (row.every(value => value > 0)) {
                // remove row and add one to top
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
    }
}

