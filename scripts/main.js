$(document).ready(function() {

    window.onbeforeunload = function(e) {
      MUTATORS.saveGame();
      return undefined;
    };

});