var DO = {

    contextCard: null,

    damageAdjacent: function (damage) {
        var targets = GE.permanent.getAdjacentPermanents(DO.contextCard.x, DO.contextCard.y);
        _.each(targets, function (target) {
            GE.creature.receiveDamage(target, damage);
        });
    },

    selfDestruct: function () {
        GE.permanent.deletePermanent(DO.contextCard);
    }

};