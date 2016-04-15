var GE = (function (mod) {

    mod.permanent = {};

    mod.permanent.tempData = {};

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

    mod.permanent.getAbilities = function (permanent) {
        var template = GE.card.getTemplate(permanent.name);
        var abilitiesFromTemplate = template.abilities || [];
        var abilitiesFromModifiers = [];
        if(permanent.modifiers && permanent.modifiers.constructor === Array){
            abilitiesFromModifiers = permanent.modifiers.filter(function (m) {
                return m.type === 'ability';
            });
        }
        abilitiesFromModifiers = abilitiesFromModifiers.map(function (a) {
            return eval(a.value);
        });
        return abilitiesFromTemplate.concat(abilitiesFromModifiers);
    };

    mod.permanent.getKeywords = function (permanent) {
        var template = GE.card.getTemplate(permanent.name);
        var keywordsFromTemplate = template.keywords || {};
        var keywordsFromModifiers = {};
        if(permanent.modifiers && permanent.modifiers.constructor === Array){
            keywordsFromModifiers = permanent.modifiers.filter(function (m) {
                return m.type === 'keyword';
            });
        }
        _.each(keywordsFromModifiers, function (k) {
            keywordsFromTemplate[k.value] = true;
        });
        return keywordsFromTemplate;
    };

    mod.permanent.move = function (card, x, y) {        
        var template = mod.card.getTemplate(card.name);

        if(template.type === 'creature' && 
           !card.hasMoved &&
           !card.hasAttacked &&
           !(template.keywords && template.keywords.rooted) &&
           card.turnPlayedOn !== STATE.turn &&
           (GE.player.playerNum() === 'player1' && x <= 2 || GE.player.playerNum() === 'player2' && x > 2)){

            mod.permanent.tempData.mover = card;            
            MUTATORS.movePermanent(card.id, x, y);
            LISTENERS.on('PermanentMoved', {
                'permanent': STATE.permanents[card.id], 'x': x, 'y': y
            });
            GE.trap.defuseCell(x, y, card);

        }
    };

    mod.permanent.clearModifiersEndTurn = function () {        
        _.each(STATE.permanents, function (p) {
            if( !(p.modifiers && p.modifiers.length > 0) ) {return;}
            var modifiers = _.cloneDeep(p.modifiers);
            modifiers = modifiers.filter(function (m) {
                return m.until !== 'EOT';
            });
            MUTATORS.setPermanentProperty(p.id, 'modifiers', modifiers);
        });
    };

    return mod;

}(GE || {}));