/**
 * References to Objects from:
 *  snake/constants.js
 *  snake/game_objects.js
 *  snake/snake_game.js
 *  snake/snake_view.js
 */

/**
 * Given game settings for a SnakeGame, ensures all settings are cast to
 * an appropriate type for running the game (eg. size's are integers, etc.)
 * @param settings {object} - The supplied game settings.
 * @param callback {function(object)} - A callback function to pass the
 *  casted settings to.
 */
function castSettingTypes(settings, callback) {
  // cast values to integers
  settings.canvasHeight = parseInt(settings.canvasHeight);
  settings.canvasWidth  = parseInt(settings.canvasWidth);
  settings.startSize    = parseInt(settings.startSize);
  settings.growRate     = parseInt(settings.growRate);
  settings.snakeSize    = parseInt(settings.snakeSize);
  settings.appleSize    = parseInt(settings.appleSize);
  settings.boardHeight  = parseInt(settings.boardHeight);
  settings.boardWidth   = parseInt(settings.boardWidth);

  // cast values to strings
  settings.fontColor    = String(settings.fontColor);
  settings.snakeColor   = String(settings.snakeColor);
  settings.boardColor   = String(settings.boardColor);
  settings.appleColor   = String(settings.appleColor);
  settings.snakeBorderColor = String(settings.snakeBorderColor);
  callback(settings);
}

/**
 * Retrieves user copy of global settings from local storage for use in a
 * callback. Uses the default values if none are saved, or a failure occurs.
 * @param callback {function(object)} - the function to pass the settings to
 */
function retrieveSettings(callback) {
  chrome.storage.local.get({'gameSettings' : DEFAULT_SETTINGS}, data => {
    Object.copyObjectProperties(data.gameSettings, DEFAULT_SETTINGS, false);
    if (chrome.runtime.error) {
      alert('unable to retrieve user settings, using default');
      return;
    }
    castSettingTypes(data.gameSettings, callback);
  });
}

$(document).ready(() => {
  let input = {};
  let gameInterval; // stores the interval id for the game loop

  // stop game
  const gameOver = () => {
    clearInterval(gameInterval);
  };

  // alert of failure
  const alertFailure = (msg) => {
    clearInterval(gameInterval);
    alert(msg);
  };

  // start the game
  const startGame = (settings) => {
    input.direction = undefined;
    let game   = new SnakeGame(settings, gameOver);
    let visual = new SnakeView(game, settings, alertFailure);
    game.update(input);
    visual.update();
    gameInterval = setInterval(() => {
      game.update(input);
      visual.update();
    }, 100);
  };

  // stop previous game, then start a new game by retrieving settings
  const resetGame = () => {
    if (gameInterval !== undefined) gameOver();
    retrieveSettings(startGame);
  };

  // process key input, allow for WASD and Arrows
  const updateDirection = event => {
    switch(event.keyCode) {
      case 87: input.direction = Direction.UP;    break;
      case 65: input.direction = Direction.LEFT;  break;
      case 83: input.direction = Direction.DOWN;  break;
      case 68: input.direction = Direction.RIGHT; break;

      case 38: input.direction = Direction.UP;    break;
      case 37: input.direction = Direction.LEFT;  break;
      case 40: input.direction = Direction.DOWN;  break;
      case 39: input.direction = Direction.RIGHT; break;

      case 32: resetGame(); break;  // space reset game
      default: break;
    }
  };
  document.addEventListener('keydown', updateDirection);
  resetGame();
});
