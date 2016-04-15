var DO = {

    contextCard: null,

    damageAdjacent: function (damage) {
        var targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        _.each(targets, function (target) {
            GE.creature.receiveDamage(target, damage);
        });
    },

    damageTarget: function (target, damage) {
        GE.creature.receiveDamage(target, damage);
    },

    damageAtCell: function (cell, damage) {
        var targets = GE.permanent.getPermanents({'x': cell.x, 'y': cell.y}); 
           
        _.each(targets, function (target) {            
            GE.creature.receiveDamage(target, damage);
        });
    },    

    heal: function (params) {
        var targets = [];

        if(params.target === 'adjacent'){
           targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        }

        if(params.target === 'allies'){
           targets = GE.permanent.getPermanents({'owner': DO.contextCard.owner});
        }

        _.each(targets, function (target) {
            GE.creature.removeDamage(target, params.value);
        });
    },

    damageOpponent: function (damage) {
        GE.player.damageOpponent(damage);
    },

    modifyCreatures: function (params) {
        var targets = [];

        if(params.target === 'adjacent'){
           targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        }

        if(params.target === 'all'){
           targets = GE.permanent.getPermanents();
        }

        if(params.filter === 'allies'){
            targets = targets.filter(function (t) {
                return t.owner === DO.contextCard.owner;
            }); 
        }

        _.each(targets, function (target) {
            GE.creature.addModifier(target, params);
        });
    },

    selfDestruct: function () {
        GE.permanent.deletePermanent(DO.contextCard);
    }

};