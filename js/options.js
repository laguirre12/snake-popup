function retrieveInputs() {
  const input = {
    canvasHeight : $('#canvasHeight').val(),
    canvasWidth  : $('#canvasWidth').val(),
    boardColor   : $('#boardColor').val(),
    snakeColor   : $('#snakeColor').val(),
    snakeSize    : $('#snakeSize').val(),
    startSize    : $('#startSize').val(),
    growRate     : $('#growRate').val(),
    appleColor   : $('#appleColor').val(),
    appleSize    : $('#appleSize').val()
  };

  input.boardHeight = input.canvasHeight / input.snakeSize;
  input.boardWidth = input.canvasWidth / input.snakeSize;
  return input;
}

function updateInputs(settings) {
  $('#canvasHeight').val(settings.canvasHeight);
  $('#canvasWidth').val(settings.canvasWidth);
  $('#boardColor').val(settings.boardColor);
  $('#snakeColor').val(settings.snakeColor);
  $('#snakeSize').val(settings.snakeSize);
  $('#startSize').val(settings.startSize);
  $('#growRate').val(settings.growRate);
  $('#appleColor').val(settings.appleColor);
  $('#appleSize').val(settings.appleSize);
}

/**
 * Retrieves game settings from local storage and combines with
 * DEFAULT_GAME_SETTINGS for callback.
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
