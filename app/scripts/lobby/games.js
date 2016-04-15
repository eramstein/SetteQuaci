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

    mod.addPlayersToGame = function (player1, player2, gameId) {
        var players = {};
        players[player1] = gameId;
        players[player2] = gameId;
        ingameRef.set(players);
    }

    mod.createGame = function (player1, player2) {

        var players = {
                'player1': player1,
                'player2': player2
        };       

        //init state and start it
        GE.game.init(players);

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