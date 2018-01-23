/**
 * Gets user game settings from the DOM and returns an object containing all
 *  fields.
 * @return {object} - an object containing the user settings in the input
 *  fields
 */
function retrieveInputs() {
  const input = {
    canvasHeight : $('#canvas-height').val(),
    canvasWidth  : $('#canvas-width').val(),
    boardColor   : $('#board-color').val(),
    textColor    : $('#text-color').val(),

    // apple properties
    appleColor   : $('#apple-color').val(),
    appleSize    : $('#apple-size').val(),

    // snake properties
    snakeColor   : $('#snake-color').val(),
    snakeSize    : $('#snake-size').val(),
    startSize    : $('#start-size').val(),
    growRate     : $('#grow-rate').val(),
    snakeBorderColor : $('#snake-border-color').val(),
  };
  // the number of tiles in the board is based on the snake and canvas size
  input.boardHeight = input.canvasHeight / input.snakeSize;
  input.boardWidth = input.canvasWidth / input.snakeSize;
  return input;
}

/**
 * Updates the DOM to show the given settings.
 * @param settings {object} - the game settings to update the DOM with
 */
function updateInputs(settings) {
  $('#canvas-height').val(settings.canvasHeight);
  $('#canvas-width').val(settings.canvasWidth);
  $('#board-color').val(settings.boardColor);
  $('#text-color').val(settings.textColor);

  $('#apple-color').val(settings.appleColor);
  $('#apple-size').val(settings.appleSize);

  $('#snake-color').val(settings.snakeColor);
  $('#snake-size').val(settings.snakeSize);
  $('#start-size').val(settings.startSize);
  $('#grow-rate').val(settings.growRate);
  $('#snake-border-color').val(settings.snakeBorderColor);
}

/**
 * Retrieves game settings from local storage and combines with
 *  DEFAULT_GAME_SETTINGS for callback.
 * @param callback {function(obj)} - success callback called with retrieved
 *  game settings
 * @param failure  {function} - failure callback called if game settings
 *  could not be retrieved
 */
function retrieveSettings(callback, failure) {
  chrome.storage.local.get({'gameSettings' : DEFAULT_SETTINGS}, data => {
    if (!chrome.runtime.error) {
      Object.copyObjectProperties(data.gameSettings,
        DEFAULT_SETTINGS,
        false);
      callback(data.gameSettings);
    } else {
      failure('Unable to retrieve settings.');
    }
  });
}

/**
 * Saves given game settings to local storage then alerts either the success
 * or failure callback if able to save settings.
 * @param success  {function()} - success callback
 * @param failure  {function()} - failure callback
 */
function saveSettings(settings, success, failure) {
  Object.copyObjectProperties(settings, DEFAULT_SETTINGS, false);
  chrome.storage.local.set({'gameSettings' : settings}, () => {
    if (!chrome.runtime.error) {
      success('Successfully saved settings!');
    } else {
      failure('Unable to save Settings');
    }
  });
}

/**
 * Displays a red alert box with msg.
 * @param msg {string} - the message to display
 */
function failure(msg) {
  console.assert(msg instanceof String);
  alertigo(msg, {
    color: 'red',
    life : '1000'
  });
}

/**
 * Displays a blue alert box with msg.
 * @param msg {string} - the message to display
 */
function success(msg) {
  console.assert(typeof msg === 'string');
  alertigo(msg, {
    color: 'blue',
    life : '1000'
  });
}

$(document).ready(() => {
  // load settings from storage
  retrieveSettings(updateInputs, failure);

  // bind reset event to button
  $('#reset').click(event => {
    updateInputs(DEFAULT_SETTINGS);
  });

  // bind save event to button
  $('#save').click(event => {
    if ($('input:invalid').length > 0) {
      failure('One or game settings are invalid, failed to save');
      return;
    }
    saveSettings(retrieveInputs(), success, failure);
  });
});
