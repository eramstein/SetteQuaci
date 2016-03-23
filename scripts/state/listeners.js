var LISTENERS = (function(){

    var mod = {};

    mod.onEndTurn = function () {
        console.log('onEndTurn');
        _.each(STATE.permanents, function (p) {
            if(!p){return;}
            IF.contextCard = p;
            DO.contextCard = p;
            var template = GE.card.getTemplate(p.name);            
            _.each(template.abilities, function (a) {
                if(a.trigger === 'EndTurn'){
                    var condition = eval(a.condition);
                    if(condition === true){
                        a.effect();
                    }
                }                
            });
        });
    };

    mod.onPermanentMoved = function (card, x, y) {
        // loop abilities
    };

    mod.onDeclareAttack = function (attacker, defender) {
        // loop abilities
    };

    mod.beforeDealCombatDamage = function (attacker, defender, damage) {
        // loop abilities
    };

    mod.onDealDamage = function (creature, damage) {
        // loop abilities
    };

    mod.onCreatureDestroyed = function (defender) {
        // loop abilities
    };

    mod.onDefuseTrap = function (trap, creature) {
        // loop abilities
    };

    return mod;

}());