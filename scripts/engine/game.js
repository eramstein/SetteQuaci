var GE = (function (mod) {

    mod.game = {};

    mod.game.seasonNames = ['Winter', 'Spring', 'Summer', 'Autumn'];

    mod.game.init = function (players) {

        var initialState = {
            'turn': 1,
            'currentPlayer': 'player1',
            'phase': 'picks',
            'season': 1,
            'permanents': true,
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

    mod.game.endTurn = function () {
        if(STATE.currentPlayer === GE.player.playerNum()){

            LISTENERS.onEndTurn();

            //turn and season change
            if(GE.player.playerNum() === 'player2'){                
                var turn = STATE.turn + 1;
                var season = (STATE.season + 1) % 4;
                MUTATORS.setTurn(turn);
                MUTATORS.setSeason(season);    
                MUTATORS.clearPlayersTemporaryAttrs();                            
                MUTATORS.setPhase('picks');
            }

            //clear temporary state
            MUTATORS.clearPermanentsTemporaryAttrs(GE.player.playerNum());

            MUTATORS.setCurrentPlayer(GE.player.opponentNum());

        }
    };

    mod.game.end = function () {
        MUTATORS.endGame();
    };

    return mod;

}(GE || {}));