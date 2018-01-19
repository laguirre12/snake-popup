/**
 * Represents the visuals of a Snake Game. Handles drawing a specific
 * Snake Game onto an HTML Canvas.
 */
class SnakeView {

  /**
   * Constructs a snake view with specified settings.
   * @param game {SnakeGame}  - instance of SnakeGame to draw on canvas
   * @param settings {Object} - game settings needed for drawing visuals
   * @param failure {function(string)} - function called on failure/error
   *    when drawing state of game on canvas.
   */
  constructor(game, settings, failure) {
    console.assert(game instanceof SnakeGame);
    this.game = game;
    this.failure = failure;

    // set up the view's settings
    this.settings = {};
    Object.copyObjectProperties(this.settings, DEFAULT_SETTINGS, false);
    Object.copyObjectProperties(this.settings, settings, true);

    // set up the canvas
    this.canvas = document.getElementById('board');
    this.canvas.width = this.settings.canvasWidth;
    this.canvas.height = this.settings.canvasHeight;
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    } else {
      this.failure('canvas is unsupported in your browser');
    }
  }

  /**
   * Draws a game over message over the board.
   */
  drawGameOver() {
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = '#D2D7DF';
    this.ctx.fillRect(0, 0,
      this.settings.canvasWidth,
      this.settings.canvasHeight);

    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = this.settings.fontColor;
    this.ctx.textAlign = 'center';
    this.ctx.font = '36px GameFont';
    this.ctx.fillText('Game Over',
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight / 2);

    this.ctx.font = '16px GameFont';
    this.ctx.fillText('Press Space to Reset Game',
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight / 2 + 36);
  }

  /**
   * Draws game start message over the board.
   */
  drawGameStart() {
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = '#D2D7DF';
    this.ctx.fillRect(0, 0,
      this.settings.canvasWidth,
      this.settings.canvasHeight);

    this.ctx.globalAlpha = 1.0;
    this.ctx.fillStyle = this.settings.fontColor;
    this.ctx.textAlign = 'center';
    this.ctx.font = '48px GameFont';
    this.ctx.fillText('Snake',
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight / 4);

    this.ctx.font = '16px GameFont';
    this.ctx.fillText('Use WASD or Arrows to Move,',
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight / 4 + 36);
    this.ctx.fillText('and Space to Reset the Game',
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight / 4 + 36 + 16);
  }

  /**
   * Redraws the current state of the game on the canvas.
   */
  update() {
    // draw the background color
    this.ctx.fillStyle = this.settings.boardColor;
    this.ctx.fillRect(0, 0, this.settings.canvasWidth, this.settings.canvasHeight);

    // draw the snake
    this.ctx.fillStyle = this.settings.snakeColor;
    this.ctx.strokeStyle = this.settings.snakeBorderColor;
    const drawSnakePiece = piece => {
      const pos = this.boardToCanvas(piece.x, piece.y);
      const size = this.settings.snakeSize;
      this.ctx.fillRect(pos.x, pos.y, size, size);
      this.ctx.strokeRect(pos.x, pos.y, size, size);
    };
    this.game.snake.pieces.forEach(drawSnakePiece);

    // draw the apple
    this.ctx.fillStyle = this.settings.appleColor;
    const applePos = this.boardToCanvas(this.game.apple.x, this.game.apple.y);
    this.ctx.fillRect(applePos.x, applePos.y,
      this.settings.appleSize, this.settings.appleSize);

    // draw game start message
    if (this.game.gameStart) {
      this.drawGameStart();
      return;
    }

    // draw game over message
    if (this.game.gameOver) {
      this.drawGameOver();
      return;
    }
  }

  /**
   * Converts an (x,y) position on a board to the corresponding (x,y)
   * position on the canvas for drawing.
   */
  boardToCanvas(x, y) {
    console.assert(Number.isInteger(x));
    console.assert(Number.isInteger(y));
    console.assert(x >= 0 && x <= this.settings.boardWidth);
    console.assert(y >= 0 && y <= this.settings.boardHeight);
    return {
      x: this.settings.canvasWidth / this.settings.boardWidth * x,
      y: this.settings.canvasHeight / this.settings.boardHeight * y
    };
  }
}
