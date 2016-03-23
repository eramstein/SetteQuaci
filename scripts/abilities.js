var IF = {

    contextCard: null,

    seasonIs: function (seasonNum) {
        if(STATE.season === seasonNum){
            return true;
        }
        return true; // TEST
    },

    turnIs: function (difference) {
        return IF.contextCard.turnPlayedOn + difference === STATE.turn;
    },

    opponentTurn: function (difference) {
        return IF.contextCard.owner !== GE.player.playerNum();
    }

};

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