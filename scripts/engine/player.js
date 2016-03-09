var GE = (function (mod) {

    mod.player = {};

    mod.player.playerNum = function () {
        return STATE.players.player1.name === LOB.userName ? 'player1' : 'player2';
    };

    mod.player.opponentNum = function () {
        return STATE.players.player1.name === LOB.userName ? 'player2' : 'player1';
    };

    return mod;

}(GE || {}));