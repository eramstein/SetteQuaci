var GE = (function (mod) {

    mod.game = {};

    mod.game.init = function (players) {

        var initialState = {
            'turn': 1,
            'season': 1,
            'creatures': null,
            'picks': {
                'current': null,
                'all': null
            },
            'players': {
                'player1' : {},
                'player2' : {}
            }
        };

        initialState.players.player1.hp = 5;
        initialState.players.player2.hp = 5;
        initialState.players.player1.name = players.player1;
        initialState.players.player2.name = players.player2;

        // TODO: put on server side...
        if(LOB.userName === players.player1){
            initialState.picks.current = GE.picks.getPicks();
            MUTATORS.setRemoteState(initialState);
        }

    };

    mod.game.load = function (gameId) {
        MUTATORS.setRemoteStore(gameId);
    };

    return mod;

}(GE || {}));