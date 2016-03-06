$(document).ready(function() {

    // a game starts at LOB.challenge()

    window.onbeforeunload = function(e) {
      MUTATORS.saveGame();
      return undefined;
    };

});