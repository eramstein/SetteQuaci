var GE = (function (mod) {

    mod.game = {};

    mod.game.init = function (players) {

        var initialState = {
            'turn': 1,
            'season': 1,
            'creatures': null,
            'picks': {
                'current': GE.picks.buildPicks(),
                'all': GE.picks.getInitialPicks()
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

        // init state
        MUTATORS.setInitialState(initialState);       

    };

    mod.game.load = function (gameId) {
        MUTATORS.setRemoteStore(gameId);
    };

    return mod;

}(GE || {}));