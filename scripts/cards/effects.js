var DO = {

    contextCard: null,

    damageAdjacent: function (damage) {
        var targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        _.each(targets, function (target) {
            GE.creature.receiveDamage(target, damage);
        });
    },

    modifyCreatures: function (params) {

        var targets;

        if(params.target === 'adjacent'){
           targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        }

        if(params.filter === 'allies'){
            console.log('targets', targets); 
        }
         
        _.each(targets, function (target) {
            GE.creature.addModifier(target, params);
        });
    },

    selfDestruct: function () {
        GE.permanent.deletePermanent(DO.contextCard);
    }

};