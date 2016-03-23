var GE = (function (mod) {

    mod.player = {};

    mod.player.opponentName = function () {
        return STATE.players.player1.name === LOB.userName ? STATE.players.player2.name : STATE.players.player1.name;
    };

    mod.player.playerNum = function () {
        return STATE.players.player1.name === LOB.userName ? 'player1' : 'player2';
    };

    mod.player.opponentNum = function () {
        return STATE.players.player1.name === LOB.userName ? 'player2' : 'player1';
    };

    mod.player.playerLife = function () {
        return STATE.players[mod.player.playerNum()].hp;
    };

    mod.player.opponentLife = function () {
        return STATE.players[mod.player.opponentNum()].hp;
    };

    mod.player.playerHand = function () {
        var hand = STATE.players[mod.player.playerNum()].hand;        
        return (hand === true || !hand) ? [] : hand;
    };

    mod.player.opponentHand = function () {
        var hand = STATE.players[mod.player.opponentNum()].hand;        
        return (hand === true || !hand) ? [] : hand;
    };

    return mod;

}(GE || {}));