/**
 * Represents a game of Snake that is constructed with game settings
 * (default settings are used, if not specified). The game can be
 * updated (the snake takes a step) and on 'gameover' no more updates
 * can occur.
 */
class SnakeGame {
  /**
   * Constructs a snake game with the given settings.
   * @param settings {object} - used custom game settings
   * @param gameOver {function} - function to call on game over
   */
  constructor(settings, gameOver) {
    // setup game settings
    this.settings = {};
    Object.copyObjectProperties(this.settings, settings, true);
    Object.copyObjectProperties(this.settings, DEFAULT_GAME_SETTINGS, false);

    this.gameStart = true;
    this.gameOver = false;
    this.gameOverCallback = gameOver;
    this.snake = this.createNewSnake();
    this.apple = this.createNewApple(this.snake.pieces);
  }

  /**
   * Updates game by moving the snake then performing collision detection.
   * @param input {object} - an object containing an updated direction for
   * movement.
   */
  update(input) {
    if (this.gameOver) return;
    if (input.direction !== undefined) {
      this.gameStart = false;
      this.snake.direction = input.direction;
    }
    this.snake.move();

    // intersect with apple
    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      this.snake.grow(this.settings.growRate);
      this.apple = this.createNewApple(this.snake.pieces);
    }

    // game over
    if (this.snakeOutOfBounds() || this.snake.intersectingWithSelf()) {
      this.announceGameOver();
    }
  }

  /**
   * Repors whether the head of the snake is out of bounds of the board.
   */
  snakeOutOfBounds() {
    return this.snake.x < 0 || this.snake.x >= this.settings.boardWidth ||
           this.snake.y < 0 || this.snake.y >= this.settings.boardHeight;
  }

  /**
   * Ends the game and makes a call to gameOverCallback to announce the
   * game ended.
   */
  announceGameOver() {
    this.gameOver = true;
    this.gameOverCallback();
  }

  /**
   * Creates a new Apple located at an unoccupied (x,y) position.
   * @return {Apple}
   */
  createNewApple(gameObjects) {
    if (this.gameOver) return;

    let x,y;
    let collisionFree = false;
    const reducer = function(acc, cur) {
      return acc && cur.x !== x && cur.y !== y;
    };
    while (!collisionFree) {
      x = Math.floor(Math.random() * this.settings.boardWidth);
      y = Math.floor(Math.random() * this.settings.boardHeight);
      collisionFree = gameObjects.reduce(reducer, true);
    }
    return new Apple(x, y);
  }

  /**
   * Creates a new Snake at the center of the board.
   * @return {Snake}
   */
  createNewSnake() {
    if (this.gameOver) return;
    const head = new SnakePiece(
      Math.floor(this.settings.boardWidth / 2),
      Math.floor(this.settings.boardHeight / 2),
      undefined,
      Direction.NONE);
    return new Snake(head, this.settings.startSize);
  }
}
