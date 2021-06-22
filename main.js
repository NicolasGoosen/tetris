let requestId = null; // animation frame

let board = new Board();
let time = { start: 0, elapsed: 0, level: 1000 };


function play() {
    board = new Board(ctx);
    addListener();

    // let piece = newPiece(ctx);
    // board.piece = piece;

    // if we have an old game running then cancel it
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    time.start = performance.now();
    animate();
}

function addListener() {
    document.removeEventListener( 'keydown', handleKeyPress );
    document.addEventListener(    'keydown', handleKeyPress );
}

function animate(now = 0) {
    time.elapsed = now - time.start;

    // if time interval has passed for the current level
    // then restart counting
    if (time.elapsed > time.level) {
        time.start = now;
        if (!board.dropOne()) {
            gameOver();
            return;
        }
    }

    draw();
    requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);

  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function draw() {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    board.draw();
    board.piece.draw();
}

function handleKeyPress(event) {
    event.preventDefault();

    if(moves[event.code]) {
        // get new state after keypress
        let p = moves[event.code](board.piece);
        // hard drop
        if (event.code === KEY.SPACE || event.code === KEY.KEYD) {
            while (board.valid(p)) {
                board.piece.move(p);
                draw();
                p = moves[KEY.SPACE](board.piece);
            }
        }
        if (board.valid(p)) {
            board.piece.move(p);
        }
    }
    return false;
}



