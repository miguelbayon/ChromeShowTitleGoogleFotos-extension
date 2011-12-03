var settings = {
  
  get_move_help: function() {
    return config.has('move_help') ? config.get('move_help') : true;
  },
  
  get_position: function() {
    return config.has('position') ? config.get('position') : 'bottom_right';
  },
  set_position: function(corner) {
    corner = htmlspecialchars(corner);
    config.set('position', corner);
  }
}



chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {

    if (request.type == "settings") {
      sendResponse({ position: settings.get_position(), move_help: settings.get_move_help() });
    } else if (request.type == "move") {
      settings.set_position(request.position);
      sendResponse({ position: settings.get_position() });
    } else if (request.type == "set") {
      config.set(request.key, request.value);
      sendResponse( config.get(request.key) );
    } else if (request.type == "get") {
      sendResponse( settings.get_position() );
    } else {
      sendResponse({ error:'error' });
    }

  });


