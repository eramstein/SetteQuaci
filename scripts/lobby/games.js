var LOB = (function (mod) {

    var lobbyRef = FIREBASE.child('lobby');
    var ingameRef = FIREBASE.child('ingame');

    lobbyRef.on('value', function (snapshot) {
        var players = snapshot.val();

        $("#players-list").html("");

        _.each(players, function (player, playerId) {
            if(playerId !== LOB.userName){
                $("#players-list").append("<button onclick=\"LOB.challenge('" + playerId + "')\">" + playerId + "</button>");
            } else {
                $("#players-list").append("<div>you are waiting for a challenge</div>");
            }            
        });
    });

    ingameRef.on('value', function (snapshot) {
        var players = snapshot.val();

        _.each(players, function (gameId, playerId) {
            if(playerId === LOB.userName){
                mod.loadGame(gameId);
            }          
        });
    });

    mod.loadGame = function (gameId) {
        GE.game.load(gameId);
        mod.displayGame();  
    };

    mod.displayLobby = function () {
        $("#game-container").hide();
        $("#lobby-container").show();  
    };

    mod.displayGame = function () {
        $("#lobby-container").hide();
        $("#game-container").show();
    };

    mod.createGame = function (player1, player2) {

        var initialState = {
            'players': {
                'player1': player1,
                'player2': player2
            }
        };

        var createdGame = FIREBASE.child('games').push(initialState).key();

        //add players to the list of ingame players
        ingameRef.child(player1).set(createdGame);
        ingameRef.child(player2).set(createdGame);

    };

    mod.challenge = function (playerID) {

        //remove players from lobby
        lobbyRef.child(playerID).set(null);
        lobbyRef.child(LOB.userName).set(null);      

        //create new game
        mod.createGame(playerID, LOB.userName);         
        
        mod.displayGame();
              
    };

    mod.joinLobby = function () {    
        lobbyRef.child(LOB.userName).set(true);
    };

    mod.leaveLobby = function () {    
        lobbyRef.child(LOB.userName).set(null);
    };

    return mod;

}(LOB || {}));