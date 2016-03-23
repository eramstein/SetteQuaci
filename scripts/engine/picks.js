var GE = (function (mod) {

    mod.picks = {};

    mod.picks.buildPicks = function () {

        var picks = [];
        var cost = Math.ceil(Math.random() * 2);
        var options = _.filter(CARDS, {'cost': cost});

        for (var i = 0; i < 4; i++) {
            var card = _.sample(options);
            _.pull(options, card);
            picks.push({'name': card.name});
        };       

        return picks;

    };

    mod.picks.getInitialPicks = function () {

        var pickList = [];

        for (var i = 0; i < 10; i++) {
            pickList.push(mod.picks.buildPicks());
        };

       return pickList;       

    };

    mod.picks.setCurrentPicks = function () {

        var pickList = _.cloneDeep(STATE.picks.all);

        MUTATORS.setCurrentPicks(pickList[0]);

        pickList.push(mod.picks.buildPicks());
        pickList.shift();

        MUTATORS.setAllPicks(pickList);       

    };


    mod.picks.pickCard = function (cardName) {

        MUTATORS.setPickedCard({
            'pick': cardName,
            'playerNum': GE.player.playerNum()
        });

        // if guess done, end pick phase
        if(STATE.players[GE.player.playerNum()].guess &&
           STATE.players[GE.player.opponentNum()].guess &&
           STATE.players[GE.player.opponentNum()].pick
           ) {
            mod.picks.endPickPhase();
        }

    };

    mod.picks.guessCard = function (cardName) {

        MUTATORS.setGuessedCard({
            'pick': cardName,
            'playerNum': GE.player.playerNum()
        });

        // if guess done, end pick phase
        if(STATE.players[GE.player.playerNum()].pick &&
           STATE.players[GE.player.opponentNum()].guess &&
           STATE.players[GE.player.opponentNum()].pick
           ) {
            mod.picks.endPickPhase();
        }

    };

    mod.picks.endPickPhase = function () {

        //add card to player's hand
        MUTATORS.addCardToHand({
            'cardName': STATE.players[GE.player.playerNum()].pick,
            'guessed': STATE.players[GE.player.opponentNum()].guess === STATE.players[GE.player.playerNum()].pick,
            'playerNum': GE.player.playerNum()
        });

        //add card to opponent's hand
        MUTATORS.addCardToHand({
            'cardName': STATE.players[GE.player.opponentNum()].pick,
            'guessed': STATE.players[GE.player.playerNum()].guess === STATE.players[GE.player.opponentNum()].pick,
            'playerNum': GE.player.opponentNum()
        });

        //go to next picks
        mod.picks.setCurrentPicks();

        //go to main phase
        MUTATORS.setPhase('main');

    };

    return mod;

}(GE || {}));