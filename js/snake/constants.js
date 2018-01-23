/**
 * Utility function that copies properties from one object (a)
 *  to another object (b).
 * @param a {object} - The object to copy properties to.
 * @param b {object} - The object to copy properties from.
 * @param override {boolean} - Whether to override values in a if present in
 *   both a and b.
 */
Object.copyObjectProperties = (a, b, override) => {
  for (const prop in b) {
    if (b.hasOwnProperty(prop) && (!a.hasOwnProperty(prop) || override)) {
      a[prop] = b[prop];
    }
  }
};

// Default game values
const DEFAULT_GAME_SETTINGS = Object.freeze({
  boardHeight : 25,
  boardWidth  : 25,

  startSize : 1,  // starting size of snake
  growRate  : 2,  // number of pieces to increase by on each apple
});

// default game settings for visuals
const DEFAULT_VIEW_SETTINGS = Object.freeze({
  canvasHeight : 500,
  canvasWidth : 500,

  // object sizes (in pixels)
  snakeSize : 20,
  appleSize : 20,

  // colors
  textColor  : '#349c24',
  snakeColor : '#0c7872',
  boardColor : '#161217',
  appleColor : '#a30204',
  snakeBorderColor: '#161217'
});

// copy over view & game settings to default settings
const DEFAULT_SETTINGS = {};
Object.copyObjectProperties(DEFAULT_SETTINGS, DEFAULT_GAME_SETTINGS, true);
Object.copyObjectProperties(DEFAULT_SETTINGS, DEFAULT_VIEW_SETTINGS, true);
Object.freeze(DEFAULT_SETTINGS);

/**
 * Enum for directions.
 * - UP : y--, DOWN : y++, LEFT : x--, RIGHT : x++
 */
const Direction = Object.freeze({  // Object.freeze does not allow for
  UP    : Symbol("UP"),            // members to be changed/edited.
  DOWN  : Symbol("DOWN"),
  LEFT  : Symbol("LEFT"),
  RIGHT : Symbol("RIGHT"),
  NONE  : Symbol("NONE"),          // represents no movement

  opposite : function(dir) {
    let opp;
    switch(dir) {
      case this.UP   : opp = this.DOWN;  break;
      case this.DOWN : opp = this.UP;    break;
      case this.LEFT : opp = this.RIGHT; break;
      case this.RIGHT: opp = this.LEFT;  break;
      case this.NONE : opp = this.NONE;  break;
      default        : opp = this.NONE;  break; // default is NONE
    }
    return opp;
  },

  isDirection : function(dir) {
    return dir === this.NONE ||
      dir === this.UP   ||
      dir === this.DOWN ||
      dir === this.LEFT ||
      dir === this.RIGHT;
  }
});
