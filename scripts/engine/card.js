var GE = (function (mod) {

    mod.card = {};

    mod.card.getTemplate = function (cardName) {
        return CARDS.filter(function (c) {
            return c.name === cardName;
        })[0];
    };

    mod.card.play = function (card, x, y) {        

        var template = mod.card.getTemplate(card.name);

        var cellOccupied = false;
        var friendlyCell;

        if(STATE.permanents && STATE.permanents.length > 0) {
            cellOccupied = STATE.permanents.filter(function (c) {
                return c.x === x && c.y === y;
            });
        } 

        friendlyCell = GE.player.playerNum() === 'player1' && x <= 2 || GE.player.playerNum() === 'player2' && x > 2;

        if( (friendlyCell && template.type === 'creature' ||  !friendlyCell && template.type === 'trap' ) && !cellOccupied){

            card.x = x;
            card.y = y;
            card.turnPlayedOn = STATE.turn;
            MUTATORS.addPermanent(card);
            MUTATORS.removeCardFromHand(GE.player.playerNum(), card.id);

        }  

    }

    return mod;

}(GE || {}));