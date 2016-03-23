var GE = (function (mod) {

    mod.permanent = {};

    mod.permanent.deletePermanent = function (permanent) {
        MUTATORS.deletePermanent(permanent.id);
        LISTENERS.on('PermanentDestroyed', {'permanent': permanent});
    };

    mod.permanent.getPermanents = function (filterObject) {
        if(!STATE.permanents || STATE.permanents === true){
            return [];
        } else {
            return _.filter(STATE.permanents, filterObject);
        }
    };

    mod.permanent.getAdjacentPermanents = function (x, y) {
        if(!STATE.permanents || STATE.permanents === true){
            return [];
        } else {
            return _.filter(STATE.permanents, function (p) {
                return (p.x === x - 1 && p.y === y ||
                        p.x === x + 1 && p.y === y ||
                        p.x === x && p.y === y - 1 ||
                        p.x === x && p.y === y + 1)
            });
        }
    };

    mod.permanent.move = function (card, x, y) {        
        var template = mod.card.getTemplate(card.name);

        if(template.type === 'creature' && 
           !card.hasMoved &&
           !card.hasAttacked &&
           card.turnPlayedOn !== STATE.turn &&
           (GE.player.playerNum() === 'player1' && x <= 2 || GE.player.playerNum() === 'player2' && x > 2)){            
            MUTATORS.movePermanent(card.id, x, y);
            LISTENERS.on('PermanentMoved', {
                'permanent': STATE.permanents[card.id], 'x': x, 'y': y
            });
            GE.trap.defuseCell(x, y, card);
        }
    };

    return mod;

}(GE || {}));