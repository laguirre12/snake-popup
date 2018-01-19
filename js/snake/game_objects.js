/**
 * Represents a GameObject that has a 2D position.
 */
class GameObject {
  constructor(x, y) {
    if (!Number.isInteger(x)) {
      console.log();
      console.log(x, typeof x);
      console.trace();
      console.log();
    }
    console.assert(Number.isInteger(x));
    console.assert(Number.isInteger(y));
    this._x = x;
    this._y = y;
  }

  // getters and setters for position - ensures integer values
  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(newX) {
    console.assert(Number.isInteger(newX));
    this._x = newX;
  }

  set y(newY) {
    console.assert(Number.isInteger(newY));
    this._y = newY;
  }

  toString() {
    return `GameObject(x:${this._x}, y:${this._y})`;
  }
}

/**
 * Represents an Apple, which does nothing.
 */
class Apple extends GameObject {
  constructor(x,y) {
    super(x, y);
  }
  toString() {
    return `Apple(x:${this.x}, y:${this.y})`;
  }
}

/**
 * Represents the body part of a snake. A SnakePiece has a 2D position
 * and either follows it's previous SnakePiece or moves in it's current
 * direction.
 */
class SnakePiece extends GameObject {
  /**
   * Creates a SnakePiece.
   * @param x {number} - The horizontal position of the piece.
   * @param y {number} - The vertical position of the piece.
   * @param prev {undefined | SnakePiece} - The SnakePiece this is
   *   following.
   * @param direction {Direction} - The starting direction of movement.
   */
  constructor(x, y, prev, direction) {
    console.assert(prev === undefined || prev instanceof SnakePiece);
    console.assert(Direction.isDirection(direction));
    super(x, y);
    this._prev = prev;
    this._dir = direction;
  }

  get prev() {
    return this._prev;
  }

  get direction() {
    return this._dir;
  }

  set direction(direction) {
    console.assert(Direction.isDirection(direction));
    this._dir = direction;
  }

  /**
   * Moves the SnakePiece by either having it take the position of it's
   * previous piece, or by moving in it's current direction.
   */
  move() {
    if (this.prev instanceof SnakePiece) {
      this.x = this.prev.x;
      this.y = this.prev.y;
      this.direction = this.prev.direction;
      return;
    }

    switch(this.direction) {
      case Direction.UP    : this.y--; break;
      case Direction.DOWN  : this.y++; break;
      case Direction.LEFT  : this.x--; break;
      case Direction.RIGHT : this.x++; break;
      case Direction.NONE  : break;
      default: break;
    }
  }

  toString()  {
    return `SnakePiece(${this.x}, ${this.y}, `
       + `${this.prev instanceof SnakePiece ? 'SnakePiece': 'undefined'}, `
       + `${this.direction.toString()})`;
  }
}

class Snake extends GameObject {
  /**
   * Creates an instance of a snake with a specified head and length.
   * @param head {SnakePiece} - The head of the snake.
   * @param length {number} - The initial length of the snake, minimum of 1
   */
  constructor(head, length) {
    console.assert(head instanceof SnakePiece);
    console.assert(Number.isInteger(length) && length >= 1, `length:${length}, ${typeof length}`);
    super(head.x, head.y);
    this._head = head;
    this._pieces = [head];
    this.grow(length - 1);
  }

  get head() {
    return this._head;
  }

  get pieces() {
    return this._pieces;
  }

  get length() {
    return this.pieces.length;
  }

  get direction() {
    return this.head.direction;
  }

  /**
   * Changes the snakes direction. If the snake has more than one piece,
   * it is not allowed to reverse direction, or it would collide with
   * itself.
   * @param dir {Direction} - the direction to change to.
   */
  set direction(dir) {
    console.assert(Direction.isDirection(dir));
    if (this.length > 1 && this.head.direction === Direction.opposite(dir))
      return;
    this.head.direction = dir;
  }

  /**
   * Moves the snake head in the specified direction, then moves each
   * pieces to the location of the previous piece.
   */
  move() {
    if (this.head.direction === Direction.NONE) return;
    for (let i = this.pieces.length - 1; i >= 0; i--) {
      this.pieces[i].move();
    }
    this.x = this.head.x;
    this.y = this.head.y;
  }

  /**
   * Increases the length of the snake by adding new pieces to the end of
   * the snake.
   * @param amount {number} - The number of pieces to grow the length of
   * the snake by.
   */
  grow(amount) {
    console.assert(Number.isInteger(amount) && amount >= 0);
    for (let i = 0; i < amount; i++) {
      this.pieces.push(this.createNewTailPiece());
    }
  }

  /**
   * Reports whether the snake's head is intersecting with any piece of the
   * snake body.
   * @return {boolean} - whether the snake is intersecting with itself.
   */
  intersectingWithSelf() {
    for (let i = 1; i < this.pieces.length; i++) {
      const piece = this.pieces[i];
      if (this.head.x === piece.x && this.head.y === piece.y) {
        return true;
      }
    }
    return false;
  }

  /**
   * Creates a new SnakePiece that will be at the tail end of the Snake.
   * @return {SnakePiece} - The new SnakePiece.
   */
  createNewTailPiece() {
    let x,y;
    const last = this.pieces[this.pieces.length - 1];
    switch (last.direction) {
      case Direction.UP:
        x = last.x;
        y = last.y + 1;
        break;
      case Direction.DOWN:
        x = last.x;
        y = last.y - 1;
        break;
      case Direction.LEFT:
        x = last.x + 1;
        y = last.y;
        break;
      case Direction.RIGHT:
        x = last.x - 1;
        y = last.y;
        break;
      default:            // default is to do anything
        break;
    }
    return new SnakePiece(x, y, last, last.direction);
  }
}
